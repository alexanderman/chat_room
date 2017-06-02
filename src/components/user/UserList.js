/**
 * Created by alex on 04/05/17.
 */
import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import UserListItem from './UserListItem';
import { Label } from '../common';

import { userListUpdate, navigateToChat, initChat } from '../../actions';
import { connect } from 'react-redux';

import FirebaseService from '../../services/firebase';
import UserMock from '../../data/userMock';

/** Model
 * user = {
 *   id: '',
 *   avatar: '',
 *   name: '',
 *   description: ''
 * }
 * */


class UserList extends Component {

    onUserClicked(user) {
        //var foundIdx = this.props.users.indexOf(user);
        //
        //let newList = this.props.users.filter((user, i) => {
        //    return foundIdx !== i;
        //});
        //
        //this.props.userListUpdate(newList);

        /**
         * place to create/fetch room (user to user chat)
         */


        /**
         *  - current user
         *  - relevant room
         */
        let currentUser = UserMock[FirebaseService.currentUser().uid] || { _id: FirebaseService.currentUser().uid };

        this.props.initChat(currentUser, FirebaseService.room);
        this.props.navigateToChat(user);
    }

    renderUser(user) {
        return (
        <UserListItem onPress={(user) => { this.onUserClicked.bind(this)(user); }} user={user} key={user.id}></UserListItem>
        );
    }

    render() {
        return (
        <View style={styles.container}>

            <ScrollView>
                <View style={styles.listContainer}>
                    {this.props.users.map((user) => this.renderUser(user))}
                </View>
            </ScrollView>

        </View>
        );
    }
};



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: '2%'
    }
});



const mapStateToProps = state => {
    return { users: state.userList };
};

export default connect(mapStateToProps, { userListUpdate, navigateToChat, initChat })(UserList);
