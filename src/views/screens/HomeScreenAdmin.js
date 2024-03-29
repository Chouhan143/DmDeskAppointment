import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
// import { RefreshControl } from 'react-native';
import { ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import userAdd from '../../../android/app/src/main/assets/images/plus.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import Menu from '../components/Menu';
import BookAppointment from './BookAppointment'
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { getData } from '../../Hooks/ApiHelper';
import { Get_Appointment_Data } from '../../Constants/UrlConstants';
import { AuthContext } from '../../LoginCredencial/context/AuthContext';
import { ActivityIndicator } from 'react-native';
import DataContext from '../../LoginCredencial/context/DataContextApi'

const { height } = Dimensions.get('window');
const HomeScreenAdmin = ({ navigation }) => {
  const { data, count, getDataFunc } = useContext(DataContext)
  const { logout } = useContext(AuthContext)
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loaderInfo, setloaderInfo] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [myData, setMyData] = useState([]);

  const AddUser = () => {
    navigation.navigate('userInfo');
  };

  //  const handleLogout  = () => {
  //       logout();
  //       navigation.replace('login');

  //   };
 

    const handleLogout = () => {

      AsyncStorage.clear()
      navigation.replace('login');

    };

    const PendingHendle = () => {
      navigation.navigate('pending');
    };
    const CompletegHendle = () => {
      navigation.navigate('complete');
    };
    const CancelgHendle = () => {
      navigation.navigate('cancel');
    };
    // useEffect(() => {
    //   setloaderInfo(true);
    //   AddUserInfo();
    //   setloaderInfo(false);
    // }, []);

    //   const onRefresh = () => {
    //     setloaderInfo(true)
    //     setRefreshing (true);
    //     AddUserInfo();
    //     getDataFunc();
    //     setloaderInfo(false)
    //     setTimeout(() => setRefreshing(false), 1000);
    //   };

    //   useEffect(() => {
    //     setloaderInfo(true)
    //     AddUserInfo();
    //     getDataFunc();
    //     setloaderInfo(false)
    //   }, [count]);

    //   useEffect(() => {
    //     const unsubscribe = navigation.addListener('beforeRemove', () => {
    //         AddUserInfo();
    //     });

    //     return unsubscribe;
    // }, []);

    useEffect(() => {
      AddUserInfo();
      getDataFunc();
    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
        AddUserInfo();
        getDataFunc();
      }, 3000);
      return () => clearInterval(interval);
    });




    const AddUserInfo = () => {
      const completedData = data.filter(
        appointment => appointment.status == 'complete',
      );
      // console.log(completedData)
      const pendingData = data.filter(
        appointment => appointment.status == 'pending',
      );
      // console.log(pendingData)
      const rejectData = data.filter(
        appointment => appointment.status == 'reject',
      );
      setPending(pendingData.length);
      setCompleted(completedData.length);
      setRejected(rejectData.length);
      // setMyData(completedData);
    };


    return (
      <>
        <ScrollView
          scrollEnabled={false}
          nestedScrollEnabled={false}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >
          <View style={styles.header}>
            <Icon
              name="user"
              color="#3e2465"
              size={responsiveFontSize(4)}
              onPress={navigation.toggleDrawer}
            />
            <Text
              style={{
                color: '#306060',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.2),
              }}>
              Admin
            </Text>
            <Icon name="logout" color="#3e2465" size={responsiveFontSize(4)} onPress={handleLogout} />
          </View>

          <View style={styles.container}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 5,
              }}>
              <Text
                style={{
                  alignItems: 'center',
                  fontSize: responsiveFontSize(2.6),
                  fontWeight: 'bold',
                  color: '#306060',
                }}>
                DM Desk
              </Text>
              <Text
                style={{
                  color: '#306060',
                  fontWeight: 'bold',
                  fontSize: responsiveFontSize(2.5),
                }}>
                अपॉइंटमेंट स्टेटस
              </Text>
              {/* </View> */}
            </View>
            <View style={{ marginTop: responsiveHeight(6) }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  onPress={PendingHendle}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F99417',
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(10),
                    borderRadius: responsiveWidth(10),
                  }}>
                  <View style={styles.content_iconWraper}>
                    <View style={styles.innerView}>
                      <Icon2
                        name="progress-clock"
                        color="white"
                        size={responsiveFontSize(3)}
                        onPress={navigation.toggleDrawer}
                      />
                    </View>

                    <View style={styles.textWrapDiv}>
                      {loaderInfo ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.text}>{pending}</Text>
                      )}
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.1),
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>
                        लंबित{' '}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/*  */}
                <TouchableOpacity
                  onPress={CompletegHendle}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#54B435',
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(10),
                    borderRadius: responsiveWidth(10),
                  }}>
                  <View style={styles.content_iconWraper}>
                    <View style={styles.innerView}>
                      <Icon3
                        name="checkmark-done"
                        color="white"
                        size={responsiveFontSize(3)}
                        onPress={navigation.toggleDrawer}
                      />
                    </View>

                    <View style={styles.textWrapDiv}>
                      {loaderInfo ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.text}>{completed}</Text>
                      )}
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.1),
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>

                        पूर्ण
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/*  */}
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: responsiveHeight(4),
                }}>
                <TouchableOpacity
                  onPress={CancelgHendle}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#DC0000',
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(10),
                    borderRadius: responsiveWidth(10),
                  }}>
                  <View style={styles.content_iconWraper}>
                    <View style={styles.innerView}>
                      <Icon2
                        name="cancel"
                        color="white"
                        size={responsiveFontSize(3)}
                        onPress={navigation.toggleDrawer}
                      />
                    </View>

                    <View style={styles.textWrapDiv}>
                      {loaderInfo ? (
                        <ActivityIndicator size="small" color="white" />
                      ) : (
                        <Text style={styles.text}>{rejected}</Text>
                      )}
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.1),
                          color: '#fff',
                          fontWeight: 'bold',
                        }}>

                        अस्वीकृत
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/*  */}

                <TouchableOpacity
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(10),
                    borderRadius: responsiveWidth(10),
                  }}
                  onPress={AddUser}>
                  <Image source={userAdd} style={styles.userAddImg} />
                  <View>
                    <Text
                      style={{
                        color: '#306060',
                        paddingTop: responsiveHeight(3),
                        fontWeight: 'bold',
                        fontSize: responsiveFontSize(2),
                      }}>

                      Add User
                    </Text>
                  </View>
                </TouchableOpacity>
                {/*  */}
              </View>

            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: responsiveHeight(3.5) }}>
              <View style={styles.menuStyle}>
                <Menu />
              </View>
            </View>

          </View>


        </ScrollView>
      </>
    );
  };

  export default HomeScreenAdmin;

  const styles = StyleSheet.create({
    header: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      // backgroundColor: '#528B8B',
    },
    container: {

      backgroundColor: '#C0D9D9',
      borderTopLeftRadius: responsiveWidth(15),
      borderTopRightRadius: responsiveWidth(15),
      marginTop: responsiveHeight(3),
      paddingVertical: responsiveHeight(5),
      height: responsiveHeight(100),
    },
    userBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginHorizontal: 10,
      marginVertical: 10,
      gap: 20,
    },

    text: {
      color: '#ffff',
      fontSize: responsiveFontSize(2.5),
      fontWeight: 'bold',
      alignItems: 'center',
      paddingVertical: responsiveHeight(1)
    },
    content_iconWraper: {
      height: responsiveHeight(20),
      width: responsiveWidth(17),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    textWrapDiv: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: responsiveHeight(1),
    },
    innerView: {
      width: responsiveWidth(10),
      height: responsiveWidth(10),
      borderColor: '#fff',
      // borderStyle:'dashed',
      borderWidth: 1,
      borderRadius: responsiveFontSize(1),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userImg: {
      width: 50,
      height: 50,
    },
    userLogoutImg: {
      width: 30,
      height: 30,
    },
    userAddImg: {
      width: responsiveWidth(15),
      height: responsiveWidth(15),
    },

    userGreeting: {
      color: 'black',
      fontSize: 10,
    },
    userName: {
      paddingTop: 5,
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
    },
    userLogout: {
      color: 'black',
      fontSize: 15,
      fontWeight: 'bold',
    },
    cardContainer: {
      marginVertical: 20,
    },
    card: {
      backgroundColor: '#BABBC3',
      width: '90%',
      padding: 15,
      marginHorizontal: 15,
      borderRadius: 10,
      marginVertical: 10,
    },
    menuStyle: {
      Bottom: responsiveHeight(0),
      borderColor: '#306060',
      backgroundColor: '#80B4B4',
      width: responsiveWidth(80),
      // height: responsiveHeight(9),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: responsiveWidth(15),
      borderBottomRightRadius: responsiveWidth(15),
      borderTopLeftRadius: responsiveWidth(15),
      borderTopRightRadius: responsiveWidth(15),
    }
  });
