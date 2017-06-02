import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
//import { connect } from 'react-redux';

import UserList from './components/user/UserList.js';
import Navigation from './components/Navigation';
import Chat from './components/chat';
import reducers from './reducers';
//import { navigateToChat, navigateToUserList } from './actions';

/** services imports */
import firebaseConfig from '../config/firebase-config';
import FirebaseService from './services/firebase';
import Room from './services/firebase/chat/Room';
import { userListUpdate, receiveMessage } from './actions';

import UserMock from './data/userMock';

//const usersMock = {
//    'ttX8JBjnfdXA4b59O9cBAUSxw723': {
//        id: 'ttX8JBjnfdXA4b59O9cBAUSxw723', name: 'Iphone', avatar: 'https://ams1.wmbcdn.com/00/12/67/1612762100/1763025716_square.jpg?hash=ZLlfku2zinVLVFJ_fgDPBg&expires=64060578000&updated=1492719964', description: 'Love life, smiles, happy happy, joy joy. \n #MERCEDES, #VICORIA SECRET', notificationCount: 13
//    },
//    'dbOSoGMqx8eoqY0dUeMg0HTiXRA3': {
//        id: 'dbOSoGMqx8eoqY0dUeMg0HTiXRA3', name: 'Android', avatar: 'https://ams2.wmbcdn.com/82/67/40/1744047628/1763130505_square.jpg?hash=jlgfmlfArnVCUBvze6cugA&expires=64060578000&updated=1492765076', description: 'loving and caring person, have three kids from four fathers and a mortgage. \nlooking for you, my one and only'
//    }
//};

/**
 * connect GiftedChat
 */

class App extends Component {
    componentWillMount() {
        FirebaseService.init(firebaseConfig, () => {
            console.log('[FirebaseService] initiated');

            /** fetch predefined roomId */
            var room = FirebaseService.chat.fetchRoom('-KlVFglQa61IdiAIPkdp', room => {});
            room.addUsers([FirebaseService.currentUser().uid]);

            /** subscribe to all room events */
            room.subscribe(Room.eventType.room_updated, room => {
                console.log('[app room_updated]', room);
            });
            room.subscribe(Room.eventType.message_received, (room, message) => {
                console.log('[app message_received]', message);

                this.store.dispatch(
                    receiveMessage(message)
                );
            });

            room.subscribe(Room.eventType.users_updated, room => {
                console.log('[app users_updated]', room.users);

                this.store.dispatch(
                    userListUpdate(room.users.map(userId => {
                        return UserMock[userId] || { id: userId };
                    }))
                );
            });

            //TODO: this is ugly!!!
            FirebaseService.room = room;

            /** testing */
            //FirebaseService.enterRoom = () => {
            //    room.addUsers([FirebaseService.currentUser().uid]);
            //};
            //
            //FirebaseService.leaveRoom = () => {
            //    room.removeUsers([FirebaseService.currentUser().uid]);
            //};


        });
    }

    store = createStore(reducers, {  }, applyMiddleware(ReduxThunk));

    render() {

        const { container } = styles;

        //return (
        //    <Router />
        //);



        /** APP */
        return (
        <Provider store={this.store}>
            <View style={container}>
                <Navigation></Navigation>
            </View>
        </Provider>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DDDDDD",
        flex: 1,
        paddingTop: 22
    }
});


import { Test4, Test2, RoundBorderImage, ChatTest } from './TestLayouts';
import GFExample from './TestGiftedChat';

const TestApp = () => {
    //return (
    //    <Test4 param="alex" onPress={(param) => { console.log(param); }}></Test4>
    //);

    //return (
    //<Test2></Test2>
    //);

    //return (
    //<RoundBorderImage></RoundBorderImage>
    //);

    //return (
    //    <ChatTest></ChatTest>
    //);

    return (
        <GFExample></GFExample>
    );
};

export default App;
//export default TestApp;

//const mapStateToProps = state => {
//    console.log('** App mapStateToProps', state);
//    return {  };
//};

//export default connect(mapStateToProps, { })(App);
