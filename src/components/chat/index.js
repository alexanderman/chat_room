/**
 * Created by alex on 06/05/17.
 */
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import Header from './Header';
import ChatRow from './ChatRow';

const chatData = {
    messages: [
        { id: 1, text: 'Hey!))', senderId: '1', time: '' },
        { id: 2, text: 'Looking good, how is it going, chat chat blabla.. so nice)', senderId: '1', time: '' },
        { id: 5, text: 'Hi...\ndo i know u?', senderId: '0', time: '' },
        { id: 3, text: 'sure thing, that what I\'m here for, lets go baby and do some bla bla bla', senderId: '0', time: '' },
        { id: 4, text: 'Oh, you so nice, zero convincing time, how nice and whatever shit dick ass bla', senderId: '1', time: '' },
        { id: 6, text: 'mmm... bye', senderId: '0', time: '' }
    ]
};
function isMyMessage(message) {
    return message.senderId === '0';
}



export default class Chat extends Component {
    renderChat() {
        let list = chatData.messages.map((message) => {
            return <ChatRow key={message.id} ismy={isMyMessage(message)} message={message}></ChatRow>;
        });
        return list;
    }

    render() {
        //console.log(this.props);
        const { container, chatContainer } = styles;
        const { user, onHeaderPress } = this.props;
        return (
            <View style={container}>
                <Header user={user} onPress={onHeaderPress}></Header>

                <ScrollView>
                    <View style={chatContainer}>
                        {this.renderChat()}
                    </View>
                </ScrollView>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
    },
    chatContainer: {
        flex: 1
    }
};
