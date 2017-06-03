/**
 * Created by alex on 31/05/17.
 */

import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import FirebaseService from '../../services/firebase';
import { connect } from 'react-redux';
import { sendMessage } from '../../actions';



class GChat extends Component {
    constructor(props) {
        super(props);
    }
    onSend(messages = []) {
        messages.forEach((message) => {
            this.props.sendMessage(this.props.room, message);
        });
    }
    render() {
        return (
        <GiftedChat
        messages={this.props.messages}
        onSend={this.onSend.bind(this)}
        user={this.props.user}
        />
        );
    }
}

const mapStateToProps = state => {
    console.log('** GChat mapStateToProps', state.chat);
    return state.chat;
};

export default connect(mapStateToProps, { sendMessage })(GChat);

