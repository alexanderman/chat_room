/**
 * Created by alex on 06/05/17.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';


function opponentRow(message) {
    const { bubbleOpponent, messageText } = styles;
    return (
    <View style={bubbleOpponent}>
        <Text style={messageText}>{message.text}</Text>
    </View>
    );
}

function myRow(message) {
    const { bubbleMy, messageText } = styles;
    return (
    <View style={bubbleMy}>
        <Text style={messageText}>{message.text}</Text>
    </View>
    );
}

export default ChatRow = ({ message, ismy }) => {
    const { container, containerMy, containerOpponent } = styles;
    return (
        <View style={[container, ismy ? containerMy : containerOpponent ]}>
            { ismy ? myRow(message) : opponentRow(message) }
        </View>
    );
};


const styles = {
    container: {
        flexDirection: 'row',
        marginTop: 10,
        //borderWidth: 1,
    },
    containerMy: {
        justifyContent: 'flex-end'
    },
    containerOpponent: {

    },
    bubbleOpponent: {
        backgroundColor: '#FFAA55',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        paddingTop: 5, paddingBottom: 5,
        marginLeft: 5, marginRight: 5
    },
    bubbleMy: {
        backgroundColor: '#EEEEEE',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        padding: 10,
        paddingTop: 5, paddingBottom: 5,
        marginLeft: 5, marginRight: 5
    },
    messageText: {
        color: '#000000'
    }
};
