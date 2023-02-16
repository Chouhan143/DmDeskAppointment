import React from 'react';
import Logo from '../../../Asets/GovtLogo.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

import { View, Text, SafeAreaView, Keyboard, Alert, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useToast } from 'react-native-fast-toast';
import { postData } from '../../Hooks/ApiHelper';
import { Login } from '../../Constants/UrlConstants';

const LoginScreen = ({ navigation }) => {
  const toast = useToast();

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  
  const handleLogin = async () => {
    validateSchema()
    if (validateSchema()) {
      let payload = {
        email: inputs.email,
        pass: inputs.password
      }
      console.log(payload)
      setLoading(true)
      const response = await postData(Login,payload)
      if(response.l_status == "false") {
        toast.show('Wrong password', {
          type: 'danger',
          position: 'top',
        });
      }
      if (response.user_type == "dm") {
        await AsyncStorage.setItem("userType", response.user_type)
        navigation.navigate('HomeScreenDm');
        // await AsyncStorage.set('var', 'HomeScreenDm');
      } else if (response.user_type == "pa") {
        await AsyncStorage.setItem("userType", response.user_type)
       await AsyncStorage.setItem("city", response.city)
       
        navigation.navigate('HomeScreenPa');
        // await AsyncStorage.set('var', 'HomeScreenPa');
      }
      else if (response.user_type == "ad") {
        await AsyncStorage.setItem("userType", response.user_type)
        navigation.navigate('HomeScreenAdmin');
        // await AsyncStorage.set('var', 'HomeScreenAdmin');
      }
      setLoading(false)

    }
  }


  // ----------------------------------------new credential -----------------


  function validateSchema() {
    Keyboard.dismiss();
    let isValid = true;
    if (inputs?.email.length == 0) {
      handleError('Please input email', 'email');
      isValid = !isValid;
    }
    if (inputs?.password.length == 0) {
      handleError('Please input password', 'password');
      isValid = !isValid;
    }
    if (isValid) {
      // login();
      return true
    } else {
      return false
    }
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 60 }}>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column-reverse', alignItems: 'center' }}>
          <Text style={{ color: COLORS.black, fontSize: responsiveFontSize(4), fontWeight: 'bold' }}>
            Log In
          </Text>
          <Image source={Logo} style={{ width: responsiveWidth(30), height: responsiveWidth(30) }} resizeMode="contain" />
        </View>
        <View style={{ marginVertical: 20 }}>
          <Input
            onChangeText={text => handleOnchange(text, 'email')}
            onFocus={() => handleError(null, 'email')}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
         
            placeholderTextColor="gray"
            error={errors.email}
          />
          <Input
            onChangeText={text => handleOnchange(text, 'password')}
            onFocus={() => handleError(null, 'password')}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor="gray"
            error={errors.password}
            password
          />
          <Button loader={loading} title="Log In" onPress={handleLogin} />
          <Text
            onPress={() => navigation.navigate('Forgotpassword')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: responsiveFontSize(2),
            }}>
            Forgot Password ?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;


