import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Image,
  Alert
} from 'react-native';
import React, { useState } from 'react'
import SvgIcon from '../../../../Asets/SvgIcon';
import axios from 'axios';
// import { postData } from '../../../Hooks/ApiHelper';
// import { UrlConstants } from '../../Constants/UrlConstants';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ForgotPasswordImg from '.././../../../Asets/forgot.png'
import { useToast } from 'react-native-fast-toast';



const ForgotPass = ({ navigation }) => {
  const toast = useToast()
  const [inputs, setInputs] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState({});
  const LoginScreen = () => {
    navigation.replace('login');
  };


  const handleLogin = async () => {
    validateSchema()
    console.log(validateSchema())
    if (validateSchema()) {
      let payload = {
        email: inputs.email,
        newPassword: inputs.newPassword,
        confirmPassword: inputs.confirmPassword,
      }
      
      axios
        .post('https://srninfotech.com/projects/dmdesk/forgetPassword', payload)
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.password_status);
          if(response.data.result == "true"){
            
            if(response.data.passNot == 'false'){

              // Alert.alert("Your password not matched please enter new password and confirm password same")
            }else{
              // Alert.alert("password has been successfully changed")
              navigation.navigate('login');
            }
         
          } else if(response.data.result == "false"){
            // Alert.alert("Email address does not  exists")
            navigation.navigate('Forgotpassword');
          }

        })
        .catch((error) => {
          console.error("something went wong", error.message);
          setErrors(error.message);
        });

    } else {
      toast.show("Fill all inputs first", { type: "danger" });
    }
  }


  function validateSchema() {
    Keyboard.dismiss();
    let isValid = true;
    if (inputs?.email?.length == 0) {
      handleError('Please input email', 'email');
      isValid = !isValid;
    }
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
      return true
    }
    else {
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
    <ScrollView>
      {console.log(errors)}
      <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <View style={{ paddingHorizontal: 20 }}>
          <Pressable onPress={LoginScreen}>
            {/* <SvgIcon icon='back' width={30} height={30} /> */}

          </Pressable>
        </View>
        <View style={{ position: 'relative', bottom: 0 }}>
          <View style={styles.loginIcon}>
            {/* <SvgIcon icon='forgot' width={240} height={240} /> */}
            <Image source={ForgotPasswordImg} style={{ width: 260, height: 260 }} resizeMode="contain" />
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
                  {/* <TextInput
                  style={styles.textInput}
                  placeholder={'Email ID'}
                  placeholderTextColor={'#aaa'}
                /> */}
                  <Input

                    onChangeText={text => handleOnchange(text, 'email')}
                    onFocus={() => handleError(null, 'email')}
                    label="Email"
                    placeholder="Enter your email address"
                    placeholderTextColor="gray"
                    error={errors.email}
                  />

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
             

            <View style={ { bottom: 20 }}>
              <Button title="Log In" onPress={handleLogin} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default ForgotPass

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
    fontSize: 30,
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
    bottom:15
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
    //   fontFamily: Fonts.type.NotoSansRegular,
  },
});