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
  import Avtar from '../../../assets/images/avtar.png';
  import Icon from 'react-native-vector-icons/Entypo';
  import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
  import AppointmentIcon from '../../../assets/images/AppointmentIcon.png';
  import React, { useContext } from 'react';
  import { useState } from 'react';
  import axios from 'axios';
  import { useEffect } from 'react';
  import { getData, postData } from '../../../Hooks/ApiHelper';
  import { SkeletonCard } from './SkeletonCard';
  import { useToast } from 'react-native-fast-toast';
  
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {
    Get_Appointment_Data,
    Update_Status,Get_Appointment_DataBy_Steno,yy
  } from '../../../Constants/UrlConstants';
  import Update_StatusSteno from '../../../Constants/UrlConstants'
  import { FlatList } from 'react-native';
  import FullScreenModal from '../../../Hooks/FullScreenModal';
  import Loader from '../../components/Loader';
  // import { Swipeable } from 'react-native-gesture-handler';
  import DataContext from '../../../LoginCredencial/context/DataContextApi';
  import Swipeout from 'react-native-swipeout';
  const { height } = Dimensions.get('screen');
  const { width } = Dimensions.get('screen');
  // var myData = [];
  
  
  
  const Pending = ({ navigation }) => {
    const { data, count, setcount, getDataFunc } = useContext(DataContext);
    const toast = useToast();
    const [myData, setMyData] = useState([]);
    const [stenoInfoData,setStenoInfoData]=useState([])
    const [stenoData,setStenoData]=useState([])
    const [filterData, setfilterData] = useState([]);
    const[stnPending,setStnPending]=useState([])
    const [showWarning, SetshowWarning] = useState(false);
    const [userData, setUserData] = useState({});
    const [obj, setobj] = useState({});
    const [loader, setloader] = useState(false);
    const [loader1, setloader1] = useState(false);
    
    const [refreshing, setRefreshing] = useState(false);
    const [userType, setuserType] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setselectedImage] = useState('');
    const [selectedModalImage, setselectedModalImage] = useState([]);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [openItemIndex, setOpenItemIndex] = useState(-1);
    // const [currentDate, setCurrentDate] = useState('');
    // const [datWiseData,setDateWiseData] =useState('');
    const [pending, setPending] = useState([]);
    const [pendingAdmin, setPendingAdmin] = useState([]);
  
  
  
    const renderItemStenoDm = ({ item }) => {
  
      const swipeBtns = [
        {
          text: 'Reject',
          color: '#fff',
          backgroundColor: 'red',
          onPress: () => onPressChangeStatus(item.id, 'reject')
        }
  
      ];
      const LeftBtns = [
        {
          text: 'Complete',
          backgroundColor: 'green',
          onPress: () => onPressChangeStatus(item.id, 'complete')
        },
      ];
  
      return (
        <Swipeout
          left={LeftBtns}
          right={swipeBtns}
          // autoClose={true}
          close={openItemIndex !== -1 && openItemIndex !== item.id}
          onOpen={() => setOpenItemIndex(item.id)}
          onClose={() => setOpenItemIndex(-1)}
        >
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
                <TouchableOpacity
                  onPress={() =>
                    watchFullImage(
                      `https://srninfotech.com/projects/dmdesk_steno/public/uploads/${item.img}`,
                    )
                  }>
                  <Image
                    source={
                      item.img
                        ? {
                          uri: `https://srninfotech.com/projects/dmdesk_steno/public/uploads/${item.img}`,
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
                  <Text style={styles.textHeading}>व्यक्तियो की संख्या :-</Text>
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
                <View style={{ flexDirection: 'row' }}>
                  <View style={{
                    backgroundColor: '#36648B',
                    paddingHorizontal: responsiveWidth(1.5),
                    paddingVertical: responsiveHeight(1.2),
                    width: responsiveWidth(20),
                    borderWidth: 0.2,
                    borderRadius: responsiveFontSize(5),
                    alignItems: 'center',
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: responsiveWidth(3)
                  }}>
                    <TouchableOpacity onPress={() => onPressHandler(item)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: responsiveFontSize(1.5),
                        }}>
                        View
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <View
                    style={{
                      backgroundColor: '#36648B',
                      paddingHorizontal: responsiveWidth(1.5),
                      paddingVertical: responsiveHeight(1.2),
                      width: responsiveWidth(20),
                      borderWidth: 0.2,
                      borderRadius: responsiveFontSize(5),
                      alignItems: 'center',
                      marginTop: 5,
                      marginBottom: 5,
                      marginLeft: responsiveWidth(3)
                    }}>
                    <TouchableOpacity onPress={() => navigateToEdit(item.id)}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: responsiveFontSize(1.5),
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View> */}
                </View>
                <View></View>
              </View>
            </View>
          </View>
        </Swipeout>
      );
    };


    const renderItemSteno = ({ item }) => {


      return (
  
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
              <TouchableOpacity
                onPress={() =>
                  watchFullImage(
                    `https://srninfotech.com/projects/dmdesk/public/uploads/${item.img}`,
                  )
                }>
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
                <Text style={styles.textHeading}>व्यक्तियो की संख्या :-</Text>
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
              <View style={{ flexDirection: 'row' }}>
                <View style={{
                  backgroundColor: '#36648B',
                  paddingHorizontal: responsiveWidth(1.5),
                  paddingVertical: responsiveHeight(1.2),
                  width: responsiveWidth(20),
                  borderWidth: 0.2,
                  borderRadius: responsiveFontSize(5),
                  alignItems: 'center',
                  marginTop: 5,
                  marginBottom: 5,
                  marginLeft: responsiveWidth(3)
                }}>
                  <TouchableOpacity onPress={() => onPressHandler(item)}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(1.5),
                      }}>
                      View
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    backgroundColor: '#36648B',
                    paddingHorizontal: responsiveWidth(1.5),
                    paddingVertical: responsiveHeight(1.2),
                    width: responsiveWidth(20),
                    borderWidth: 0.2,
                    borderRadius: responsiveFontSize(5),
                    alignItems: 'center',
                    marginTop: 5,
                    marginBottom: 5,
                    marginLeft: responsiveWidth(3)
                  }}>
                  <TouchableOpacity onPress={() => navigateToEdit(item.id)}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: responsiveFontSize(1.5),
                      }}>
                      Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View></View>
            </View>
          </View>
        </View>
  
      );
    };





  
    const handleCloseModal = () => {
      setIsFullScreen(!isFullScreen);
    };
    const watchFullImage = item => {
      setIsFullScreen(!isFullScreen);
      setselectedModalImage(item);
    };
  
    const toggleModal = item => {
      setModalVisible(!isModalVisible);
      setselectedImage(item);
    };
  
    const onPressHandler = (item, index) => {
      SetshowWarning(!showWarning);
      setobj(item);
      setUserData(
        `https://srninfotech.com/projects/dmdesk_steno/public/uploads/${item}`,
      );
    };
  
  
  
    const onPressCard = () => {
      SetshowWarning(false);
    };
  
    const onRefresh = () => {
      setRefreshing(true);
      // AddUserInfo();
      setTimeout(() => setRefreshing(false), 1000);
    };
  
    useEffect(() => {
 
    StenoAppointmentData();
 
    }, [count]);
  
    useEffect(() => {
      const timer = setInterval(() => {
       
        StenoAppointmentData();
      }, 3000);
      return () => clearInterval(timer);
    }, []);
  
    const logout = () => {
      navigation.replace('login');
      AsyncStorage.clear();
    };
  
    useEffect(() => {
      const unsubscribe = navigation.addListener('beforeRemove', () => {
        StenoAppointmentData();
      });
  
      return unsubscribe;
    }, []);
  
  
  
  
   
  
 const StenoAppointmentData = async () => {
      const userType = await AsyncStorage.getItem('userType');
      setuserType(userType);
      axios
        .get('https://srninfotech.com/projects/dmdesk_steno/getAppointmentBySteno')
        .then(response => {
          const data = response.data.result;
          setStenoData(data);
          // console.log("124356",data)
          const pendingData1 = data.filter(appointment => appointment.steno_status === 'pending');
         
      
          const currentDate = new Date();
          const formattedDate = currentDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: '2-digit',
            year: 'numeric'
          });
  
          const filteredData = pendingData1.filter(
            appointment => appointment.steno_status === 'pending' && appointment.date === formattedDate
          );
          setStnPending(pendingData1.length);
          setfilterData(pendingData1)

         
        })
        .catch(error => {
       
          console.error(error);
        });
    };
  
  
  
  
  
  
  
    // const onPressChangeStatus = async (id, item) => {
    //   let payload = {
    //     id: id,
    //     status: item,
    //   };
    //   const data = await postData(Update_StatusSteno, payload);
    //   console.log("data result",data.result)
    //   if (data.result) {
    //     SetshowWarning(false);
    //     await toast.show('Updated', { type: 'success', position: 'top' });
    //     await StenoAppointmentData();
    //     await getDataFunc();
    //     await setcount(count + 1);
    //   }
    // };
  

