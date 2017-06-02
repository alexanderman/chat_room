/**
 * Created by alex on 05/05/17.
 */
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export const Label = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
    <View style={viewStyle}>
        <Text style={textStyle}>{props.children}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: '#CCCCCC',
        padding: 3,
        borderRadius: 5
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 12,
        color: '#444444'
    }
});
