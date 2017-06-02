/**
 * Created by alex on 27/05/17.
 */

import UserMock from '../data/userMock';

/**
 * transforms Room.messages to messages for Gifted Chat
 * @param roomMessages in their db structure
 */
function toChatMessages(roomMessages) {
    return roomMessages.map(m => {
        let user = UserMock[m.uid] || { _id: m.uid };
        return {
            _id: m.clientId,
            createdAt: new Date(m.createdAt || 0),
            text: m.text,
            user
        };
    });
}

export function initChat(user, room) {
    console.log('[chat actions] initChat', user, room);

    return {
        type: 'chat_initiate',
        payload: { user, room, messages: toChatMessages(room.messages) }
    };
}


export function receiveMessage(message) {
    console.log('[chat actions] receiveMessage', message);
    return {
        type: 'chat_received_message',
        payload: toChatMessages([message])[0]
    };
}


export function sendMessage(room, message) {
    console.log('[chat actions] sendMessage', message);

    let msg = {
        createdAt: message.createdAt.getTime(),
        text: message.text,
        uid: message.user.id,
        clientId: message._id /** id received from gifted chat */
    };

    room.sendMessage(msg);

    /** return function to avoid calling reducer */
    return (dispatch, getState) => {};
}




