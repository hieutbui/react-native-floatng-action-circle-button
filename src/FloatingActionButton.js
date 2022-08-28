import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  Pressable,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import ActionButton from './ActionButton';
import Assets from '../assets/Assets';

/**
 * Place it inside the biggest component of screens for floating. You must pass at less 1 action to actions property
 * @author hieu
 * @typedef Props
 * @property {Object[]} actions: a list of actions for floating action button
 * @property {Boolean} actions[].disable: actions status (active/disable - default: true)
 * @property {()=>void=} actions[].onPress: event when actions is pressed
 * @property {String} actions[].label: label for action
 * @property {source} actions[].icon: custom Icon for CircleButton
 * @property {StyleProp<ViewStyle>} actions[].iconStyle: custom style for button's icon
 * @property {StyleProp<ViewStyle>} actions[].buttonStyle: custom style for button
 * @property {StyleProp<ViewStyle>} containerStyle: custom style for <View/> that wrap floating button
 * @property {StyleProp<ViewStyle>} actionButtonStyle: custom style for action button
 * @property {StyleProp<ViewStyle>} backgroundStyle: custom style for background
 * @property {StyleProp<ViewStyle>} anchorButtonStyle: custom style for anchor button
 * @property {ImageSourcePropType} anchorInactiveIcon: custom icon for anchor button
 * @property {ImageSourcePropType} anchorActiveIcon: custom icon for anchor button
 * @param {Props} props
 * @returns {JSX.Element}
 */

const fullScreenHeight = Dimensions.get('screen').height;
const fullScreenWidth = Dimensions.get('screen').width;

const FloatingActionButton = ({
  actions,
  containerStyle,
  actionButtonStyle,
  backgroundStyle,
  anchorButtonStyle,
  anchorActiveIcon,
  anchorInactiveIcon,
}) => {

  const activeAnchor = anchorActiveIcon ?? Assets.Icons.cancelFloating;

  const inactiveAnchor = anchorInactiveIcon ?? Assets.Icons.threeDots;

  const animation = useRef(new Animated.Value(0)).current;

  const [floatingCheck, setFloatingCheck] = useState(false);

  const [open, setOpen] = useState(0);

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 500,
      // friction: 5,
      useNativeDriver: true,
    }).start();

    setFloatingCheck(!floatingCheck);
    setOpen(!open);
  };

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -13],
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateX: labelPositionInterpolate,
      },
    ],
  };

  const scaleInterPolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 30],
  });

  const bgStyle = {
    transform: [
      {
        scale: scaleInterPolate,
      },
    ],
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        {
          width: open == 1 ? fullScreenWidth : 56,
          height: open == 1 ? fullScreenHeight : 56,
          borderRadius: open == 1 ? 0 : 28
        },
      ]}
    >
      <AnimatedTouchable
        style={[styles.background, bgStyle, backgroundStyle]}
        onPress={toggleMenu}
      />

      {actions.map((item) => {
        const itemStyle = {
          transform: [
            { scale: animation },
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -62 * (actions.indexOf(item) + 1)],
              }),
            },
          ],
        };

        const inactiveStyle = {
          opacity: animation.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 0, 0.5],
          }),
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -62 * (actions.indexOf(item) + 1)],
              }),
            },
          ],
        };

        return (
          <Animated.View key={actions.indexOf(item)} pointerEvents="box-none">
            <Animated.View style={[styles.button, itemStyle, actionButtonStyle]}>
              <Animated.Text
                style={[
                  {
                    ...styles.label,
                    color: item.disable
                      ? '#989898'
                      : '#ffffff',
                  },
                  labelStyle,
                ]}
              >
                {item.label}
              </Animated.Text>
              <ActionButton
                icon={item.icon}
                iconStyle={item.iconStyle}
                buttonStyle={item.buttonStyle}
                onPress={item.onPress}
              />
            </Animated.View>
            {item.disable && (
              <Animated.View style={[styles.background, inactiveStyle, backgroundStyle]} />
            )}
          </Animated.View>
        );
      })}

      <ActionButton
        icon={floatingCheck ? activeAnchor : inactiveAnchor}
        onPress={toggleMenu}
        buttonStyle={[{ backgroundColor: '#007aff' }, anchorButtonStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 7,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
  },
  button: {
    position: 'absolute',
    justifyContent: 'flex-end',
    right: -1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    position: 'absolute',
    right: 60,
  },
  background: {
    backgroundColor: '#000000',
    opacity: 0.5,
    position: 'absolute',
    width: 56,
    height: 56,
    right: -1,
    borderRadius: 28,
    flex: 1,
  },
});

export default FloatingActionButton;
