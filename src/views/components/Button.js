import React from 'react';
import { ActivityIndicator } from 'react-native';
import {TouchableOpacity, Text} from 'react-native';
import COLORS from '../../conts/colors';
const Button = ({title, onPress = () => {},loader}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={loader}
      style={{
        height: 55,
        width: '100%',
        backgroundColor: COLORS.blue,
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: COLORS.white, fontWeight: 'bold', fontSize: 18}}>
         {
          loader == true ?  <ActivityIndicator color={'white'} /> :title
         }
        
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
