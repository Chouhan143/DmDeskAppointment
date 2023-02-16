import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import React from 'react'
import Menu from '../components/Menu';

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from '../../Hooks/ApiHelper';
import { Get_Appointment_Data } from '../../Constants/UrlConstants';

const { height } = Dimensions.get('window');
const HomeScreenDm = ({ navigation }) => {
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [rejected, setRejected] = useState([]);

   
    const logout = () => {
        navigation.replace('login');

    };

    const PendingHendle = () => {
        navigation.navigate('pending');
    }
    const CompletegHendle = () => {
        navigation.navigate('complete');
    }
    const CancelgHendle = () => {
        navigation.navigate('cancel');
    }

    



    useEffect(() => {
        AddUserInfo();
    }, []);

    const AddUserInfo = async () => {

        const response = await getData(Get_Appointment_Data)
     
                // console.log("response", JSON.stringify(response.result))

                // console.log(newData)
                const completedData = response.result.filter(appointment => appointment.status == 'complete')
                const pendingData = response.result.filter(appointment => appointment.status == 'pending')
                const rejectData = response.result.filter(appointment => appointment.status == 'reject')
                setPending(pendingData.length)
                setCompleted(completedData.length)
                setRejected(rejectData.length)

                setMyData(completedData)

           
    }


    return (
        <>
            <View style={styles.header}>
                <Icon name="sort-variant" color='#3e2465' size={responsiveFontSize(4)} onPress={navigation.toggleDrawer} />
                <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>
                    District Magistrate
                </Text>
                <Icon name="logout" color='#3e2465' size={responsiveFontSize(4)} onPress={logout} />
            </View>

            <View style={styles.container}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
                    <Text style={{ alignItems: 'center', fontSize: responsiveFontSize(2.6), fontWeight: 'bold', color: '#306060', }}>DM Desk</Text>
                    <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.5), }}>
                        अपॉइंटमेंट स्टेटस
                    </Text>
                    {/* </View> */}
                </View>
                <View style={{ marginTop: responsiveHeight(6) }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <TouchableOpacity onPress={PendingHendle} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F99417', paddingVertical: responsiveHeight(1),
                            paddingHorizontal: responsiveWidth(10),
                            borderRadius: responsiveWidth(10),
                        }}>
                            <View style={styles.content_iconWraper} >
                                <View style={styles.innerView}>

                                    <Icon2 name="progress-clock" color='white' size={responsiveFontSize(5)} onPress={navigation.toggleDrawer} />
                                </View>

                                <View style={styles.textWrapDiv}>
                                    <Text style={styles.text}>{pending}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}>लंबित </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*  */}
                        <TouchableOpacity onPress={CompletegHendle} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#54B435', paddingVertical: responsiveHeight(1),
                            paddingHorizontal: responsiveWidth(10),
                            borderRadius: responsiveWidth(10),
                        }}>
                            <View style={styles.content_iconWraper} >
                                <View style={styles.innerView}>

                                    <Icon3 name="checkmark-done" color='white' size={responsiveFontSize(5)} onPress={navigation.toggleDrawer} />
                                </View>

                                <View style={styles.textWrapDiv}>
                                    <Text style={styles.text}>{completed}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}> पूर्ण </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*  */}


                    </View>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: responsiveHeight(4),
                        marginLeft: responsiveWidth(10)
                    }}>

                        <TouchableOpacity onPress={CancelgHendle} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#DC0000', paddingVertical: responsiveHeight(1),
                            paddingHorizontal: responsiveWidth(10),
                            borderRadius: responsiveWidth(10),
                        }}>
                            <View style={styles.content_iconWraper} >
                                <View style={styles.innerView}>

                                    <Icon2 name="cancel" color='white' size={responsiveFontSize(5)} onPress={navigation.toggleDrawer} />
                                </View>

                                <View style={styles.textWrapDiv}>
                                    <Text style={styles.text}>{rejected}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}> अस्वीकृत </Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>
                    {/* Bottom Menu start */}
                    <View style={{ marginTop: responsiveHeight(12)}}>
          <View style={styles.menuStyle}>
            <Menu />
          </View>
        </View>
         {/* Bottom Menu End */}
            </View>
           


        </>

    )
}

export default HomeScreenDm

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
        borderTopLeftRadius: responsiveWidth(15),
        borderTopRightRadius: responsiveWidth(15),
        marginTop: responsiveHeight(3),
        paddingVertical: responsiveHeight(5),
        height:responsiveHeight(100)
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
        fontSize: 24,
        fontWeight: 'bold',
        alignItems: "center",


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
        alignItems: 'center'

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
        width: 50,
        height: 50,
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


    }
    ,


    container2: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: "#efeff4",
    },
    textContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuStyle: {
        position:'absolute',
   
        marginTop:responsiveHeight(80),
        // paddingBottom:0,
        borderColor: '#306060',
        backgroundColor: '#80B4B4',
        width:responsiveWidth(100),
        // height: responsiveHeight(9),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }

})