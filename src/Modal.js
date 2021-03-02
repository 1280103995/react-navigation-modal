import React, {Fragment, useLayoutEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  BackHandler,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

const deviceHeight = Dimensions.get('screen').height;

const Modal = ({animation, position, cancelable, opacity, style, children, config}) => {

  let transformType, animationObject;
  switch (animation) {
    case 'up': {
      transformType = 'translateY';
      animationObject = {
        inputRange: [0, 1],
        outputRange: [-deviceHeight, 0],
        extrapolate: 'clamp',
      };
      break;
    }
    case 'down': {
      transformType = 'translateY';
      animationObject = {
        inputRange: [0, 1],
        outputRange: [deviceHeight, 0],
        extrapolate: 'clamp',
      };
      break;
    }
    default: {
      transformType = 'scale';
      animationObject = {
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      };
      break;
    }
  }

  const navigation = useNavigation();
  useLayoutEffect(() => {
    const modalOptions = {
      mode: 'modal',
      cardStyle: {backgroundColor: 'transparent'},
      cardOverlayEnabled: true,
      headerShown: false,
      gestureEnabled: false,
      cardStyleInterpolator: ({current: {progress}}) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.7, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
          transform: [
            {
              [transformType]: progress.interpolate(animationObject),
            },
          ],
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, opacity],
            extrapolate: 'clamp',
          }),
        },
      }),
      ...config,
    };

    navigation.setOptions(modalOptions);
  }, []);

  if (!cancelable) {
    useFocusEffect(
      React.useCallback(() => {
        const onBackPress = () => !cancelable;
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, []),
    );
  }

  let childPosition = {justifyContent: 'center'};
  if (position === 'top') {
    childPosition = {justifyContent: 'flex-start'};
  } else if (position === 'bottom') {
    childPosition = {justifyContent: 'flex-end'};
  }

  return (
    <Fragment>
      <TouchableWithoutFeedback onPress={() => cancelable ? navigation.goBack() : false}>
        <View style={styles.container}/>
      </TouchableWithoutFeedback>
      <SafeAreaView
        edges={['right', 'top', 'left']}
        pointerEvents="box-none"
        style={[styles.contentView, childPosition]}>
        <Animated.View style={style}>
          {children}
        </Animated.View>
      </SafeAreaView>
    </Fragment>
  );
};

Modal.propsType = {
  children: React.Children,
  cancelable: PropTypes.bool,
  opacity: PropTypes.number,
  position: PropTypes.oneOf(['top', 'center', 'bottom']),
  animation: PropTypes.oneOf(['up', 'down']),
};

Modal.defaultProps = {
  cancelable: true,
  opacity: 0.5,
  position: 'center',
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentView: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});
