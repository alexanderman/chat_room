/**
 * Created by alex on 24/05/17.
 */
import firebase from 'firebase';
import Room from './Room';


/**
 * @param list of string keys
 * returns new filtered duplicates array
 */
function uniqueKeys(list) {
    var map = {}, arr = [];
    (list || []).forEach((item) => {
        if (!map[item]) {
            arr.push(item);
            map[item] = true;
        }
    });
    return arr;
}


class RoomFactory {
    constructor(chatPath) {
        this._chatPath = chatPath;
    }

    /**
     * utility method to construct path/key to firebase db
     * @param partList
     * @returns {string}
     */
    path(partList) {
        partList = (partList || []);
        partList.unshift(this._chatPath);
        return partList.filter((part) => part).join('/');
    }

    /**
     * creates new Room instance from arguments
     * DB:
     * - register new room
     * - register room.users in roomUsers
     * - add roomId to each list of user rooms in userRooms
     * return room
     */
    create(userIdList, props, callback) {
        (props = props || {}).uid = firebase.auth().currentUser.uid;
        let room = new Room(this._chatPath, props);

        room.createdAt = room.updatedAt = new Date();
        room.creatorId = firebase.auth().currentUser.uid;
        room.users = uniqueKeys((userIdList || []).concat([room.creatorId]));

        room.id = firebase.database().ref(this.path(['rooms'])).push(room.toJson()).key;

        room._dbMessagesRef = firebase.database().ref(this.path(['messages', room.id]));
        room._dbMessagesRef.off();

        room._dbRoomUsersRef = firebase.database().ref(this.path(['roomUsers', room.id]));
        room._dbRoomUsersRef.off();

        room._dbRoomRef = firebase.database().ref(this.path(['rooms', room.id]));
        room._dbRoomRef.off();
        room._dbRoomRef.once('value', snapshot => {
            room.onUpdated(snapshot);
            if (callback) callback(room);
        });

        return room;
    }

    /**
     * @param roomId to fetch
     * @param callback optional, called after room is fetched from server
     * @returns {Room}
     */
    fetch(roomId, callback) {
        let room = new Room(this._chatPath, { status: 'fetching', uid: firebase.auth().currentUser.uid });

        room.id = roomId;

        room._dbMessagesRef = firebase.database().ref(this.path(['messages', room.id]));
        room._dbMessagesRef.off();

        room._dbRoomRef = firebase.database().ref(this.path(['rooms', room.id]));
        room._dbRoomRef.off();
        room._dbRoomRef.once('value', snapshot => {
            room.onUpdated(snapshot);
            if (callback) callback(room);
        });

        room._dbRoomUsersRef = firebase.database().ref(this.path(['roomUsers', room.id]));
        room._dbRoomUsersRef.off();

        return room;
    }

}


export default RoomFactory;