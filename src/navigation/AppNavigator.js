import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ModalStack} from './ModalStack';
import {ScreenStack} from './ScreenStack';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      {/* App Screens */}
      <Stack.Screen name={'Screens'} component={ScreenStack}/>

      {/* Modals */}
      {Object.entries({
        ...ModalStack,
      }).map(([name, component]) => (
        <Stack.Screen key={name} name={name} component={component}/>
      ))}

    </Stack.Navigator>
  );
};
