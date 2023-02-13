import React from 'react';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useToast} from 'react-native-fast-toast';
import {Picker} from '@react-native-picker/picker';
import {SelectList} from 'react-native-dropdown-select-list';

import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  Alert,
  Image,
  StyleSheet,
} from 'react-native';
import COLORS from '../../../conts/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SelectDropdown from 'react-native-select-dropdown';
import auth from '@react-native-firebase/auth';
import Loader from '../../components/Loader';
import {ScrollView} from 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {postData} from '../../../Hooks/ApiHelper';

const LoginScreen = ({navigation}) => {
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
  // -----------------------
  const [selected, setSelected] = React.useState('');
  const [selectedValue, setSelectedValue] = useState('item1');

  // const [selecte, setSelecte] = useState(data[0].value);
  // const data = [
  //   { key: '1', value: 'DM' },
  //   { key: '2', value: 'PA' },

  // ]
  // ---------------------------------------------
  function validate() {
    Keyboard.dismiss();
    let isValid = true;
    if (inputs?.name.length == 0) {
      handleError('Please input name', 'name');
      isValid = !isValid;
    }

    if (inputs?.email.length == 0) {
      handleError('Please input email', 'email');
      isValid = !isValid;
    } else if (inputs?.email.length == 0) {
      handleError('Please input a valid email', 'email');
      isValid = !isValid;
    }

    if (inputs?.pass.length == 0) {
      handleError('Please input pass', 'pass');
      isValid = !isValid;
    } else if (inputs.pass.length < 5) {
      handleError('Min pass length of 5', 'pass');
      isValid = !isValid;
    }

    if (inputs?.city.length == 0) {
      handleError('Please Enter city', 'city');
      isValid = !isValid;
    }

    if (inputs?.user_type.length == 0) {
      handleError('Please Enter UserType', 'user_type');
      isValid = !isValid;
    }
    if (isValid) {
      return true;
      // login();
    } else {
      return false;
    }
  }

  const AddUserInfo = async () => {
    let payload = {
      name: inputs.name,
      email: inputs.email,
      pass: inputs.pass,
      city: inputs.city,
      user_type: inputs.user_type,
    };
    validate();
    console.log(validate())
    if (validate()) {
     
      const result = await postData(
        'https://srninfotech.com/projects/dmdesk/insertData',
        payload,
      );
      if (result.result == true) {
        toast.show('User Added successfully', {
          type: 'success',
          position: 'top',
        });0
        navigation.navigate('HomeScreenAdmin');
      }
    } else {
      toast.show('Fill all inputs first', {type: 'danger'});
    }
  };

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };

  const handleOnchangeValue = (itemValue, input) => {
    setInputs(prevState => ({...prevState, [input]: itemValue}));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      {console.log(errors)}
      <ScrollView>
        <Loader visible={loading} />
        <View style={{paddingHorizontal: 20, paddingTop: 60}}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column-reverse',
              alignItems: 'center',
            }}>
            <Text
              style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
              Add User
            </Text>
          </View>
          <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
            Enter User Details
          </Text>
          <View style={{marginVertical: 20}}>
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
              label="city"
              placeholder="Enter your city"
              placeholderTextColor="gray"
              error={errors.city}
            />
            {/* <SelectList
              //  handleOnchange={handleChange}
              onChangeText={text => handleOnchangeValue(text, 'user_type')}
              onFocus={() => handleError(null, 'user_type')}
              setSelected={setSelected}
              data={data}
              
              placeholder="Select User Type"
              placeholderTextColor={{ color: '#BABBC3' }}
              dropdownStyles={{ color: '#BABBC3', backgroundColor: '#F3F4FB', borderRadius: 0, borderColor: '#F3F4FB', borderBottomColor: '#7978B5' }}
              dropdownItemStyles={{ color: 'black', borderBottomColor: 'red' }}
              dropdownTextStyles={{ color: '#7978B5', }}
              inputStyles={{ color: '#7978B5' }}
              boxStyles={{ borderRadius: 0, backgroundColor: '#F3F4FB', borderColor: '#F3F4FB', height: 55, marginTop: 15, alignItems: 'center' }}
            /> */}
            <View
              style={
                errors.user_type?.length > 0 && {
                  flex: 1,
                  justifyContent: 'center',
                  alignSelf: 'stretch',
                  borderWidth: 1,
                  borderColor: 'red',
                }
              }>
              {/* <Picker
                style={{
                  color: '#BABBC3',
                  backgroundColor: '#F3F4FB',
                }}
                prompt="Select user type"
                onFocus={() => handleError(null, 'user_type')}
                selectedValue={inputs.user_type}
                onValueChange={(itemValue, itemIndex) => 
                  handleOnchange(itemValue, 'user_type')
                }>
                <Picker.Item enabled={true} label="pa" value="pa" />
                <Picker.Item color="#fff" label="dm" value="dm" />
              </Picker> */}
              <SelectDropdown
               buttonStyle={{
                color: '#BABBC3',
                width: '100%',
                backgroundColor: '#F3F4FB',
              }}
                data={values}
                onSelect={(selectedItem, index) => {
                  handleOnchange(selectedItem, 'user_type')
                }}
                onFocus={() => handleError(null, 'user_type')}
                defaultButtonText="Select User"
         
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
              />
            </View>
            {errors.user_type?.length > 0 && (
              <Text style={{marginTop: 7, color: COLORS.red, fontSize: 12}}>
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
});
