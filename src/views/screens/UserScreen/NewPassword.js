import React, { useState } from 'react';
import axios from 'axios';
import { Post_Email_Otp } from '../../../Constants/UrlConstants';
import {
    Text,
    View,
    Pressable,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    Keyboard,
} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import Input from '../../components/Input';
import Button from '../../components/Button';
import ForgotPasswordImg from '../../../assets/images/otp.png';
import { getData, getData2, postData } from '../../../Hooks/ApiHelper';
import { useToast } from 'react-native-fast-toast';
// import SvgIcon from '../../../../Asets/SvgIcon';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

const NewPassword = ({ navigation }) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
    const ForgotPasswordScreen = () => {
        navigation.replace('Forgotpassword');
    };
    const [errors, setErrors] = React.useState({});
    const [inputs, setInputs] = useState({
        email: "",
      });

      const handleLogin = async () => {
        setIsLoading(true); // disable button
        // validateSchema()
        if (validateSchema()) {
         const result = await getData(Post_Email_Otp + `?email=${inputs.email}`)
         console.log("result" + JSON.stringify(result))
          if(result.result == "true") {
            navigation.navigate('Forgotpassword', {email: inputs.email});
          } else {
            toast.show("Email id is not registered", { type: "danger" });
          }
        } else {
          toast.show("Fill all inputs first", { type: "danger" });
        }
        setIsLoading(false); // enable button
      }
    
      function validateSchema() {
        Keyboard.dismiss();
        let isValid = true;
        if (inputs?.email?.length == 0) {
          handleError('Please input email', 'email');
          isValid = !isValid;
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
        <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
                <View style={{ padding: 20 }}>
                <Pressable onPress={ForgotPasswordScreen}>
                    {/* <SvgIcon icon={'back'} width={30} height={30} /> */}
                </Pressable>
            </View>
            <View style={{ position: 'relative', bottom: 20 }}>
                <View style={styles.loginIcon}>
                    {/* <SvgIcon icon={'enterOtp'} width={280} height={280} /> */}
                    <Image source={ForgotPasswordImg} style={{ width: responsiveWidth(70), height: responsiveWidth(70) }} resizeMode="contain" />
                </View>
                <View style={styles.container}>
                    <View style={styles.loginLblCon}>
                        <Text style={styles.loginLbl}>Enter your Email?</Text>
                    </View>
                    <View style={styles.forgotDes}>
                        <Text style={styles.forgotDesLbl}>
                            Enter your Email
                        </Text>
                        <Text style={styles.forgotDesLbl}></Text>
                    </View>
                  
                        <Input
                            onChangeText={text => handleOnchange(text, 'email')}
                            onFocus={() => handleError(null, 'email')}
                            label="Email"
                            placeholder="Enter your email address"
                            placeholderTextColor="gray"
                            error={errors.email}
                        />

                        <View style={{ bottom: 10, }}>
                            <Button title="Submit" onPress={handleLogin} disabled={isLoading}  />
                        </View>
                        {/* <View style={[styles.loginCon, { marginTop: 30 }]}>
                            <Pressable
                                style={styles.LoginBtn}
                                onPress={NewPassword}>
                                <Text style={styles.loginBtnLbl}>Submit</Text>
                            </Pressable>
                        </View> */}
                    </View>
                </View>
          
        </KeyboardAvoidingView>

    )
}
export default NewPassword

const styles = StyleSheet.create({
    mainCon: {
        backgroundColor: '#fff',
        flex: 1,
    },
    loginIcon: {
        alignSelf: 'center',
    },
    // textInput: {
    //     borderBottomColor: '#aaa',
    //     borderWidth: 1,
    //     borderTopWidth: 0,
    //     borderLeftWidth: 0,
    //     borderRightWidth: 0,
    //     color: '#000',
    //     fontSize: 16,
    //     height: 40,
    // },
    formCon: {
        alignItems: 'flex-start',
        width: responsiveWidth(10),
        
    },
    container: {
        paddingHorizontal: responsiveHeight(2),
        marginTop: 40,
    },
    loginLblCon: {
        position: 'relative',
        bottom: responsiveHeight(1),
    },
    loginLbl: {
        color: '#000',
        fontSize: responsiveFontSize(3),

    },
    forgotDes: {
        position: 'relative',
        bottom: 0,
    },
    forgotDesLbl: {
        color: '#000',
        fontSize: responsiveFontSize(2),
        // fontFamily: Fonts.type.NotoSansRegular,
    },
    registerLbl: { color: '#0057ff' },
    LoginBtn: {
        backgroundColor: '#0057ff',
        // backgroundColor:  '#5D5FEE',
        borderRadius: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    loginBtnLbl: {
        textAlign: 'center',
        fontSize: 16,
        //   fontFamily: Fonts.type.NotoSansBlack,
        color: '#fff',
        paddingVertical: 10,
    },
});