import React, { useContext } from 'react'
// import SignInScreen from './src/components/screens/SignInScreen'
// import  HomeScreen from './src/views/screens/HomeScreenDm'
// import DmDashboard from './src/components/screens/DmDashboard';
// import PaDashboard from './src/components/screens/PaDashboard';
// import AppointmentScreen from './src/components/screens/AppointmentScreen';
import {

  Pressable,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Home from './src/views/screens/Home'
import LoginScreen from './src/views/screens/LoginScreen'
import HomeScreenAdmin from './src/views/screens/HomeScreenAdmin';
import HomeScreenDm from './src/views/screens/HomeScreenDm';
import BookAppointment from './src/views/screens/BookAppointment'
import AddUserInfo from './src/views/screens/UserScreen/AddUser'
import Pending from './src/views/screens/StatusScreens/Pending'
import Completed from './src/views/screens/StatusScreens/Complete'
import Cancel from './src/views/screens/StatusScreens/Cancel'
// import TabNavigator from './src/views/Navigators/TabNavigator';
import DrawerNavigation from './src/views/Navigators/DrawerNavigation';
import ForgotPass from './src/views/screens/UserScreen/ForgotPass';
import NewPassword from './src/views/screens/UserScreen/NewPassword';
import HomeScreenSteno from './src/views/screens/HomeScreenSteno'
import EditBookAppointmentSteno from './src/views/screens/EditBookAppointmentSteno'
import { ToastProvider } from 'react-native-fast-toast'
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HomeScreenPa from './src/views/screens/HomeScreenPa';
// import { AuthContext } from './src/LoginCredencial/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Uselogout } from './src/Hooks/LogoutHook';
import PushNotification from "react-native-push-notification";
import StenoPending from './src/views/screens/StatusScreens/StenoPending'
import EditBookAppointment from './src/views/screens/EditBookAppointment';
import BookAppointmentSteno from './src/views/screens/BookAppointmentSteno';
import { DataContextApiProvider } from './src/LoginCredencial/context/DataContextApi';
import { AuthContext } from './src/LoginCredencial/context/AuthContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { checkToken } from './src/Hooks/TokenHooks';
import { TokenConstant } from './src/Constants/TokenConstant';
// ------------------------------------------

// import {StatusBar, Text, View} from 'react-native';
// import Navigation from './src/LoginCredencial/components/Navigation';
// import {AuthProvider} from './src/LoginCredencial/context/AuthContext';


// ---------------------------------





// const Drawer = createDrawerNavigator();
// function HomeDrawers() {
// return (
//   <NavigationContainer>
//   <Drawer.Navigator initialRouteName="Home">
//     <Drawer.Screen name="Home" component={HomeScreen} />
//     <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//   </Drawer.Navigator>
// </NavigationContainer>
//   )
// }




const App = ({ navigation,navigator }) => {
  const Stack = createNativeStackNavigator();
  const { userInformation ,setisLogged, isLogged} = useContext(AuthContext);
  const [loggedIn, setloggedIn] = useState(false)


  const logout = () => {
    Uselogout(navigation)
  };

  


  useEffect(() => {
    checkStatus()
  }, [])

  const checkStatus = async () => {
  const token = await checkToken(TokenConstant.IS_LOGGED)
    if (token) {
      setloggedIn(true)
    } else {
      setloggedIn(false)

    }
  }
  


  
  return (
    <DataContextApiProvider>
      {console.log(loggedIn)}

    <ToastProvider>

      <NavigationContainer>

        <Stack.Navigator initialRouteName={Home}>
          <>
          <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreenDm' component={HomeScreenDm} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreenPa' component={ HomeScreenPa} options={{ headerShown: false }} />
          <Stack.Screen name='Appointment' component={BookAppointment} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreenAdmin' component={HomeScreenAdmin} options={{ headerShown: false }} />
          <Stack.Screen name='HomeScreenSteno' component={HomeScreenSteno} options={{ headerShown: false }} />
          <Stack.Screen name='userInfo' component={AddUserInfo} options={{ headerShown: false }} />
          <Stack.Screen name='pending' component={Pending} options={{headerShown: false}} />
          
          <Stack.Screen name='StenoPending' component={StenoPending} options={{headerShown: false}} />
          <Stack.Screen name='complete' component={Completed} options={{headerShown: false }} />
          <Stack.Screen name='cancel' component={Cancel} options={{ headerShown: false }} />
          <Stack.Screen name='edit-appointment' component={EditBookAppointment} options={{ headerShown: false }} />
          <Stack.Screen name='editBookAppointmentSteno' component={EditBookAppointmentSteno} options={{ headerShown: false }} />
          
          <Stack.Screen name='BookAppointmentSteno' component={BookAppointmentSteno} options={{ headerShown: false }} />
          </>
          <>
          <Stack.Screen name='Forgotpassword' component={ForgotPass} options={{ headerShown: false }} />
          <Stack.Screen name='NewPassword' component={NewPassword} options={{headerShown:false}} /> 
          </>
          {/* <Stack.Screen name='Drawer' component={DrawerContent} options={{headerShown:false}} /> */}
          {/* <Stack.Screen name='Home' component={Home} options={{headerShown:false}} /> */}

        
         
        </Stack.Navigator>
     
      </NavigationContainer>
    </ToastProvider>
    </DataContextApiProvider>
  )
  
  }
export default App





// const App = () => {
//   return (
//     <AuthProvider>
//       <StatusBar backgroundColor="#06bcee" />
//       <Navigation />
//     </AuthProvider>
//   );
// };

// export default App;