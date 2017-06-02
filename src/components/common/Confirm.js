import React, { Component } from 'react';
import { Text, View, Modal, StyleSheet } from 'react-native';
import  { CardSection } from './CardSection';
import { Button } from './Button';


const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, textStyle, cardSectionStyle } = styles;


    function oldReturn() {
        return (
            <Modal
            visible={true}
            transparent
            animationType="slide"
            onRequestClose={() => {}}
            >
                <View style={containerStyle}>
                    <CardSection style={cardSectionStyle}>
                        <Text style={textStyle}>{children}</Text>
                    </CardSection>

                    <CardSection>
                        <Button onPress={onAccept}>Yes</Button>
                        <Button onPress={onDecline}>No</Button>
                    </CardSection>
                </View>
            </Modal>
        );
    }

    console.log('visible',visible);
    return visible ? (
        <CardSection style={styles.absolutePos}>
            <View style={containerStyle}>
                <CardSection style={cardSectionStyle}>
                    <Text style={textStyle}>{children}</Text>
                </CardSection>

                <CardSection>
                    <Button onPress={onAccept}>Yes</Button>
                    <Button onPress={onDecline}>No</Button>
                </CardSection>
            </View>
        </CardSection>
    ) : (null);

};

const styles = StyleSheet.create({
    absolutePos: {
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0, right: 0,
        zIndex: 1
    },
    cardSectionStyle: {
        justifyContent: 'center'
    },
    textStyle: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        lineHeight: 40
    },
    containerStyle: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center'
    }
});

export { Confirm };