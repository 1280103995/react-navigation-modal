import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {MainTabStack} from './MainTabStack';
import {ModalsScreen} from '../ModalsScreen';
import {FlashScreen} from './FlashScreen';

const Stack = createStackNavigator();

export const ScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {/*<Stack.Screen name={'Flash'} component={FlashScreen}/>*/}
      <Stack.Screen name={'MainTab'} component={MainTabStack}/>
      <Stack.Screen name={'Modals'} component={ModalsScreen}/>

    </Stack.Navigator>
  );
};
