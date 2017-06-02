/**
 * Created by alex on 06/05/17.
 */
import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/** Model
 * user = {
 *   id: '',
 *   avatar: '',
 *   name: '',
 *   description: ''
 * }
 * */


export default UserListItemContent = ({ user }) => {
    return (
    <View style={styles.container}>
        <Text style={styles.description}>{user.description}</Text>
        <Text style={styles.name}>{user.name}</Text>
    </View>
    );
};


const styles = {
    container: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderRadius: 10,
    },
    name: {
        fontSize: 14,
        lineHeight: 18,
        color: '#FFFFFF',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        fontWeight: '500',
        padding: 5,
        paddingLeft: 10, paddingRight: 10,
        maxHeight: 28,
        borderRadius: 10,
    },
    description: {
        fontSize: 12,
        lineHeight: 16,
        color: '#FFFFFF',
        fontWeight: '100',
        padding: 5,
        paddingLeft: 10, paddingRight: 10,
        borderRadius: 10,
    }
};
