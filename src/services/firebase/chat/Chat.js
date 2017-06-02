/**
 * Created by alex on 21/05/17.
 */
import firebase from 'firebase';
import RoomFactory from './RoomFactory';


/**
 * after instantiating chat, start listening to all relevant rooms
 * get them from current user profile
 */


class Chat {
    constructor(chatPath) {
        this.roomFactory = new RoomFactory(chatPath);
        this.rooms = {};
    }

    /** creates room with specified props */
    createRoom(userIdList, props, callback) {
        let room = this.roomFactory.create(userIdList, props, callback);
        this.rooms[room.id] = room;
        return room;
    }

    /** when user enters specific room */
    fetchRoom(roomId, callback) {
        let room = this.roomFactory.fetch(roomId, callback);
        this.rooms[room.id] = room;
        return room;
    }

    /** when user leaves specific room */
    unsubscribeFromRoom(roomId) {
        let room = this.rooms[roomId];
        delete this.rooms[roomId];
        this.roomFactory.unsubscribe(room);
    }

    /** fetch all roomIds for userId */
    fetchRooms(userId) {

    }

}



export default Chat;


