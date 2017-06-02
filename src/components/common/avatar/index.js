/**
 * Created by alex on 06/05/17.
 */
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';


const placeholders = [
    require('./avatarPlaceholders/avatar-1.png'),
    require('./avatarPlaceholders/avatar-2.png'),
    require('./avatarPlaceholders/avatar-3.png'),
    require('./avatarPlaceholders/avatar-4.png')
];
const staticPlaceholder = require('./avatarPlaceholders/placeholder.png');

function randomPlaceholder() {
    let index = Math.floor(Math.random() * placeholders.length);
    return placeholders[index];
}

export const Avatar = ({ uri, random }) => {
    return (
        uri
        ? <Image source={{ uri: uri }} style={styles.image}></Image>
        : <Image source={random ? randomPlaceholder() : staticPlaceholder} style={styles.image}></Image>
    );
};


const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderWidth: 0,
        borderRadius: 10,
    }
});