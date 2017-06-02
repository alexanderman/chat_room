/**
 * Created by alex on 12/05/17.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigateToChat, navigateToUserList } from '../actions';
import UserList from './user/UserList';
import Chat from './chat';
import GChat from './GiftedChat';


import FirebaseService from '../services/firebase';


class Navigation extends Component {

    renderChat({ user, navigateToUserList }) {
        /** debugging */
        //if (FirebaseService.leaveRoom) FirebaseService.leaveRoom();

        //return <Chat user={user} onHeaderPress={navigateToUserList} />;
        return <GChat></GChat>
    }

    renderUserList() {
        /** debugging */
        //if (FirebaseService.enterRoom) FirebaseService.enterRoom();

        return <UserList />;
    }

    render() {
        var pageMap = {
            'user_list': this.renderUserList,
            'chat': this.renderChat
        };
        return pageMap[this.props.page](this.props);
    }
}


const mapStateToProps = state => {
    //console.log('** Navigation mapStateToProps', state);
    return state.navigation;
};

export default connect(mapStateToProps, { navigateToChat, navigateToUserList })(Navigation);
