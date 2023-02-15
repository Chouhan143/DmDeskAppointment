import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Entypo';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Pending from '../screens/StatusScreens/Pending';
import Cancel from '../screens/StatusScreens/Cancel';
import Complete from '../screens/StatusScreens/Complete';
import HomeScreenPa from '../screens/HomeScreenPa';
import HomeScreenAdmin from '../screens/HomeScreenAdmin';
import HomeScreenDm from '../screens/HomeScreenDm';
const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
    
    

    return (
        <Tab.Navigator
            activeColor="#306060"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#80B4B4', borderRadius: 10 }}
        >
            {/* <Tab.Screen name="Pa" component={ varValue == "HomeScreenPa" ?   HomeScreenPa : varValue == "HomeScreenDm" ? HomeScreenDm :  varValue == "HomeScreenAdmin" ? HomeScreenAdmin : null } options={{
                tabBarLabel: 'होम',
                tabBarIcon: ({ color }) => (    
                    <Icon name="home" color={color} size={26} />
                ),
            }} /> */}
             <Tab.Screen name="Pa" component={HomeScreenPa} options={{
                tabBarLabel: 'होम',
                tabBarIcon: ({ color }) => (    
                    <Icon name="home" color={color} size={responsiveFontSize(4)} />
                ),
            }} />
        
            <Tab.Screen name="Pending_tab" component={Pending}
                options={{
                    tabBarLabel: 'पेंडिंग',
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="pending" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Cancel_tab" component={Cancel}
                options={{
                    tabBarLabel: 'कैंसिल',
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="cancel" color={color} size={26} />
                    ),
                }} />
            <Tab.Screen name="Complete_tab" component={Complete}
                options={{
                    tabBarLabel: 'कम्प्लीट',
                    tabBarIcon: ({ color }) => (
                        <Icon3 name="checkmark-done" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    );
}



