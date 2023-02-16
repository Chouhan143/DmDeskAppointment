import {
  Text,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Image,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import OTPInputView from '@twotalltotems/react-native-otp-input'
import React, {useState} from 'react';
import axios from 'axios';
// import { postData } from '../../../Hooks/ApiHelper';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ForgotPasswordImg from '.././../../../Asets/forgot.png';
import {useToast} from 'react-native-fast-toast';
import {postData} from '../../../Hooks/ApiHelper';
import {Forgot_Password} from '../../../Constants/UrlConstants';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const ForgotPass = ({navigation, route}, props) => {
  const toast = useToast();
  const {email} = route.params;
  const [inputs, setInputs] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({});
  const [otpNumber, setotpNumber] = useState('');

  const LoginScreen = () => {
    navigation.replace('NewPassword');
  };

  const handleLogin = async () => {
    validateSchema();
    if (validateSchema()) {
      let payload = {
        email: email,
        otp: otpNumber,
        newPassword: inputs.newPassword,
        confirmPassword: inputs.confirmPassword,
      };
      const result = await postData(Forgot_Password, payload);
      console.log(result);
      if (result.result == "true") {
      toast.show('Changed', {type: 'success'});
      navigation.navigate('login');
      // if (result.result == 'true') {
        //   if (result.passNot == 'false') {
          //   } else {
            //     navigation.navigate('login');
            //   }
            // } else if (result.result == 'false') {
              //   // Alert.alert("Email address does not  exists")
              //   navigation.navigate('Forgotpassword');
              // }
      } else {
        toast.show('otp did  not matched', {type: 'danger'});
      }
    } else {
      toast.show('Fill all inputs first', {type: 'danger'});
    }
  };

  function validateSchema() {
    Keyboard.dismiss();
    let isValid = true;
    if (inputs?.newPassword.length == 0) {
      handleError('Please input password', 'newPassword');
      isValid = !isValid;
    }
    if (inputs?.confirmPassword.length == 0) {
      handleError('Please input confirm password', 'confirmPassword');
      isValid = !isValid;
    }
    if (inputs?.confirmPassword.length > 0 && inputs.newPassword.length > 0) {
      if (inputs?.newPassword !== inputs.confirmPassword) {
        handleError("Confirm password don't match", 'confirmPassword');
        isValid = !isValid;
      }
    }
    if (isValid) {
      return true;
    } else {
      return false;
    }
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  // const validateOtp = () => {

  // }

  return (
    <ScrollView>
      {console.log(JSON.stringify(email))}
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{paddingHorizontal: 20}}>
          <Pressable onPress={LoginScreen}>
            {/* <SvgIcon icon='back' width={30} height={30} /> */}
          </Pressable>
        </View>
        <View style={{position: 'relative', bottom: 0}}>
          <View style={styles.loginIcon}>
            {/* <SvgIcon icon='forgot' width={240} height={240} /> */}
            <Image
              source={ForgotPasswordImg}
              style={{width: responsiveWidth(70), height: responsiveWidth(70)}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Forgot Password?</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter the address associated
                with your account
              </Text>
            </View>

            <View style={styles.textCon}>
              <OTPInputView
                pinCount={6}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                codeInputFieldStyle={{color: '#000'}}
                onCodeFilled={code => setotpNumber(code)}
              />
              {/* <Input

                    onChangeText={text => handleOnchange(text, 'email')}
                    onFocus={() => handleError(null, 'email')}
                    label="Email"
                    placeholder="Enter your email address"
                    placeholderTextColor="gray"
                    error={errors.email}
                  /> */}

              {/* <TextInput
                  style={styles.textInput}
                  placeholder={'New Password'}
                  placeholderTextColor={'#aaa'}
                /> */}

              <Input
                onChangeText={text => handleOnchange(text, 'newPassword')}
                onFocus={() => handleError(null, 'newPassword')}
                label="New password"
                placeholder="New password"
                length={6}
                placeholderTextColor="gray"
                error={errors.newPassword}
              />
              {/* <TextInput confirmPassword
                  style={styles.textInput}
                  placeholder={'Confirm Password'}
                  placeholderTextColor={'#aaa'}
                /> */}
              <Input
                onChangeText={text => handleOnchange(text, 'confirmPassword')}
                onFocus={() => handleError(null, 'confirmPassword')}
                label="Confirm password"
                placeholder="Confirm password"
                placeholderTextColor="gray"
                error={errors.confirmPassword}
              />
            </View>

            <View style={{bottom: 20}}>
              <Button title="Log In" onPress={handleLogin} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ForgotPass;

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: '#fff',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: '#000',
    fontSize: responsiveFontSize(3),
    //   fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: 'center',
    width: '10%',
  },

  textBoxCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCon: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    // alignItems:'center'
    bottom: 15,
  },

  textInput: {
    borderBottomColor: '#aaa',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: '#000',
    fontSize: 16,
    //   fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },

  LoginBtn: {
    backgroundColor: '#0057ff',
    borderRadius: 20,
  },
  loginBtnLbl: {
    textAlign: 'center',
    fontSize: 16,
    //   fontFamily: Fonts.type.NotoSansBlack,
    color: '#fff',
    paddingVertical: 10,
  },

  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
    fontSize: responsiveFontSize(2),
    //   fontFamily: Fonts.type.NotoSansRegular,
  },
});
