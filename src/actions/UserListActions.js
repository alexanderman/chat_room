/**
 * Created by alex on 11/05/17.
 */


export function userListUpdate(newUserList) {
    return {
        type: 'user_list_changed',
        payload: newUserList
    };
}




