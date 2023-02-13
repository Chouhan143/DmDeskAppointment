import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import React from 'react'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import BookAppointment from './BookAppointment'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const { height } = Dimensions.get('window');
const HomeScreenDm = ({ navigation }) => {
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [rejected, setRejected] = useState([]);

    const OpenAppointment = () => {
        navigation.navigate('Appointment');
    };
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

    const AddUserInfo = () => {
        axios({
            method: 'get',
            url: 'https://srninfotech.com/projects/dmdesk/getAppointmentData',

        })
            .then(function (response) {
                // console.log("response", JSON.stringify(response.data.result))

                // console.log(newData)
                const completedData = response.data.result.filter(appointment => appointment.status == 'complete')
                const pendingData = response.data.result.filter(appointment => appointment.status == 'pending')
                const rejectData = response.data.result.filter(appointment => appointment.status == 'reject')
                setPending(pendingData.length)
                setCompleted(completedData.length)
                setRejected(rejectData.length)

                console.log(pendingData)
                setMyData(completedData)

            })
            .catch(function (error) {
                console.log("error", error)
            })
    }


    return (
        <>
            <View style={styles.header}>
                <Icon name="sort-variant" color='#3e2465' size={28} onPress={navigation.toggleDrawer} />
                <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>
                    District Magistrate
                </Text>
                <Icon name="logout" color='#3e2465' size={28} onPress={logout} />
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
                            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#80B4B4', paddingVertical: responsiveHeight(1),
                            paddingHorizontal: responsiveWidth(10),
                            borderRadius: responsiveWidth(10),
                        }}>
                            <View style={styles.content_iconWraper} >
                                <View style={styles.innerView}>

                                    <Icon2 name="progress-clock" color='white' size={28} onPress={navigation.toggleDrawer} />
                                </View>

                                <View style={styles.textWrapDiv}>
                                    <Text style={styles.text}>{pending}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}>लंबित </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        {/*  */}
                        <TouchableOpacity onPress={CompletegHendle} style={{
                            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#80B4B4', paddingVertical: responsiveHeight(1),
                            paddingHorizontal: responsiveWidth(10),
                            borderRadius: responsiveWidth(10),
                        }}>
                            <View style={styles.content_iconWraper} >
                                <View style={styles.innerView}>

                                    <Icon3 name="checkmark-done" color='white' size={28} onPress={navigation.toggleDrawer} />
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
                            display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#80B4B4', paddingVertical: responsiveHeight(1),
                            paddingHorizontal: responsiveWidth(10),
                            borderRadius: responsiveWidth(10),
                        }}>
                            <View style={styles.content_iconWraper} >
                                <View style={styles.innerView}>

                                    <Icon2 name="cancel" color='white' size={28} onPress={navigation.toggleDrawer} />
                                </View>

                                <View style={styles.textWrapDiv}>
                                    <Text style={styles.text}>{rejected}</Text>
                                    <Text style={{ fontSize: responsiveFontSize(2), color: '#fff', fontWeight: 'bold' }}> अस्वीकृत </Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                    </View>

                </View>
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
        width: 50,
        height: 50,
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
    }

})