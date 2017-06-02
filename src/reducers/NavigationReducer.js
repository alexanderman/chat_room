/**
 * Created by alex on 12/05/17.
 */

const INITIAL_STATE = {
    page: 'user_list',
    user: null
};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {

        case 'navigate_to_chat':
            return { page: 'chat', user: action.payload };

        case 'navigate_to_user_list':
            return { page: 'user_list' };

        default:
            return state;
    }
};
