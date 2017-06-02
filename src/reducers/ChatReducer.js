/**
 * Created by alex on 02/06/17.
 */

import FirebaseService from '../services/firebase';

/**
 * GChat message:
 *         {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
            user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://facebook.github.io/react/img/logo_og.png'
            },
            image: 'https://s-media-cache-ak0.pinimg.com/originals/ff/a1/08/ffa1082732c2e5cbfaf3e96b59e44341.jpg'
        }

 */


const INITIAL_STATE = {
    user: null,
    room: null,
    messages: []
};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {

        case 'chat_initiate':
            return { user: action.payload.user, room: action.payload.room, messages: action.payload.messages };

        case 'chat_received_message':
            console.log('[ChatReducer] implement chat_received_message', action.payload);
            return { ...state, messages: [action.payload, ...state.messages] };

        default:
            return state;
    }
};
