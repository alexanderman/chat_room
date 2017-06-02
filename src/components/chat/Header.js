/**
 * Created by alex on 06/05/17.
 */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from '../common/avatar';

export default Header = (props) => {
    const { container, avatarContainer, name } = styles;
    const { user, onPress } = props;
    return (
    <TouchableOpacity onPress={onPress}>
        <View style={container}>
            <Text style={name}>{user.name}</Text>
            <View style={avatarContainer}>
                <Avatar uri={user.avatar}></Avatar>
            </View>
        </View>
    </TouchableOpacity>
    );
};


const styles = {
    container: {
        borderBottomWidth: 1,
        backgroundColor: '#BBBBBB',
        borderColor: '#AAAAAA',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    avatarContainer: {
        height: 40, width: 40,
        //borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        margin: 5
    },
    name: {
        marginLeft: 5,
        fontWeight: 'bold'
    }
};
