import React from 'react';
import Logo from '../../../Asets/GovtLogo.png'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text, SafeAreaView, Keyboard, Alert, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import { useState } from 'react';
import Loader from '../components/Loader';
import { useToast } from 'react-native-fast-toast';

const LoginScreen = ({ navigation }) => {
  const toast = useToast();

  const [inputs, setInputs] = React.useState({ email: '', password: '' });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('')

  // ----------------------------------------new credential -----------------
  const [email, setEmail] = useState('anil@gmail.com');
  const [password, setPassword] = useState('anil@123');
  
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setisValid] = useState(false);

  // ----------------------------------------new credential -----------------
  const ForgotPassword = () => {
    navigation.navigate('');
  };
  const handleLogin = async () => {
    validateSchema()
    if (validateSchema()) {
      let payload = {
        email: inputs.email,
        pass: inputs.password
      }
      console.log(payload)
      axios
        .post('https://srninfotech.com/projects/dmdesk/login', payload)
        .then(async (response) => {
          console.log("??" +JSON.stringify( response.data));
          if(response.data.l_status == "false") {
            toast.show('Wrong password', {
              type: 'danger',
              position: 'top',
            });
          }

          if (response.data.user_type == "dm") {
            await AsyncStorage.setItem("userType", response.data.user_type)
            navigation.navigate('HomeScreenDm');
            // await AsyncStorage.set('var', 'HomeScreenDm');
          } else if (response.data.user_type == "pa") {
            await AsyncStorage.setItem("userType", response.data.user_type)
           await AsyncStorage.setItem("city", response.data.city)
           
            navigation.navigate('HomeScreenPa');
            // await AsyncStorage.set('var', 'HomeScreenPa');
          }
          else if (response.data.user_type == "ad") {
            await AsyncStorage.setItem("userType", response.data.user_type)
            navigation.navigate('HomeScreenAdmin');
            // await AsyncStorage.set('var', 'HomeScreenAdmin');
          }
        })
        .catch((error) => {
          console.error("something went wong", error.message);
          setErrors(error.message);
        });
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
      {console.log(JSON.stringify(errors))}
      <Loader visible={loading} />

      <View style={{ paddingHorizontal: 20, paddingTop: 60 }}>

        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column-reverse', alignItems: 'center' }}>
          <Text style={{ color: COLORS.black, fontSize: 40, fontWeight: 'bold' }}>
            Log In
          </Text>
          {/* <Text style={{color:'black'}}>hellllo</Text> */}
          <Image source={Logo} style={{ width: 100, height: 100 }} resizeMode="contain" />
        </View>

        {/* <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
          Enter Your Details to Login
        </Text> */}

        {/* --------------------------old login inpute --------------------------- */}
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

          {/* ----------------------------------------------- */}

          {/* <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor = "gray"
        label="Email"
        error={"true"}
      />
      <Input
        placeholder="Password"
        label="Password"
        error={true}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}x
        placeholderTextColor = "gray"
      />
   
 */}
          {/* --------------------------------------------- */}
          <Button title="Log In" onPress={handleLogin} />

          <Text
            onPress={() => navigation.navigate('Forgotpassword')}
            style={{
              color: COLORS.black,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 16,
            }}>
            Forgot Password ?
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;


const styles = StyleSheet.create({

  logo: {
    width: '20%',

  }
})