import React from 'react';
import {
  Button,
  View
} from 'react-native';

export const HomeScreen = ({navigation}) => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title={'Go to ModalScreen'} onPress={()=>navigation.navigate('Modals')}/>
    </View>
  );
};

