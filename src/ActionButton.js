import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    StyleProp,
    ViewStyle,
    ImageSourcePropType
} from 'react-native';

/**
 * @author hieu
 * @typedef Props
 * @property {ImageSourcePropType} icon: icon path
 * @property {StyleProp<ViewStyle>=} iconStyle: custom style for icon
 * @property {StyleProp<ViewStyle>=} buttonStyle: custom style for button
 * @property {()=>void=} onPress: handle press button
 * @param {Props} props
 * @returns {JSX.Element}
 */
const ActionButton = ({ icon, iconStyle, buttonStyle, onPress }) => {
    return (
        <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
            <Image source={icon} style={[styles.icon, iconStyle]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 23,
        resizeMode: 'contain',
    },
    button: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
});

export default ActionButton;
