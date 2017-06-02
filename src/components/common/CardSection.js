import React from 'react';
import { View, StyleSheet } from 'react-native';

const CardSection = (props) => {
    return (
        // react native feature to override style properties from right to left
        <View style={[styles.containerStyle, props.style]}>
            {props.children}
        </View>
    );
};


const styles = StyleSheet.create({
    containerStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative'
    }
});


export { CardSection };
