import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Modal from './Modal';

export const TopModal = () => {
  return (
    <Modal position={'Top'} animation={'Up'} style={styles.content}>
      <Text>Hello</Text>
    </Modal>
  );
};

export const FormModal = ({navigation}) => {
  return (
    <Modal cancelable={false} style={styles.content}>
      <Text>Email</Text>
      <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Top');
          }}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export const BottomModal = () => {
  return (
    <Modal
      opacity={0}
      position={'Bottom'}
      animation={'Down'}
      style={styles.content}>
      <Text>Hello</Text>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    alignSelf:'center',
    // width: '85%',
    // height: 500,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
  },
  btn: {
    width: '40%',
    padding: 16,
    backgroundColor: '#AADDFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    height: 40,
  },
});
