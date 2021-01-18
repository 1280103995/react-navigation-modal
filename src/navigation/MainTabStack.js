import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../HomeScreen';
import {SettingsScreen} from '../SettingsScreen';
import {ShopScreen} from '../ShopScreen';

const Tab = createBottomTabNavigator();

export const MainTabStack = () => {
  return (
    <Tab.Navigator
      backBehavior={'initialRoute'}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      tabBarOptions={{
        labelStyle: {
          fontSize: 18
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
