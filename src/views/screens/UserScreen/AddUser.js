import React from 'react';
import { useToast } from 'react-native-fast-toast';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import COLORS from '../../../conts/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SelectDropdown from 'react-native-select-dropdown';
import Loader from '../../components/Loader';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { postData } from '../../../Hooks/ApiHelper';
import { Insert_Data } from '../../../Constants/UrlConstants';

const LoginScreen = ({ navigation }) => {
  const toast = useToast();
  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    phone: '',
    pass: '',
    city: '',
    user_type: '',
  });
  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const values = ['dm', 'pa'];


  function validate() {
    Keyboard.dismiss();
    let isValid = true;
    const isUserName = inputs?.name?.length > 0;
    if (!isUserName) {
      handleError('Please input name', 'name');
      isValid = false;
    }
    // const isEmailValid = inputs?.email?.length > 0;
    // if (!isEmailValid) {
    //   handleError('Please input email', 'email');
    //   isValid = false;
    // }
    const isEmailValid = inputs?.email?.length > 0;
    if (!isEmailValid) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    const isPasswordValid = inputs?.pass?.length >= 6;
    if (!isPasswordValid) {
      handleError('Password must be at least 6 characters long', 'pass');
      isValid = false;
    }

    const isCityValid = inputs?.city?.length > 0;
    if (!isCityValid) {
      handleError('Please Enter city', 'city');
      isValid = false;
    }

    const isUserValid = inputs?.user_type?.length > 0;
    if (!isUserValid) {
      handleError('Please Enter UserType', 'user_type');
      isValid = false;
    }
    return isValid;
  }

  const AddUserInfo = async () => {

    validate()
    if (validate()) {
      let payload = {
        name: inputs.name,
        email: inputs.email,
        pass: inputs.pass,
        city: inputs.city,
        user_type: inputs.user_type,
      };
      const result = await postData(Insert_Data, payload);
      console.log(result)
      if (result.result == true) {
        toast.show('User Added successfully', {
          type: 'success',
          position: 'top',
        });

        navigation.navigate('HomeScreenAdmin');
      }
    } else {
      toast.show('Fill all inputs first', { type: 'danger' });
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };

  const handleOnchangeValue = (itemValue, input) => {
    setInputs(prevState => ({ ...prevState, [input]: itemValue }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView>
        <Loader visible={loading} />
        <View
          style={{
            paddingHorizontal: responsiveWidth(5),
            paddingTop: responsiveHeight(4),
          }}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                color: COLORS.black,
                fontSize: responsiveFontSize(4),
                fontWeight: 'bold',
              }}>
              Add User
            </Text>
            <Text
              style={{
                color: COLORS.grey,
                fontSize: responsiveFontSize(2.5),
                marginVertical: 10,
              }}>
              Enter User Details
            </Text>
          </View>
          <View style={{ marginVertical: responsiveHeight(3) }}>
            <Input
              onChangeText={text => handleOnchange(text, 'name')}
              onFocus={() => handleError(null, 'name')}
              iconName="face-man-profile"
              label="Full Name"
              placeholder="Enter your name"
              placeholderTextColor="gray"
              error={errors.name}
            />
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
              onChangeText={text => handleOnchange(text, 'pass')}
              onFocus={() => handleError(null, 'pass')}
              iconName="lock-outline"
              label="Password"
              placeholder="Enter your password"
              placeholderTextColor="gray"
              error={errors.pass}
              password
            />
            <Input
              onChangeText={text => handleOnchange(text, 'city')}
              onFocus={() => handleError(null, 'city')}
              iconName="city"
              label="City"
              placeholder="Enter your city"
              placeholderTextColor="gray"
              error={errors.city}
            />
            <View
              style={
                errors.user_type?.length > 0 && {
                  flex: 1,
                  // justifyContent: 'center',
                  alignSelf: 'stretch',
                  borderWidth: 1,
                  borderColor: 'red',
                }
              }>
              <SelectDropdown
                buttonStyle={{
                  color: '#BABBC3',
                  width: '100%',
                  backgroundColor: '#F3F4FB',
                }}
                dropdownTextHighlightStyle={styles.dropdownTextHighlightStyle}
                data={values}
                onSelect={(selectedItem, index) => {
                  handleOnchange(selectedItem, 'user_type');
                }}
                onFocus={() => handleError(null, 'user_type')}
                defaultButtonText="Select User"
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
            {errors.user_type?.length > 0 && (
              <Text
                style={{
                  marginTop: 7,
                  color: COLORS.red,
                  fontSize: responsiveFontSize(1.7),
                }}>
                {errors.user_type}
              </Text>
            )}
            <Button title="Add User" onPress={AddUserInfo} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logo: {
    width: '20%',
  },
  dropdownTextHighlightStyle: {
    fontSize: responsiveFontSize(2),
    color: '#000',
  },
});
