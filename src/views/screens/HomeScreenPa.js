import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { ActivityIndicator } from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/AntDesign';
import Menu from '../components/Menu';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
// import userAdd from '../../../src/assets/images/plus.png';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import DataContext from '../../LoginCredencial/context/DataContextApi';
import { AuthContext } from '../../LoginCredencial/context/AuthContext';
const { height } = Dimensions.get('window');

const HomeScreenPa = ({ navigation }) => {
  const { data, count, getDataFunc } = useContext(DataContext)
  const {logout} =useContext(AuthContext)
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [myData, setMyData] = useState([]);
  // const [loader, setloader] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);
  // const [loaderInfo, setloaderInfo] = useState(false);

  const OpenAppointment = () => {
    navigation.navigate('Appointment');
  };
   const handleLogout  = () => {
        logout();
        navigation.replace('login');

    };

  const PendingHendle = () => {
    navigation.navigate('pending');
  };
 

  // const onRefresh = () => {
  //   setloaderInfo(true)
  //   setRefreshing (true);
  //   AddUserInfo();
  //   getDataFunc();
  //   setloaderInfo(false)
  //   setTimeout(() => setRefreshing(false), 1000);
  // };

  // useEffect(() => {
  //   setloaderInfo(true)
  //   AddUserInfo();
  //   getDataFunc();
  //   setloaderInfo(false)
  // }, [count]);


  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', () => {
  //     AddUserInfo();
  //   });

  //   return unsubscribe;
  // }, []);

  // ------------------------------working
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
  // ------------------------------working

  const AddUserInfo = () => {

    const completedData = data.filter(
      appointment => appointment.status == 'complete',
    );

    const pendingData = data.filter(
      appointment => appointment.status == 'pending',
    );
    // const currentDate = new Date().toISOString().slice(0, 10);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).split('/').join('-');
  



    const filteredData = pendingData.filter(appointment => appointment.status === 'pending' && appointment.date === formattedDate);

    const rejectData = data.filter(
      appointment => appointment.status == 'reject',
    );
    setPending(filteredData.length);
    setCompleted(completedData.length);
    setRejected(rejectData.length);
    setMyData(completedData);
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
          <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>
            Personal Assistent
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
          
              backgroundColor: '#fff',
              // borderTopLeftRadius: responsiveWidth(1),
              // borderTopRightRadius: responsiveWidth(1),
              borderRadius:responsiveFontSize(5),
              paddingVertical: responsiveHeight(3),
              marginHorizontal:responsiveWidth(10),
             marginTop:responsiveHeight(11)

            }}>
            <Text
              style={{
                alignItems: 'center',
                fontSize: responsiveFontSize(3.6),
                fontWeight: 'bold',
                color: '#306060',
              }}>
              DM Desk
            </Text>
            <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(3.5), }}>
              अपॉइंटमेंट स्टेटस
            </Text>
          </View>

          <View style={{ paddingTop: responsiveHeight(7) }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                // margin: 30,
              }}>
              <TouchableOpacity
                onPress={PendingHendle}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#F99417',
                  paddingVertical: responsiveHeight(2),
                  paddingHorizontal: responsiveWidth(8),
                  borderRadius: responsiveWidth(5),
                }}>
                <View
                  style={styles.content_iconWraper}>
                  <View style={styles.innerView}>
                    <Icon2
                      name="progress-clock"
                      color="white"
                      size={responsiveFontSize(4)}
                      onPress={navigation.toggleDrawer}
                    />
                  </View>

                  <View style={styles.textWrapDiv}>
                    {/* {loaderInfo == true ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : ( */}
                    <Text style={styles.text}>{pending}</Text>
                    {/* )} */}
                    <Text
                      style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}>
                      लंबित
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(7),
                  borderRadius: responsiveWidth(10),
                }}
                onPress={OpenAppointment}>
                {/* <Image source={userAdd} style={styles.userAddImg} /> */}
                <Image source={require('./../../../android/app/src/main/assets/images/plus.png')} style={styles.userAddImg} />
                <View>
                  <Text
                    style={{
                      color: '#306060',
                      paddingTop: responsiveHeight(3),
                      fontWeight: 'bold',
                      fontSize: responsiveFontSize(2.5)
                    }}>
                    बुक अपॉइंटमेंट
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default HomeScreenPa;

const styles = StyleSheet.create({
  header: {
    // padding: 20,
    paddingVertical: responsiveHeight(5),
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // backgroundColor: '#528B8B',
  },
  container: {
    flex: 1,
    backgroundColor: '#C0D9D9',
    borderTopLeftRadius: responsiveWidth(15),
    borderTopRightRadius: responsiveWidth(15),
    marginTop: responsiveHeight(2),
    paddingVertical: responsiveHeight(3),
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
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    alignItems: 'center',
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
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderColor: '#fff',
    // borderStyle:'dashed',
    borderWidth: 1,
    borderRadius: 15,
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
  },

  PendigCicle: {
    justifyContent: 'center', alignItems: 'center',
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    backgroundColor: 'blue',
    borderRadius: responsiveFontSize(4),
    marginLeft: responsiveWidth(1),
  }
});