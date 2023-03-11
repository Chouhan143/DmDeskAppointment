import Logo from './../../../src/assets/images/GovtLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {useContext} from 'react';

import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AppState,
} from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import {useToast} from 'react-native-fast-toast';
import {postData} from '../../Hooks/ApiHelper';
// import { Login } from '../../Constants/UrlConstants';
import {NewLoginUrl} from '../../Constants/UrlConstants';
import React, {useState, useEffect} from 'react';
import {AuthContext} from '../../LoginCredencial/context/AuthContext';

const LoginScreen = ({navigation}) => {
  const toast = useToast();
  const [inputs, setInputs] = React.useState({email: '', password: ''});
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const {login, userInformation} = useContext(AuthContext);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const id = await AsyncStorage.getItem('Token');
    if (id.length > 0) {
    } else {
      navigation.replace('login');
    }
  };

  // const handleLogin = async () => {
  //   validateSchema()
  //   if (validateSchema()) {
  //     let payload = {
  //       email: inputs.email,
  //       pass: inputs.password
  //     };
  //     setLoading(true)
  //     const response = await postData(Login,payload)
  //     console.log(response)
  //     if(response.l_status == "false") {
  //       toast.show('Wrong email or password', {
  //         type: 'danger',
  //         position: 'top',
  //       });
  //     }
  //     if (response.user_type == "dm")
  //     {
  //       await AsyncStorage.setItem("userType", response.user_type)
  //       navigation.replace('HomeScreenDm');

  //     }
  //      else if (response.user_type == "pa") {
  //       await AsyncStorage.setItem("userType", response.user_type)
  //       await AsyncStorage.setItem("city", response.city)
  //       navigation.replace('HomeScreenPa');

  //     }
  //     else if (response.user_type == "ad") {
  //       await AsyncStorage.setItem("userType", response.user_type)
  //       navigation.replace('HomeScreenAdmin');
  //     }
  //     setLoading(false)
  //   }
  // }

  const handleLogin = async () => {
    validateSchema();
    if (validateSchema()) {
      let payload = {
        email: inputs.email,
        password: inputs.password,
      };
      setLoading(true);
      const response = await postData(NewLoginUrl, payload);
      console.log('>>>' + JSON.stringify(response));
      if (response.status == 'true') {
        await AsyncStorage.setItem('Token', response.access_token);
        await AsyncStorage.setItem('id', response.id);
        if (response.user_type == 'dm') {
          await AsyncStorage.setItem('userType', response.user_type);
          navigation.replace('HomeScreenDm');
        } else if (response.user_type == 'pa') {
          await AsyncStorage.setItem('userType', response.user_type);
          await AsyncStorage.setItem('city', response.city);
          navigation.replace('HomeScreenPa');
        } else if (response.user_type == 'ad') {
          await AsyncStorage.setItem('userType', response.user_type);
          navigation.replace('HomeScreenAdmin');
        }
      } else {
        toast.show('Wrong email or password', {
          type: 'danger',
          position: 'top',
        });
      }

      setLoading(false);
    }
  };

  // const handleLogin = async () => {
  //   validateSchema();
  //   if (validateSchema()) {
  //     // login(inputs.email, inputs.password);

  //     const payload = {
  //       email: inputs.email,
  //       password: inputs.password
  //     }
  //     const result = postData(payload)

  //   }

  //     if (!userInformation) {
  //       toast.show('Wrong email or password', {
  //         type: 'danger',
  //         position: 'top',
  //       });
  //     }
  //      else {
  //       if (userInformation?.user_type == "dm")
  //     {
  //       await AsyncStorage.setItem("userType", userInformation.user_type)
  //       navigation.replace('HomeScreenDm');

  //     }
  //      else if (userInformation?.user_type == "pa") {
  //       await AsyncStorage.setItem("userType", userInformation.user_type)
  //       await AsyncStorage.setItem("city", userInformation.city)
  //       navigation.replace('HomeScreenPa');

  //     }
  //     else if (userInformation?.user_type == "ad") {
  //       await AsyncStorage.setItem("userType", userInformation.user_type)
  //       navigation.replace('HomeScreenAdmin');
  //     }
  //     // setLoading(false)

  //       }

  // };

  // ----------------------------------------new credential --------------------------

  function validateSchema() {
    Keyboard.dismiss();
    let isValid = true;
    const isEmailValid = inputs?.email?.length > 0;
    if (!isEmailValid) {
      handleError('Please input email', 'email');
      isValid = false;
    }

    const isPasswordValid = inputs?.password?.length > 0;
    if (!isPasswordValid) {
      handleError('Please input password', 'password');
      isValid = false;
    }

    return isValid;
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <View style={{paddingHorizontal: 20, paddingTop: 60}}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column-reverse',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: COLORS.black,
              fontSize: responsiveFontSize(4),
              fontWeight: 'bold',
            }}>
            Log In
          </Text>
          <Image
            source={Logo}
            style={{width: responsiveWidth(30), height: responsiveWidth(30)}}
            resizeMode="contain"
          />
        </View>
        <View style={{marginVertical: 20}}>
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
          {/* <Button loader={loading} title="Log In"  onPress={() => {
            login(inputs.email, inputs.password);
          }} /> */}
          <Text
            // onPress={() => navigation.navigate('Forgotpassword')}
            onPress={() => navigation.navigate('NewPassword')}
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
