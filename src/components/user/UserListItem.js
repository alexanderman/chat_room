/**
 * Created by alex on 04/05/17.
 */
import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from '../common';
import UserListItemContent from './UserListItemContent';

/** Model
 * user = {
 *   id: '',
 *   avatar: '',
 *   name: '',
 *   description: ''
 * }
 * */


const UserListItem = ({ user, onPress }) => {
    function renderCounter(count) {
        if (count) {
            return (
            <View style={styles.notificationCounter}>
                <Text style={styles.counterText}>{count}</Text>
            </View>
            );
        }
        return null;
    }

    return (
    <TouchableOpacity style={styles.container} onPress={() => { onPress(user); }}>
            <View style={styles.content}>
                <Avatar uri={user.avatar} random={false}></Avatar>
                <UserListItemContent user={user}></UserListItemContent>
            </View>

            {renderCounter(user.notificationCount)}
    </TouchableOpacity>
    );

};


//const styles = StyleSheet.create({
//    container: {
//        overflow: 'visible',
//        width: '48%',
//        height: 180,
//        marginRight: '1.9%', // for landscape view
//        marginTop: '2%',
//
//        borderRadius: 10,
//
//        //borderWidth: 1,
//
//        //shadowColor: '#000000',
//        //shadowOffset: {
//        //    width: 1,
//        //    height: 1
//        //},
//        //shadowRadius: 2,
//        //shadowOpacity: 0.7
//    },
//    content: {
//        overflow: 'hidden',
//        borderRadius: 10
//    }
//});


const styles = StyleSheet.create({
    container: {
        overflow: 'visible',
        width: '48%',
        height: 180,
        marginRight: '1.9%', // for landscape view
        marginTop: '2%',

        borderRadius: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.7
    },
    content: {
        overflow: 'hidden',
        borderRadius: 10,
    },
    notificationCounter: {
        overflow: 'hidden',
        zIndex: 1,
        position: 'absolute',
        top: -2, right: -2,
        width: 30, height: 30,
        borderRadius: 15,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterText: {
        fontSize: 12,
        color: '#FFFFFF'
    }
});


export default UserListItem;
