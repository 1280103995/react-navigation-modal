import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

export const ModalsScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Modals'
    });
  });

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc' }}>
      <TouchableOpacity onPress={() => navigation.navigate('Top')} style={styles.btn}>
        <Text>Top modal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Form')}>
        <Text>Form modal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Bottom')}>
        <Text>Bottom modal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    padding: 20,
    backgroundColor: '#AADDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});
