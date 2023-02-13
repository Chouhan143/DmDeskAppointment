import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {ActivityIndicator} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import userAdd from '../../../Asets/plus.png';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

const { height } = Dimensions.get('window');

const HomeScreenPa = ({ navigation }) => {
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [myData, setMyData] = useState([]);
  const [loader, setloader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loaderInfo, setloaderInfo] = useState(false);

  const OpenAppointment = () => {
    navigation.navigate('Appointment');
  };
  const logout = () => {
    navigation.replace('login');
  };

  const PendingHendle = () => {
    navigation.navigate('Pending_tab');
  };
  const CompletegHendle = () => {
    navigation.navigate('Complete_tab');
  };
  const CancelgHendle = () => {
    navigation.navigate('Cancel_tab');
  };

  const onRefresh = () => {
    setloaderInfo(true)
    setRefreshing(true);
    AddUserInfo();
    setloaderInfo(false)

    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    setloaderInfo(true)
    AddUserInfo();
    setloaderInfo(false)
  }, []);

  const AddUserInfo = () => {
    axios({
      method: 'get',
      url: 'https://srninfotech.com/projects/dmdesk/getAppointmentData',
    })
    .then(function (response) {
      // console.log("response", JSON.stringify(response.data.result))
      // console.log(newData)
      const completedData = response.data.result.filter(
        appointment => appointment.status == 'complete',
        );
        const pendingData = response.data.result.filter(
          appointment => appointment.status == 'pending',
          );
          const rejectData = response.data.result.filter(
            appointment => appointment.status == 'reject',
            );
            setPending(pendingData.length);
            setCompleted(completedData.length);
            setRejected(rejectData.length);
            
            setMyData(completedData);
          })
          .catch(function (error) {
            console.log('error', error);
          });
        };
        
  return (
    <>
      <ScrollView
        scrollEnabled={false}
        nestedScrollEnabled={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.header}>
          <Icon
            name="sort-variant"
            color="#3e2465"
            size={28}
            onPress={navigation.toggleDrawer}
          />
          <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>
            Personal Assistent
          </Text>
          <Icon name="logout" color="#3e2465" size={28} onPress={logout} />
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
            <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.5), }}>
              अपॉइंटमेंट स्टेटस
            </Text>
          </View>
          <View style={{ marginTop: responsiveHeight(6) }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                // margin: 30,
              }}>
              <TouchableOpacity
                onPress={PendingHendle}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#80B4B4',
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(10),
                  borderRadius: responsiveWidth(10),
                }}>
                <View
                  style={styles.content_iconWraper}>
                  <View style={styles.innerView}>
                    <Icon2
                      name="progress-clock"
                      color="white"
                      size={28}
                      onPress={navigation.toggleDrawer}
                    />
                  </View>

                  <View style={styles.textWrapDiv}>
                  {loaderInfo == true ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.text}>{pending}</Text>
                  )}
                    <Text
                      style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}>
                      लंबित
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={CompletegHendle}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#80B4B4',
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(10),
                  borderRadius: responsiveWidth(10),
                }}>
                <View
                  style={styles.content_iconWraper}>
                  <View style={styles.innerView}>
                    <Icon3
                      name="checkmark-done"
                      color="white"
                      size={28}
                      onPress={navigation.toggleDrawer}
                    />
                  </View>

                  <View style={styles.textWrapDiv}>
                    
                  {loaderInfo == true ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.text}>{completed}</Text>
                  )}
                    <Text
                      style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}>
                      
                      पूर्ण
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: responsiveHeight(4),
                // margin: 25,
              }}>
              <TouchableOpacity
                onPress={CancelgHendle}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#80B4B4',
                  paddingVertical: responsiveHeight(1),
                  paddingHorizontal: responsiveWidth(10),
                  borderRadius: responsiveWidth(10),
                }}>
                <View
                  style={styles.content_iconWraper}>
                  <View style={styles.innerView}>
                    <Icon2
                      name="cancel"
                      color="white"
                      size={28}
                      onPress={navigation.toggleDrawer}
                    />
                  </View>

                  <View style={styles.textWrapDiv}>
                  {loaderInfo == true ? (
                    <View>
                      <ActivityIndicator size="small" color="white" />
                    </View>
                    
                  ) : (
                    <Text style={styles.text}>{rejected}</Text>
                  )}
                    <Text
                      style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}>
                      
                      अस्वीकृत
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
                  paddingHorizontal: responsiveWidth(10),
                  borderRadius: responsiveWidth(10),
                }}
                onPress={OpenAppointment}>
                <Image source={userAdd} style={styles.userAddImg} />
                <View>
                  <Text
                    style={{
                      color: '#306060',
                      paddingTop: responsiveHeight(3),
                      fontWeight: 'bold',
                      fontSize:responsiveFontSize(2)
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
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // backgroundColor: '#528B8B',
  },
  container: {
    flex: 1,
    backgroundColor: '#C0D9D9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 15,
    // paddingHorizontal: 20,
    paddingVertical: 40,
    minHeight: height,
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
    marginTop:responsiveHeight(1),
  },

  innerView: {
    width: 50,
    height: 50,
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
});
