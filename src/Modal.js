import React, {useLayoutEffect} from 'react';
import {View, TouchableWithoutFeedback, StyleSheet, Dimensions, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PropTypes from 'prop-types';
import {useFocusEffect} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';

const deviceHeight = Dimensions.get('screen').height;

const Modal = ({animation, position, cancelable, opacity, style, children}) => {

  let transformType, animationObject;
  switch (animation) {
    case 'Up': {
      transformType = 'translateY';
      animationObject = {
        inputRange: [0, 1],
        outputRange: [-deviceHeight, 0],
        extrapolate: 'clamp',
      };
      break;
    }
    case 'Down': {
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
      cardStyle: {backgroundColor: 'transparent'},
      cardOverlayEnabled: true,
      headerShown: false,
      gestureEnabled: false,
      cardStyleInterpolator: ({current: {progress}}) => ({
        cardStyle: {
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
      }, [])
    );
  }

  let childPosition = {justifyContent: 'center'};
  if (position === 'Top') {
    childPosition = {justifyContent: 'flex-start'};
  } else if (position === 'Bottom') {
    childPosition = {justifyContent: 'flex-end'};
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <TouchableWithoutFeedback onPress={() => cancelable ? navigation.goBack() : false}>
        <View style={[styles.container, childPosition]}>
          <View onStartShouldSetResponder={() => true} style={style}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

Modal.propsType = {
  children: React.Children,
  cancelable: PropTypes.bool,
  opacity: PropTypes.number,
  position: PropTypes.oneOf(['Top', 'Center', 'Bottom']),
  animation: PropTypes.oneOf(['Up', 'Down']),
};

Modal.defaultProps = {
  cancelable: true,
  opacity: 0.5,
  position: 'Center',
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
