/**
 * Created by alex on 21/05/17.
 */
import firebase from 'firebase';

function _toJson(room) {
    function date(val) { return val.getTime(); }
    function string(val) { return val; }

    const fields = {
        createdAt: date,
        updatedAt: date,
        creatorId: string,
        name: string,
        status: string
    };

    return Object.keys(fields).reduce((res, key) => {
        res[key] = fields[key](room[key]);
        return res;
    }, {});
}

function _fromJson(room, props) {
    function date(val) { return new Date(Number(val)); }
    function string(val) { return val; }

    const fields = {
        createdAt: date,
        updatedAt: date,
        creatorId: string,
        name: string,
        status: string
    };

    return Object.keys(fields).reduce((res, key) => {
        res[key] = fields[key](props[key]);
        return res;
    }, room);
}

/**
 * TODO:
 * - deprecate connect method
 * - use subscribe method to connect individually to each event
 */

class Room {
    constructor(chatPath, props) {
        this._chatPath = chatPath;
        this.users = [];
        this.messages = [];
        this.status = 'active';
        this._cbMap = {};
        this.uid = null;  /** current userId */

        Object.keys(props || {}).forEach((key) => {
            this[key] = props[key];
        });
    }

    /**
     * subscribe to Room events, good place to connect redux (ui)
     * @param (Room.eventType) eventType
     * @param callback
     */
    subscribe(eventType, callback) {
        if (!Room.eventType[eventType]) {
            console.error('[room subscribe] unknown eventType', eventType);
            return;
        }
        /** saving the callback */
        this._cbMap[eventType] = callback;
        /** adding database event listeners */
        const handlerMap = {
            [Room.eventType.users_updated]: () => {
                this._dbRoomUsersRef.off();
                this._dbRoomUsersRef.on('value', this.onUsersUpdated.bind(this));
            },
            [Room.eventType.message_received]: () => {
                this._dbMessagesRef.off();
                this._dbMessagesRef.limitToLast(100).on('child_added', this.onMessageReceived.bind(this));
            },
            [Room.eventType.room_updated]: () => {
                this._dbRoomRef.off();
                this._dbRoomRef.on('value', this.onUpdated.bind(this));
            }
        };
        (handlerMap[eventType] || function(){ console.error('[room subscribe] not implemented callback for', eventType); })();
    }

    /**
     * removes callbacks
     * @param optional eventType, if not passed, all callbacks will be removed
     */
    unsubscribe(eventType) {
        if (eventType) {
            delete this._cbMap[eventType];
            /** removing database event listener */
            const handlerMap = {
                [Room.eventType.users_updated]: () => {
                    this._dbRoomUsersRef.off();
                },
                [Room.eventType.message_received]: () => {
                    this._dbMessagesRef.off();
                },
                [Room.eventType.room_updated]: () => {
                    this._dbRoomRef.off();
                }
            };
            (handlerMap[eventType] || function(){ console.error('[room unsubscribe] not implemented callback for', eventType); })();
            return;
        }
        /** if no argument, remove all callbacks */
        this._cbMap = {};
        this._dbRoomUsersRef.off();
        this._dbMessagesRef.off();
        this._dbRoomRef.off();
    }

    _cb(eventType,  ...args) {
        (this._cbMap[eventType] || function(){ console.log('[room _cb] no callback for eventType', eventType); })(this, ...args);
    }

    _dbUserRoomsRef(userId) {
        const path = [this._chatPath, 'userRooms', userId, this.id].join('/');
        return firebase.database().ref(path);
    }

    /** update the room from db snapshot */
    onUpdated(snapshot) {
        if (!snapshot || !snapshot.val()) {
            this.status = 'deleted';
            console.log('[room onUpdated] not exists', this);
            return;
        }

        _fromJson(this, snapshot.val());
        console.log('[room onUpdated]', this);
        this._cb(Room.eventType.room_updated);
    }

    onUsersUpdated(snapshot) {
        this.users = Room.objToIdList(snapshot.val());
        console.log('[room onUsersUpdated]', this);
        this._cb(Room.eventType.users_updated);
    }

    onMessageReceived(snapshot) {
        let message = snapshot.val();

        /** if this is message I sent, just change the status, it's already in list */
        if (message.uid === this.uid) {
            console.log('[room onMessageReceived] my message, updating status');
            delete message.isSending;
            return;
        }

        /** messages are in reverse order to serve Gifted Chat */
        this.messages = [message, ...this.messages];
        console.log('[room onMessageReceived]', this);
        this._cb(Room.eventType.message_received, message);
    }

    /** adds users to room, room.users will be updated onUsersUpdated */
    addUsers(userIdList) {
        (userIdList || []).forEach(uid => {
            this._dbRoomUsersRef.child(uid).set(true);
            this._dbUserRoomsRef(uid).set(true);
        });
    }

    /**
     * TODO: add message immediately to messages list in status "sending", update the status on received
     * change actions accordingly
     * @param message
     */
    sendMessage(message) {
        this.messages = [message, ...this.messages];
        this._cb(Room.eventType.message_received, message);
        this._dbMessagesRef.push(message);
        /** status is not persisted, only for senders ui */
        message.isSending = true;
    }

    /** removes users from room, room.users will be updated onUsersUpdated */
    removeUsers(userIdList) {
        (userIdList || []).forEach(uid => {
            this._dbRoomUsersRef.child(uid).remove();
            this._dbUserRoomsRef(uid).remove();
        });
    }

    destroy() {
        this.unsubscribe();
    }


    toJson() {
        return _toJson(this);
    }
}



Room.eventType = {
    users_updated: 'users_updated',
    message_received: 'message_received',
    room_updated: 'room_updated'
};


/** Room utils methods */
Room.idListToObj = list => {
    return (list || []).reduce((res, id) => {
        res[id] = true;
        return res;
    }, {});
};

Room.objToIdList = obj => {
    return Object.keys(obj || {}).map(key => {
        return key;
    });
};


export default Room;

