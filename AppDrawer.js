import React from 'react';

import { NavigationContainer, } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {  Provider as PaperProvider, } from 'react-native-paper';
import MainTabScreen from './src/views/Drawer/MainTabScreen';
import SupportScreen from './src/views/Drawer/SupportScreen';
import BookmarkScreen from './src/views/Drawer/BookmarkScreen';



const Drawer = createDrawerNavigator();

const AppDrawer = () => {

return(


    <NavigationContainer >
   
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>

    </NavigationContainer>
  

    )    
}

export default AppDrawer