const onPressChangeStatus = async (id, item) => {
  let payload = {
    id: id,
    steno_status: item
  };
  try {
    const { data } = await axios.post('https://srninfotech.com/projects/dmdesk_steno/updateStenoStatus', payload);
    if (data.result) {
      SetshowWarning(false);
      await toast.show('Updated', { type: 'success', position: 'top' });
      await StenoAppointmentData();
      await getDataFunc();
      await setcount(count + 1);
    }
  } catch (err) {
    console.error(err);
  }
};




    
    const navigateToEdit = id => {
      // console.log(id)
      setloader1(true);
      navigation.navigate('editBookAppointmentSteno', { id: id });
      setloader1(false);
    };
  
  
    return (
  
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ backgroundColor: '#C0D9D9' }}>
        {/* {isFullScreen && <ImageViewer style={{height: 100}} imageUrls={[{ url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'}]} index={0} />} */}
  
        <View style={styles.header}>
          <Icon2
            name="arrow-left-thin-circle-outline"
            color="#3e2465"
            size={responsiveFontSize(4)}
            // onPress={navigation.toggleDrawer}
            onPress={() => navigation.goBack()}
          />
  
          
            <Text
              style={{
                color: '#306060',
                fontWeight: 'bold',
                fontSize: responsiveFontSize(2.2),
              }}
            >
             Total Pending({stnPending})
            
            </Text>
         
  
  
  
        {/* <Text
            style={{
              color: '#306060',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(2.2),
            }}>
            Pending({pending})
          </Text> */}
        <Icon2
          name="logout"
          color="#3e2465"
          size={responsiveFontSize(4)}
          onPress={logout}
        />
      </View>
        {/* <Loader visible={loader1} /> */ }
  
    <View style={styles.container}>
      {/* {loader && (
            <View>
              {Array.from({ length: 5 }, (_, index) => (
                <SkeletonCard width={width - 20} height={120} />
              ))}
            </View>
          )} */}
  
  
      {/* {userType === 'dm' && (
        <FlatList data={myData}
          keyExtractor={item => item.id}
          initialNumToRender={4}
          renderItem={renderItem}
        />
      )
      }
  
      {userType === 'pa' && (
        <FlatList data={myData}
          keyExtractor={item => item.id}
          initialNumToRender={4}
          renderItem={renderItemPa}
        />
      )
      }
  
      {userType === 'ad' && (
        <FlatList data={myData}
          keyExtractor={item => item.id}
          initialNumToRender={4}
          renderItem={renderItemAdmin}
        />
      )
      } */}
  
  
      {  userType === 'dm' && (
          <FlatList data={filterData}
          keyExtractor={item => item.id}
          initialNumToRender={4}
          renderItem={renderItemStenoDm}
        />
        )
      }
        
     

     {  userType === 'stn' && (
          <FlatList data={filterData}
            keyExtractor={item => item.id}
            initialNumToRender={4}
            renderItem={renderItemSteno}
          />
        )
        }


  
  
  
  
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
              {userType !== 'ad' && userType !== 'pa' &&  (
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
          {/* {console.log(selectedImage)} */}
          <Image style={styles.modalImage} source={{ uri: selectedImage }} />
        </View>
      </Modal>
      <FullScreenModal
        uri={selectedModalImage}
        visible={isFullScreen}
        onClose={handleCloseModal}
      />
    </View>
  
      </ScrollView >
    );
  };
  
  export default Pending
  
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
      height: responsiveHeight(6),
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
      width: responsiveWidth(100) - 110,
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
      paddingHorizontal: responsiveWidth(1.5),
      paddingVertical: responsiveHeight(1.2),
      width: 70,
      borderWidth: 0.2,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
      // marginLeft: 150,
    },
    ViewMore1: {
      backgroundColor: '#36648B',
      padding: 5,
      width: 70,
      borderWidth: 0.2,
      borderRadius: 20,
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 200,
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
  