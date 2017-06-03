/**
 * Created by alex on 21/05/17.
 */

import firebase from 'firebase';
import Authenticate from './auth';
import Chat from './chat/Chat';

const CHAT_PATH = 'chat';


function createRoom(chat) {
    console.log('createRoom called');
    let room = chat.createRoom([], { name: 'TEST REMOVE' }, () => {});
    //room.addUsers([FirebaseService.currentUser().uid]);
}


function enterRoomId(chat, roomId) {
    let room = chat.fetchRoom(roomId, () => {});
    room.addUsers([FirebaseService.currentUser().uid]);
    /** TODO: connect here to actions like chat_users_changed, chat_messages_changed, chat_props_changed */
}



/** wrapper for firebase services and their instantiation */
export default FirebaseService = {
    init: function (config, onReady) {
        firebase.initializeApp(config);

        Authenticate(() => {
            this.chat = new Chat(CHAT_PATH);

            //createRoom(this.chat);
            //enterRoomId(this.chat, '-KlVFglQa61IdiAIPkdp');

            onReady();
        });
    },
    chat: null,
    currentUser: () => firebase.auth().currentUser
};


