/**
 * Created by alex on 04/05/17.
 */
import { combineReducers } from 'redux';
import UserListReducer from './UserListReducer.js';
import NavigationReducer from './NavigationReducer';
import ChatReducer from './ChatReducer';


export default combineReducers({
    userList: UserListReducer,
    navigation: NavigationReducer,
    chat: ChatReducer
});
