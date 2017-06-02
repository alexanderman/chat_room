/**
 * Created by alex on 12/05/17.
 */

export function navigateToChat(user) {
    return {
        type: 'navigate_to_chat',
        payload: user
    }
}

export function navigateToUserList() {
    return {
        type: 'navigate_to_user_list'
    }
}
