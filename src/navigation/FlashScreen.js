import React from 'react';
import {
  Button,
  View
} from 'react-native';
import NavigationUtil from '../NavigationUtil';

export const FlashScreen = ({navigation}) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title={'reset to HomeScreen'} onPress={()=> {
        // navigation.navigate('MainTab', {
        //   screen: 'Settings'
        // })
        NavigationUtil.resetToHome()
      }}/>
    </View>
  );
};

