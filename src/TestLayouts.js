/**
 * Created by alex on 06/05/17.
 */
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, ScrollView, Image } from 'react-native';


export const Test1 = () => {
    const { container, red, green, blue } = stylesTest1;
    return (
        <View style={container}>
            <View style={red}><Text>khdskahkjadh ajkdhsa kdahsjdh jakhdsaj khdskahkjadh ajkdhsa kdahsjdh jakhdsaj khdskahkjadh ajkdhsa kdahsjdh jakhdsaj khdskahkjadh ajkdhsa kdahsjdh jakhdsaj khdskahkjadh ajkdhsa kdahsjdh jakhdsaj khdskahkjadh ajkdhsa kdahsjdh jakhdsaj khdskahkjadh ajkdhsa kdahsjdh jakhdsaj </Text></View>
            <View style={green}></View>
            <View style={blue}></View>
        </View>
    );
};
const stylesTest1 = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        backgroundColor: '#000000'
    },
    red: {
        height: 100,
        flex: 1,
        //width: 50,
        backgroundColor: '#550000'
    },
    blue: {
        height: 100,
        flex:1,
        //width: 50,
        backgroundColor: '#000055'
    },
    green: {
        height: 100,
        //width: 200,
        flex: 1,
        backgroundColor: '#005500'
    }
});



/** making list of squares like float:left layout */
export const Test2 = () => {
    function renderList() {
        let list = [];
        for (var i=0; i<30; i++) {
            list.push(<View style={item} key={i}><Text>{i+1}</Text></View>);
        }
        return list;
    }
    const { container, item } = stylesTest2;
    return (
        <ScrollView>
            <View style={container}>
                {renderList()}
            </View>
        </ScrollView>
    );
};
const stylesTest2 = StyleSheet.create({
    scroll: {

    },
    container: {
        //paddingTop: '1%',
        //paddingLeft: '1%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#000000',
        //justifyContent: 'center',
        //alignItems: 'flex-start',
        //alignContent: 'space-around'
    },
    item: {
        width: '32.3%',
        minHeight: 100,

        marginBottom: '1%',
        marginRight: '1%',

        backgroundColor: '#666666',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#555555',
        borderRadius: 5,

        justifyContent: 'center',
        alignItems: 'center'
    }
});


/** create element with round corners and nice shadow */
export const Test3 = () => {
    const { container, content } = stylesTest3;
    return (
    <ScrollView>
        <View style={container}>
            <View style={content}></View>
        </View>
    </ScrollView>
    );
};
const stylesTest3 = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 10, paddingLeft: 10,
    },
    content: {
        marginTop: 10, marginRight: 10,
        width: 100, height: 100,
        backgroundColor: '#DDDDDD',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1
    }
});

/** TouchableOpacity */
class Test4 extends Component {
    onPress() {
        console.log('pressed');
        this.props.onPress(this.props.param);
    }

    render() {
        const { container, button, text } = stylesTest4;
        return (
        <View style={container}>
            <TouchableOpacity style={button} onPress={this.onPress.bind(this)}>
                <Text style={text}>button</Text>
            </TouchableOpacity>
        </View>
        );
    }
}
export { Test4 };
const stylesTest4 = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        backgroundColor: '#000088',
        borderRadius: 10,
        padding: 20
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    }
});



export const RoundBorderImage = () => {
    const { image, container } = RoundBorderImageStyle;
    return (
        <View style={container}>
            <Image style={image} source={{ uri: 'https://ams1.wmbcdn.com/00/12/67/1612762100/1763025716_square.jpg?hash=ZLlfku2zinVLVFJ_fgDPBg&expires=64060578000&updated=1492719964' }}></Image>
        </View>
    );
};
const RoundBorderImageStyle = StyleSheet.create({
    container: {
        //backgroundColor: "#00FF00",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 20,
        borderWidth: 1,
        //borderColor: 'black',
    }
});


import firebaseConfig from '../config/firebase-config';
import FirebaseService from './services/firebase';


class ChatTest extends Component {
    componentWillMount() {
        console.log('...initializing firebase service...');
        FirebaseService.init(firebaseConfig, () => {
            console.log(FirebaseService.chat);
        });
    }

    initFirebase() {
        console.log('initFirebase pressed');

        FirebaseService.init(firebaseConfig, () => {
            console.log(FirebaseService.chat);
        });
    }

    createChatRoom() {
        console.log('createChatRoom pressed');

        FirebaseService.chat.createRoom(['user1', 'user2', 'user3'], { name: 'test chat room' });
    }

    render() {
        const { container, button, text } = stylesChatTest;
        return (
        <View style={container}>
            <TouchableOpacity style={button} onPress={this.initFirebase.bind(this)}>
                <Text style={text}>init firebase service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button} onPress={this.createChatRoom.bind(this)}>
                <Text style={text}>create chat room</Text>
            </TouchableOpacity>
        </View>
        );
    }
}
export { ChatTest };
const stylesChatTest = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        borderWidth: 1,
        backgroundColor: '#555555',
        borderRadius: 10,
        padding: 10,
        marginTop: 5
    },
    text: {
        color: 'white'
    }
});
