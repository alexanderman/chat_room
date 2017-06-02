/**
 * Created by alex on 26/05/17.
 */
/** https://github.com/FaridSafi/react-native-gifted-chat */

import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';


class GFExample extends Component {
    constructor(props) {

        super(props);
        //this.state = {messages: []};
        this.state = {
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                    image: 'https://s-media-cache-ak0.pinimg.com/originals/ff/a1/08/ffa1082732c2e5cbfaf3e96b59e44341.jpg',
                },
            ],
        };
        this.onSend = this.onSend.bind(this);
    }
    componentWillMount() {

        console.log('**** componentWillMount');

        setTimeout(() => {

            this.idCount = this.idCount || 1;
            this.idCount++;

            this.setState((prevState) => {
                return {
                    messages: [{
                            _id: this.idCount,
                            text: 'Hello developer Hello developer Hello developer Hello developer Hello developer ' + this.idCount,
                            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                            user: {
                                _id: 2,
                                name: 'React Native',
                                avatar: 'https://facebook.github.io/react/img/logo_og.png',
                            },
                            //image: 'https://s-media-cache-ak0.pinimg.com/originals/ff/a1/08/ffa1082732c2e5cbfaf3e96b59e44341.jpg',
                        },...prevState.messages]
                };
            });

        }, 3000);

    }
    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
    render() {
        console.log(this.state.messages);
        return (
        <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
        />
        );
    }
}

export default GFExample;