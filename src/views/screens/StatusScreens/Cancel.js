import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { Modal } from 'react-native';
import React from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
import Avtar from '../../../../Asets/avtar.png';
import {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native';
import { SkeletonCard } from './SkeletonCard';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('screen');
const Completed = () => {
  const [obj, setobj] = useState({});
  const [showWarning, SetshowWarning] = useState(false);
  const [userData, setUserData] = useState({})
  const [dataKey, setDataKey] = useState('');
  const [myData, setMyData] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loader, setloader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    AddUserInfo();

    setTimeout(() => setRefreshing(false), 1000);
  };
  const onPressCard = () => {
    SetshowWarning(false);
  }

  useEffect(() => {
    AddUserInfo();
  }, []);

  const onPressHandler = (item, index) => {
    setobj(item);
    setDataKey(index)
    setUserData(item)
    SetshowWarning(true);
  }

  const AddUserInfo = () => {
    setloader(true);
    axios({
      method: 'get',
      url: 'https://srninfotech.com/projects/dmdesk/getAppointmentData',
    })
      .then(function (response) {
        // console.log("response", JSON.stringify(response.data.result))

        const rejectData = response.data.result.filter(
          appointment => appointment.status == 'reject',
        );
        console.log(rejectData);
        setloader(false);
        setMyData(rejectData);
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{backgroundColor: '#C0D9D9'}}>
      <View style={styles.container}>
        <View style={styles.headingWraper}>
          <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
            Cancel Appointments
          </Text>
        </View>
        {loader && (
          <View>
            {Array.from({length: 10}, (_, index) => (
              <SkeletonCard width={width - 20} height={120} />
            ))}
          </View>
        )}

        {myData?.map((item, index) => {
          console.log(item.img);
          return (
            <View key={index} style={styles.MainWraper}>
              <View style={[styles.UserName, {backgroundColor: '#36648B'}]}>
                <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold'}}>
                  {item.user_name}{' '}
                </Text>
              </View>
              <View style={styles.OuterWraper}>
                <View style={styles.ImageWraper}>
                  <Image
                    source={
                      item.img
                        ? {
                            uri: `https://srninfotech.com/projects/dmdesk/public/uploads/${item.img}`,
                          }
                        : Avtar
                    }
                    style={{
                      width: width / 4,
                      height: 100,
                      borderWidth: 0.2,
                      borderRadius: 10,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={styles.ContentWraper}>
                  <View style={styles.ListRow}>
                    <Text style={styles.textHeading}>मिलने का कारण :- </Text>
                    <Text numberOfLines={6} style={styles.textSubHeading}>
                      {item.purpose}{' '}
                    </Text>
                  </View>
                  <View style={styles.ListRow}>
                    <Text style={styles.textHeading}>
                      व्यक्तियो की संख्या :-{' '}
                    </Text>
                    <Text style={styles.textSubHeading}>{item.noofpeople}</Text>
                  </View>
                  <View style={styles.ListRow}>
                    <Text style={styles.textHeading}>तारीख :- </Text>
                    <Text style={styles.textSubHeading}>{item.date}</Text>
                  </View>
                  <View style={styles.ListRow}>
                    <Text style={styles.textHeading}>समय :- </Text>
                    <Text style={styles.textSubHeading}>{item.time}</Text>
                  </View>
                  <View style={styles.ViewMore}>
                      <TouchableOpacity onPress={() => onPressHandler(item)}>
                        <Text style={{ color: '#fff', fontSize: 10 }}>View More</Text>
                      </TouchableOpacity>
                    </View>
                </View>
              </View>
            </View>
          );
        })}

           {/* modal  */}
    <View style={styles.centered_view}>
          <Modal
            visible={showWarning}
            transparent
            onRequestClose={() => SetshowWarning(false)}
            animationType="slide"
            hardwareAccelerated>
            <View style={styles.centered_view}>
              <View style={styles.warning_modal}>
                <View style={styles.warning_title}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={[styles.text, {color: '#fff', fontSize: 16}]}>
                      Appointment
                    </Text>
                    <TouchableOpacity onPress={onPressCard}>
                      <Icon
                        name="circle-with-cross"
                        color="#fff"
                        size={20}
                        style={styles.cancelIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.warning_body}>
                  <View style={styles.Model}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: 10,
                        }}>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          नाम :- {obj.user_name}
                        </Text>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          पता/विभाग :- {obj.depat}{' '}
                        </Text>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          मोबाइल नंबर :- {obj.phone}{' '}
                        </Text>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          मिलने का कारण :- {obj.purpose}{' '}
                        </Text>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          व्यक्तियो की संख्या :- {obj.noofpeople}{' '}
                        </Text>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          तारीख:- {obj.date}{' '}
                        </Text>
                        <Text style={[styles.text, {color: '#fff'}]}>
                          समय :- {obj.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
             
              </View>
            </View>
          </Modal>
        </View>
        {/* modal ends here */}
      </View>
    </ScrollView>
  );
};

export default Completed;

const styles = StyleSheet.create({
  // container: {
  //     flex: 1,

  //     alignItems:'center',
  //     backgroundColor: '#C0D9D9',
  //     paddingVertical: 40,
  // },
  headingWraper: {
    display: 'flex',
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3e2465',
    width: width - 50,
    padding: 20,
    borderRadius: 50,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  headingWraper: {
    display: 'flex',
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36648B',
    width: width - 20,
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
  },

  Model: {
    display: 'flex',
    height: 250,
    paddingLeft: 20,
    width: width - 90,
    borderRadius: 10,
    textAlign: 'center',
  },
  cancelIcon: {
    marginLeft: 125,
  },
  HeadTable: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: 300,
    height: 300,
    backgroundColor: '#6195C1',
    borderWidth: 1,
    borderColor: '#36648B',
    borderRadius: 20,
  },
  warning_title: {
    position: 'relative',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36648B',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  warning_body: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContent: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#6195C1',
    width: width - 150,
    borderWidth: 0.5,
    borderRadius: 10,
    width: width - 20,
    borderColor: '#90B3F2',
  },

  UserName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000',
    padding: 10,
    borderColor: 'trasperant',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    width: '100%',
  },

  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  acceptBtn: {
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },

  // ------------------------------------------User Card styling---------------
  MainWraper: {
    // flex: 1,
    display: 'flex',
    width: width - 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 5,
    overflow: 'hidden',
    flexWrap: 'wrap',
    position: 'relative',
    marginTop: 10,
  },
  UserName: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000',
    padding: 8,
    borderColor: 'trasperant',
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    width: '100%',
  },
  OuterWraper: {
    display: 'flex',
    flexDirection: 'row',
  },
  ImageWraper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  ContentWraper: {
    overflow: 'hidden',
    flexWrap: 'wrap',
    width: width / 1.5,
  },
  ListRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    marginHorizontal: 5,
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  textHeading: {
    color: '#000',
    paddingVertical: 5,
    fontWeight: 'bold',
    fontSize: 10,
  },
  textSubHeading: {
    color: '#8B8989',
    fontSize: 10,
  },
  ViewMore: {
    backgroundColor: '#36648B',
    padding: 5,
    width: 70,
    borderWidth: 0.2,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 150,
  },
});
