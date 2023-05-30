import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState,useEffect } from 'react';
import { View, Text, SafeAreaView, DatePickerAndroid, Platform, Pressable, Keyboard, ScrollView, Alert, StyleSheet, StatusBar, TextInput, Image, Dimensions, TouchableOpacity, PermissionsAndroid } from 'react-native';
import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import { getData } from '../../Hooks/ApiHelper';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import axios from 'axios';
import { useToast } from 'react-native-fast-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Update_Appointment_Data_By_Steno,Post_Appointment_Data_Steno,getSingleStenoAppointment } from '../../Constants/UrlConstants';
import DataContext from '../../LoginCredencial/context/DataContextApi';
import PushNotification from "react-native-push-notification";
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTime from '../components/DateTime';


const EditBookAppointmentSteno = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [laoder, setlaoder] = useState(false)
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  }
  const toggleTimepicker = () => {
    setShowTimePicker(!showTimePicker);
  }

  // const onchange2 = ({ type }, selectedDate) => {
  //   if (type == "set") {
  //     const currentDate = selectedDate;
  //     setDate(currentDate);
  //     if (Platform.OS === "android") {
  //       toggleDatepicker();
  //       setAppointmentDate(currentDate.toDateString('en-GB'));
  //     }
  //   } else {
  //     toggleDatepicker();
  //   }
  // }


  const onchange2 = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setShowPicker(false);
      setDate(currentDate);
      const formattedDate = currentDate.toDateString('en-GB');
      setAppointmentDate(formattedDate);
      setInputs(prevState => ({
        ...prevState,
        appointmentDate: formattedDate, // Update the state variable
      }));
    } else {
      setShowPicker(false);
    }
  };



  // const onTimeChange = (event, selectedTime) => {
  //   const currentTime = selectedTime || time;
  //   setTime(currentTime);
  //   if (Platform.OS === "android") {
  //     toggleTimepicker();
  //     setAppointmentTime(currentTime.toLocaleTimeString());
  //   }
  // };

  const onTimeChange = (event, selectedTime) => {
    if (event.type === "set") {
      setShowTimePicker(false);
      setTime(selectedTime);
      const formattedTime = selectedTime.toLocaleTimeString('en-US');
      setAppointmentTime(formattedTime);
      setInputs(prevState => ({
        ...prevState,
        appointmentTime: formattedTime, // Update the state variable
      }));
    } else {
      setShowTimePicker(false);
    }
  };





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
    city:'',
    appointmentDate: '',
    appointmentTime: '',
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


    // Validate Appointment Date
    if (!appointmentDate > 0) {
      handleError('Please select Appointment Date', 'appointmentDate');
      isValid = false;
    }

    // Validate Appointment Time
    if (!appointmentTime) {
      handleError('Please select Appointment Time', 'appointmentTime');
      isValid = false;
    }




    return isValid;

  };


  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    setlaoder(true)
    const { id } = route.params;
    console.log(route.params)
 axios.get(`https://srninfotech.com/projects/dmdesk_steno/getSingleStenoAppointment/${id}`)
 ,then (response =>{
    const data = response.data.result;
    console.log("check url data",data)
 })



    // const temp = await getData(`${getSingleStenoAppointment}+${id}`)
    // const { data } = temp;
    // console.log(temp)
    if (data.length > 0) {

      const { user_name, depat, purpose, noofpeople, phone, img,city,appointmentDate,appointmentTime } = data[0];
      setInputs({
        user_name,
        depat,
        purpose,
        noofpeople,
        phone,
        img,
        city,
        appointmentDate,
        appointmentTime,
      });
    }
    setlaoder(false)
  }











  // ----------------------------------------Validation section end ------------------------------------------

//   const navigation = useNavigation()

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
      formData.append("id", route.params.id);
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
      formData.append('appointmentDate', (inputs.appointmentDate));
      formData.append('appointmentTime', (inputs.appointmentTime));

    //   axios.post(Post_Appointment_Data_Steno, formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }).then(async (response) => {
    //     if (response) {
    //       console.log(response)
    //       toast.show("Appointment updated", { type: "success", position: 'top' });
    //       await setcount(count + 1)
    //       await navigation.navigate('HomeScreenSteno');
    //     }
    //   })
    let apiEndpoint;
    if (userType === "pa") {
      apiEndpoint = Update_Appointment_Data;
    } else if (userType === "stn") {
      apiEndpoint = Update_Appointment_Data_By_Steno;
    }

    await axios
      .post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response) {
          toast.show("Appointment updated", { type: "success", position: "top" });
          if (userType === "pa") {
            navigation.navigate("HomeScreenPa");
          } else if (userType === "stn") {
            navigation.navigate("HomeScreenSteno");
          }
        }
      })



      
      .catch((error) => {
        console.log(error);
      });
    } else {
      toast.show("Fill all inputs first", { type: "danger" });
    }
  };


  const formatDateForAPI = (dateString) => {
    // Assuming the current format is "dd/mm/yyyy"
    const parts = dateString.split('/');
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    return formattedDate;
  };
  
  const formatTimeForAPI = (timeString) => {
    // Assuming the current format is "hh:mm AM/PM"
    const parts = timeString.split(' ');
    const time = parts[0];
    const amPm = parts[1];
    const [hours, minutes] = time.split(':');
    const formattedTime = `${hours}:${minutes} ${amPm}`;
    return formattedTime;
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

<Loader visible={laoder} />
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
            placeholder="कृपया पूरा नाम दर्ज करे dsdsadasd "
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



          {showPicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={date}
              onChange={onchange2}
            />
          )}


          {!showPicker && (<Pressable
            onPress={toggleDatepicker}
          >
            <Input
              label="अपॉइंटमेंट दिनांक"
              placeholder="दिनांक सेलेक्ट करे "
              value={appointmentDate}
              onChangeText={setAppointmentDate}
              placeholderTextColor="gray"
              editable={false}
           

            />
          </Pressable>)}



          {showTimePicker && (
            <DateTimePicker
              mode='time' // Set mode to 'time' for time picker
              display='spinner'
              value={time}
              onChange={onTimeChange}
            />
          )}

          {!showTimePicker && (
            <Pressable onPress={toggleTimepicker}>
              <Input
                label="अपॉइंटमेंट समय"
                placeholder="समय सेलेक्ट करे"
                value={appointmentTime}
                onChangeText={setAppointmentTime}
                placeholderTextColor="gray"
                editable={false}
              />
            </Pressable>
          )}


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

export default EditBookAppointmentSteno;


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