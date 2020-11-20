import React from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {ModalStack} from './ModalStack';
import {MainTabStack} from './MainTabStack';
import {ModalsScreen} from '../ModalsScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name={'MainTab'} component={MainTabStack}/>
      <Stack.Screen name={'Modals'} component={ModalsScreen}/>
      {Object.entries({
        ...ModalStack,
      }).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component}/>
      ))}
    </Stack.Navigator>
  );
};
