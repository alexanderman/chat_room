/**
 * Created by alex on 04/05/17.
 */
import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import UserList from './components/user/UserList.js';
import Chat from './components/chat';

// TODO: this shit causes BUG with propTypes, probably the transferring of props through Scene, fix --> use redux
const RouterComponent = () => {
    return (
    <Router sceneStyle={{ paddingTop: 64 }}>

        <Scene key="chat" component={Chat} title="Chat"></Scene>
        <Scene key="userList" component={UserList} title="Users"
               rightTitle="Chat"
               onRight={() => {console.log('WTF!!!'); return Actions.chat()}}
               initial
        />

    </Router>
    );
};


export default RouterComponent;





