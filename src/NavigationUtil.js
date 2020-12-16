import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export default class NavigationUtil {

  static  navigate(name, params) {
    if (isReadyRef.current && navigationRef.current) {
      // Perform navigation if the app has mounted
      navigationRef.current.navigate(name, params);
    } else {
      // You can decide what to do if the app hasn't mounted
      // You can ignore this, or add these actions to a queue you can call later
    }
  }

  static resetToHome() {
    navigationRef.current?.reset({
      index: 0,
      routes: [{ name: 'MainTab', params: {screen: 'Home'} }],
    });
  }

}


