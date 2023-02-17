import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
// import ImageModal from 'react-native-image-modal';
import Avtar from '../../../../Asets/avtar.png';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import AppointmentIcon from '../../../../Asets/AppointmentIcon.png';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { getData, postData } from '../../../Hooks/ApiHelper';
import { SkeletonCard } from './SkeletonCard';
import { useToast } from 'react-native-fast-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Get_Appointment_Data,
  Update_Status,
} from '../../../Constants/UrlConstants';
import { FlatList } from 'react-native';
// import Lightbox from 'react-native-lightbox';

const { height } = Dimensions.get('screen');
const { width } = Dimensions.get('screen');
// var myData = [];
const Pending = ({ navigation }) => {
  const toast = useToast();
  const [myData, setMyData] = useState([]);
  const [showWarning, SetshowWarning] = useState(false);
  const [userData, setUserData] = useState({});
  const [obj, setobj] = useState({});
  const [loader, setloader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [userType, setuserType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setselectedImage] = useState("");

  const toggleModal = item => {
    setModalVisible(!isModalVisible);
    setselectedImage(item);
  };

  const onPressHandler = (item, index) => {
    SetshowWarning(!showWarning);
    setobj(item);
    setUserData(`https://srninfotech.com/projects/dmdesk/public/uploads/${item}`);
  };

  const onPressCard = () => {
    SetshowWarning(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    AddUserInfo();

    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    AddUserInfo();
  }, []);

  const logout = () => {
    navigation.replace('login');
    AsyncStorage.clear();
  };

  const AddUserInfo = async () => {
    const userType = await AsyncStorage.getItem('userType');
    setuserType(userType);
    setloader(true);
    const response = await getData(Get_Appointment_Data);

    const newData = response.result.sort(function (a, b) {
      return a.created_date > b.created_date
        ? -1
        : a.created_date < b.created_date
          ? 1
          : 0;
    });
    const completedData = newData.filter(
      appointment => appointment.status == 'pending',
    );
    setMyData(completedData);
    setloader(false);
  };

  const onPressChangeStatus = async (id, item) => {
    let payload = {
      id: id,
      status: item,
    };
    const data = await postData(Update_Status, payload);
    if (data.result) {
      SetshowWarning(false);
      toast.show('Updated', { type: 'success', position: 'top' });
      AddUserInfo();
    }
  };

  //const imageSource = 'https://srninfotech.com/projects/dmdesk/public/uploads/coffee1.jpg';
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={{ backgroundColor: '#C0D9D9' }}>
      <View style={styles.header}>
        <Icon2
          name="arrow-left-thin-circle-outline"
          color="#3e2465"
          size={responsiveFontSize(4)}
          onPress={() => navigation.goBack()}
        // onPress={navigation.goBack()}
        />
        <Text
          style={{
            color: '#306060',
            fontWeight: 'bold',
            fontSize: responsiveFontSize(2.2),
          }}>
          Pending
        </Text>
        <Icon2
          name="logout"
          color="#3e2465"
          size={responsiveFontSize(4)}
          onPress={logout}
        />
      </View>
      <View style={styles.container}>
        {/* <View style={styles.headingWraper}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>
            Pending Appointments
          </Text>
        </View> */}

        {loader && (
          <View>
            {Array.from({ length: 5 }, (_, index) => (
              <SkeletonCard width={width - 20} height={120} />
            ))}
          </View>
        )}

        <FlatList
          data={myData}
          keyExtractor={(item, index) => index.toString()}
          initialNumToRender={4}
          renderItem={({ item, index }) => (
            <View style={styles.MainWraper}>
              <View style={[styles.UserName, { backgroundColor: '#36648B' }]}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                  }}>
                  {item.user_name} ({item.noofpeople})
                </Text>
              </View>
              <View style={styles.OuterWraper}>
                <View style={styles.ImageWraper}>
                  <TouchableOpacity onPress={() => toggleModal(item.img)}>
                    <Image
                      source={
                        item.img
                          ? {
                            uri: `https://srninfotech.com/projects/dmdesk/public/uploads/${item.img}`,
                          }
                          : Avtar
                      }
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveWidth(20),
                        borderWidth: 0.2,
                        borderRadius: 10,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                
                </View>
                <View style={styles.ContentWraper}>
                  <View style={styles.ListRow}>
                    <Text style={styles.textHeading}>मिलने का कारण :- </Text>
                    <Text numberOfLines={6} style={styles.textSubHeading}>
                      {item.purpose}
                    </Text>
                  </View>
                  <View style={styles.ListRow}>
                    <Text style={styles.textHeading}>
                      व्यक्तियो की संख्या :-
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
                      <Text style={{ color: '#fff', fontSize: 10 }}>
                        View More
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />

        {/* -------------------------- Model-------------------------------- */}
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
                    <View
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={AppointmentIcon}
                        style={styles.AppointmentIconStyle}
                      />
                      <Text
                        style={[
                          styles.text,
                          {
                            color: '#fff',
                            fontSize: responsiveFontSize(2.4),
                            marginLeft: 10,
                          },
                        ]}>
                        Appointment
                      </Text>
                    </View>

                    <TouchableOpacity onPress={onPressCard}>
                      <Icon
                        name="circle-with-cross"
                        color="#fff"
                        size={responsiveFontSize(3)}
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
                        <Text style={[styles.text, { color: '#fff' }]}>
                          नाम :- {obj.user_name}
                        </Text>
                        <Text style={[styles.text, { color: '#fff' }]}>
                          पता/विभाग :- {obj.depat}
                        </Text>
                        <Text style={[styles.text, { color: '#fff' }]}>
                          मोबाइल नंबर :- {obj.phone}
                        </Text>
                        <Text style={[styles.text, { color: '#fff' }]}>
                          मिलने का कारण :- {obj.purpose}
                        </Text>
                        <Text style={[styles.text, { color: '#fff' }]}>
                          व्यक्तियो की संख्या :- {obj.noofpeople}
                        </Text>
                        <Text style={[styles.text, { color: '#fff' }]}>
                          तारीख:- {obj.date}
                        </Text>
                        <Text style={[styles.text, { color: '#fff' }]}>
                          समय :- {obj.time}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {userType !== 'ad' && (
                  <View style={styles.warning_button}>
                    <View style={styles.btnWrapper}>
                      <View style={styles.acceptBtn}>
                        <Pressable
                          onPress={() =>
                            onPressChangeStatus(obj.id, 'complete')
                          }
                          android_ripple={{ color: '#fff' }}>
                          <Text style={[styles.text, { color: '#fff' }]}>
                            Complete
                          </Text>
                        </Pressable>
                      </View>
                      <View style={styles.cancelBtn}>
                        <Pressable
                          onPress={() => onPressChangeStatus(obj.id, 'reject')}
                          android_ripple={{ color: '#fff' }}>
                          <Text style={[styles.text, { color: '#fff' }]}>
                            Reject
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </View>
        {/* ----------------------------------------------------------------- */}

        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
            {console.log(selectedImage)}
            <Image
              style={styles.modalImage}
              source={{ uri: selectedImage }}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default Pending;

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
    alignItems: 'center',
    backgroundColor: '#C0D9D9',
    paddingVertical: 20,
  },
  headingWraper: {
    display: 'flex',
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36648B',
    width: responsiveWidth(100) - 20,
    padding: 15,
    borderRadius: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: responsiveFontSize(1.7),
  },
  Model: {
    display: 'flex',
    // paddingLeft: responsiveWidth(1),
    width: responsiveWidth(100) - 60,
    borderRadius: 10,
    textAlign: 'center',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  cancelIcon: {
    marginLeft: 125,
  },

  centered_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  warning_modal: {
    width: responsiveWidth(100) - 20,
    marginTop: (responsiveHeight(100) - 100) / 15,
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
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(2),
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
  AppointmentIconStyle: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
    color: '#ffff',
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
    marginTop: 10,
    paddingBottom: 10,
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
    width: responsiveWidth(100) - 100,
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
    fontSize: responsiveFontSize(1.5),
  },
  textSubHeading: {
    color: '#8B8989',
    fontSize: responsiveFontSize(1.3),
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
  image: {
    width: 200,
    height: 200,
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
});
