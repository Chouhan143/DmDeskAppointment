import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RefreshControl } from 'react-native';
import Menu from '../components/Menu';
import { useContext } from 'react';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";

import { AuthContext } from '../../LoginCredencial/context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { getData } from '../../Hooks/ApiHelper';
import { Get_Appointment_Data } from '../../Constants/UrlConstants';
import DataContext from '../../LoginCredencial/context/DataContextApi'
// import { Uselogout } from '../../Hooks/LogoutHook';
const { height } = Dimensions.get('window');

const HomeScreenDm = ({ navigation }) => {
    // const {logout} = useContext(AuthContext)
    const { data, count, getDataFunc } = useContext(DataContext)
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loaderInfo, setloaderInfo] = useState(false);

    // const handleLogout  = () => {
    //     console.log("as")
    //     AsyncStorage.clear()
    //     navigation.replace('login');
    // };

    const handleLogout = () => {
        AsyncStorage.clear()
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



    // const onRefresh = () => {
    //     setloaderInfo(true)
    //     setRefreshing(true);
    //     AddUserInfo();
    //     setloaderInfo(false)
    //     setTimeout(() => setRefreshing(false), 1000);
    // };

    // useEffect(() => {
    //     setloaderInfo(true)
    //     AddUserInfo();
    //     setloaderInfo(false)
    // }, [count]);

    // useEffect(() => {
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
        }, 3000);
        return () => clearInterval(interval);
    });


    const AddUserInfo = async () => {

        const response = await getData(Get_Appointment_Data)
        // console.log(response)
        const completedData = response.result.filter(appointment => appointment.status == 'complete')

        const pendingData = response.result.filter(appointment => appointment.status == 'pending')
        // const currentDate = new Date().toISOString().slice(0, 10);
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-');

        const filteredData = pendingData.filter(appointment => appointment.status === 'pending' && appointment.date === formattedDate);

        const rejectData = response.result.filter(appointment => appointment.status == 'reject')
        setPending(filteredData.length)
        setCompleted(completedData.length)
        setRejected(rejectData.length)
        // setMyData(completedData)
    }
    return (
        <>
            <ScrollView
                scrollEnabled={false}
                nestedScrollEnabled={false}
            // refreshControl={
            //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            >
                <View style={styles.header}>
                    {/* <Icon3 name="notifications" color='#3e2465' size={responsiveFontSize(4)} onPress={navigation.toggleDrawer} /> */}
                    <Icon3 name="notifications" color='#3e2465' size={responsiveFontSize(4)} onPress={navigation.toggleDrawer}>
                        {pending > 0 && (
                            <View style={{display:"flex",justifyContent:"center", alignItems:'center', position: 'absolute', top: 0,  left:-135, backgroundColor: 'orange', borderRadius: 10 , width:responsiveWidth(4),height:responsiveWidth(4)}}>
                                <Text style={{ fontSize: 10, color: '#3e2465' }}>{pending}</Text>
                            </View>
                        )}
                    </Icon3>
                    <Text style={{ color: '#306060', fontWeight: 'bold', fontSize: responsiveFontSize(2.2) }}>
                        District Magistrate
                    </Text>
                    <Pressable
                        onPress={() => handleLogout()}
                    >
                        <Icon name="logout" color='#3e2465' size={responsiveFontSize(4)} />
                    </Pressable>
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

                                        <Icon2 name="progress-clock" color='white' size={responsiveFontSize(3)} onPress={navigation.toggleDrawer} />
                                    </View>

                                    <View style={styles.textWrapDiv}>
                                        {loaderInfo == true ? (
                                            <ActivityIndicator size="small" color="white" />
                                        ) : (
                                            <Text style={styles.text}>{pending}</Text>
                                        )}

                                        <Text style={{ fontSize: responsiveFontSize(2.1), color: '#fff', fontWeight: 'bold' }}>लंबित </Text>
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

                                        <Icon3 name="checkmark-done" color='white' size={responsiveFontSize(3)} onPress={navigation.toggleDrawer} />
                                    </View>

                                    <View style={styles.textWrapDiv}>
                                        {loaderInfo == true ? (
                                            <ActivityIndicator size="small" color="white" />
                                        ) : (
                                            <Text style={styles.text}>{completed}</Text>
                                        )}

                                        <Text style={{ fontSize: responsiveFontSize(2.1), color: '#fff', fontWeight: 'bold' }}> पूर्ण </Text>
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

                                        <Icon2 name="cancel" color='white' size={responsiveFontSize(3)} onPress={navigation.toggleDrawer} />
                                    </View>

                                    <View style={styles.textWrapDiv}>
                                        {loaderInfo == true ? (
                                            <View>
                                                <ActivityIndicator size="small" color="white" />
                                            </View>

                                        ) : (
                                            <Text style={styles.text}>{rejected}</Text>
                                        )}

                                        <Text style={{ fontSize: responsiveFontSize(2.1), color: '#fff', fontWeight: 'bold' }}> अस्वीकृत </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>


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

    )
}

export default HomeScreenDm

const styles = StyleSheet.create({

    header: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        // backgroundColor: '#528B8B',

    },
    container: {
        // flex: 3,
        backgroundColor: '#C0D9D9',
        borderTopLeftRadius: responsiveWidth(15),
        borderTopRightRadius: responsiveWidth(15),
        marginTop: responsiveHeight(3),
        paddingVertical: responsiveHeight(5),
        height: responsiveHeight(100),
        borderBottomLeftRadius: responsiveWidth(15),
        borderBottomRightRadius: responsiveWidth(15),
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
        alignItems: "center",
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

})