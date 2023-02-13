import React, { Component } from 'react';
import {
    Text,
    View,
    Pressable,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';

import SvgIcon from '../../../../Asets/SvgIcon';
// import OTPInputView from '@twotalltotems/react-native-otp-input';

const NewPassword = ({ navigation }) => {
    const ForgotPasswordScreen = () => {
        navigation.replace('Forgotpassword');
    };


    const handleLogin = () => {
        let payload = {
            email: email,
            pass: password
        }
        axios
            .post('https://srninfotech.com/projects/dmdesk/login', payload)
            .then((response) => {
                if (response.data.email == "true") {
                    navigation.navigate('');
                } else if (response.data.email == "false") {
                    navigation.navigate('Forgotpassword');
                }

                // handle successful login
            })
            .catch((error) => {
                console.error("something went wong", error.message);
                // setError(error.message);
            });
    }


    return (
        <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
            <View style={{ padding: 20 }}>
                <Pressable onPress={ForgotPasswordScreen}>
                    <SvgIcon icon={'back'} width={30} height={30} />
                </Pressable>
            </View>
            <View style={{ position: 'relative', bottom: 30 }}>
                <View style={styles.loginIcon}>
                    <SvgIcon icon={'enterOtp'} width={280} height={280} />
                </View>
                <View style={styles.container}>
                    <View style={styles.loginLblCon}>
                        <Text style={styles.loginLbl}>Enter NewPassword?</Text>
                    </View>
                    <View style={styles.forgotDes}>
                        <Text style={styles.forgotDesLbl}>
                            Enter your New Password 
                        </Text>
                        <Text style={styles.forgotDesLbl}></Text>
                    </View>
                    <View style={styles.formCon}>
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Enter New Password'}
                            placeholderTextColor={'#aaa'}
                        />
                        <TextInput
                            style={styles.textInput}
                            placeholder={'Enter Confirm Password'}
                            placeholderTextColor={'#aaa'}
                        />
                        <View style={[styles.loginCon, { marginTop: 30 }]}>
                            <Pressable
                                style={styles.LoginBtn}
                                onPress={NewPassword}>
                                <Text style={styles.loginBtnLbl}>Submit</Text>
                            </Pressable>
                        </View>
                    </View>
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
    textInput: {
        borderBottomColor: '#aaa',
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        color: '#000',
        fontSize: 16,
        height: 40,
    },
    formCon: {
        alignItems: 'center',
        width: '90%'
    },
    container: {
        paddingHorizontal: 20,
        marginTop: 50,
    },
    loginLblCon: {
        position: 'relative',
        bottom: 40,
    },
    loginLbl: {
        color: '#000',
        fontSize: 24,

    },
    forgotDes: {
        position: 'relative',
        bottom: 35,
    },
    forgotDesLbl: {
        color: '#000',
        // fontFamily: Fonts.type.NotoSansRegular,
    },
    registerLbl: { color: '#0057ff' },
    LoginBtn: {
        backgroundColor: '#0057ff',
        // backgroundColor:  '#5D5FEE',
        borderRadius: 20,
         width:'100%',
        paddingHorizontal:60,
    },
    loginBtnLbl: {
        textAlign: 'center',
        fontSize: 16,
        //   fontFamily: Fonts.type.NotoSansBlack,
        color: '#fff',
        paddingVertical: 10,
    },
});