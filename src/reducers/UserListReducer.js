/**
 * Created by alex on 11/05/17.
 */
import { users } from '../data/users';

const INITIAL_STATE = users;

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {

        case 'user_list_changed':
            return action.payload; //updated users

        default:
            return state;
    }
};
