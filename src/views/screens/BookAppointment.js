import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, SafeAreaView, Keyboard, ScrollView, Alert, StyleSheet, StatusBar, TextInput, Image, Dimensions, TouchableOpacity, PermissionsAndroid } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import axios from 'axios';
import { useToast } from 'react-native-fast-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Post_Appointment_Data } from '../../Constants/UrlConstants';
import DataContext from '../../LoginCredencial/context/DataContextApi';
import PushNotification from "react-native-push-notification";


const BookAppointment = () => {

  const { setcount, count } = useContext(DataContext)
  const [image, setImage] = useState(null);
  const toast = useToast()
  const [inputs, setInputs] = useState({
    user_name: '',
    depat: '',
    purpose: '',
    noofpeople: '',
    phone: '',
    img: '',
  });
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);


  const handleeNotofication = () => {
    PushNotification.cancelAllLocalNotifications()
    PushNotification.localNotification({
      channelId: 'test',
      tittle: 'appointment Booked',
      message: 'New Appointment Booked'
    })
    // PushNotification.localNotificationSchedule({
    //   channelId: 'test',
    //   tittle: ' Alarm ',
    //   message: 'You have booked appointment 20 sec ago',
    //   date:new Date(Date.now()+20*1000),
    //   allowWhileIdle:true,
    // })
  }
  // ----------------------------------------Validation section start------------------------------------------


  function valdiate() {
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs?.user_name?.length > 0) {
      handleError('Please input username', 'user_name');
      isValid = false;
    }

    if (!inputs?.depat?.length > 0) {
      handleError('Please input Department', 'depat');
      isValid = false;
    }

    if (!inputs?.phone?.length > 0) {
      handleError('Please input phone number', 'phone');
      isValid = false;
    } else if (inputs?.phone?.length !== 10) {
      handleError('Mobile Number must be 10 digit', 'phone');
      isValid = false;
    }
    if (!inputs?.purpose?.length > 0) {
      handleError('Please input Purpose', 'purpose');
      isValid = false;
    }
    if (!inputs?.noofpeople?.length > 0) {
      handleError('Please input No. Of Peoples', 'noofpeople');
      isValid = false;
    } else if (inputs?.noofpeople?.length > 2) {
      handleError('No. Of People Length Should be Maximum 2 digit', 'noofpeople')
      isValid = false;
    }
    return isValid;

  };


  // ----------------------------------------Validation section end ------------------------------------------

  const navigation = useNavigation()

  async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'Camera Permission',
          'message': 'App needs access to your camera'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission granted");
        launchCamera({
          title: 'Select Image',
          mediaType: 'photo',
          noData: true,
          quality: 0.3,
          allowsEditing: true,
        }, (response) => {
          // console.log(JSON.stringify(response.assets[0].uri))
          if (response?.didCancel) {
          } else if (response?.error) {
          } else {
            setImage(response?.assets[0]);
          }
        });
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const pickImage = () => {
    requestCameraPermission()
  };

  const uploadImage = async () => {
    // handleeNotofication();
    if (!buttonDisabled && valdiate()) {
      setButtonDisabled(true);
      const formData = new FormData();
      const cityName = await AsyncStorage.getItem("city")
      formData.append('img', image == null ? "" : {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
      });
      formData.append('user_name', inputs.user_name);
      formData.append('depat', inputs.depat);
      formData.append('phone', inputs.phone);
      formData.append('purpose', inputs.purpose);
      formData.append('noofpeople', inputs.noofpeople);
      formData.append('city', cityName);

      axios.post(Post_Appointment_Data, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(async (response) => {
        if (response) {
          console.log(response)
          toast.show("Appointment Booked", { type: "success", position: 'top' });
          await setcount(count + 1)
          await navigation.navigate('HomeScreenPa');
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      toast.show("Fill all inputs first", { type: "danger" });
    }

  };

  // --------------------------------------------------------------
  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 50, paddingHorizontal: 20 }}>

        <Text style={{ color: COLORS.black, fontSize: responsiveFontSize(3.2), fontWeight: 'bold' }}>
          अपॉइंटमेंट
        </Text>
        <Text style={{ color: COLORS.grey, fontSize: responsiveFontSize(2.2), marginVertical: responsiveHeight(2) }}>
          कृपया  अपनी जानकारी दर्ज करे
        </Text>


        {/* ---------------------------------------------------Input Field start-------------------------- */}

        <View style={{ marginVertical: responsiveHeight(2) }}>
          <Input
            onChangeText={text => handleOnchange(text, 'user_name')}
            onFocus={() => handleError(null, 'user_name')}

            label="पूरा नाम"
            placeholder="कृपया पूरा नाम दर्ज करे "
            placeholderTextColor="gray"
            error={errors.user_name}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'depat')}
            onFocus={() => handleError(null, 'depat')}
            // iconName="depat-outline"
            label="विभाग/पता"
            placeholder="विभाग/पता दर्ज करे"
            placeholderTextColor="gray"
            error={errors.depat}
          />

          <Input
            keyboardType="numeric"
            maxLength={10}
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            label="मोबाइल नंबर"
            placeholder="मोबाइल नंबर दर्ज करे"
            placeholderTextColor="gray"
            error={errors.phone}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'purpose')}
            onFocus={() => handleError(null, 'purpose')}
            label="उद्देश्य(काम)"
            placeholder="उद्देश्य(काम) दर्ज करे"
            placeholderTextColor="gray"
            error={errors.purpose}
          />

          <Input
            maxLength={2}
            keyboardType="numeric"
            onChangeText={text => handleOnchange(text, 'noofpeople')}
            onFocus={() => handleError(null, 'noofpeople')}
            label="व्यक्तियों की संख्या "
            placeholder="व्यक्तियों की संख्या "
            placeholderTextColor="gray"
            error={errors.noofpeople}
          />


          {/* ----------------------------------------------------------------- */}

          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.buttonText}>फोटो सेलेक्ट करे</Text>
          </TouchableOpacity>
          <View style={styles.container}>
          </View>

          {/* ------------------------------------------------------ */}


          <Button onPress={uploadImage} title="Submit" disabled={buttonDisabled} />
        </View>

        {/* ---------------------------------------Input Field End-------------------------- */}

      </ScrollView>
    </SafeAreaView>
  );
};

export default BookAppointment;


const styles = StyleSheet.create({


  body: {
    backgroundColor: 'red',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  },
  // ---------------------------------------


  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#F3F4FB',
    // paddingHorizontal: 50,
    paddingLeft: 30,
    display: 'flex',
    justifyContent: 'center',

    marginTop: 10,
    height: responsiveHeight(8)
  },
  buttonText: {
    fontSize: 14,
    color: '#BABBC3',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
});