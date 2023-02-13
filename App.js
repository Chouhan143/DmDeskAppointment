import React from 'react'
// import SignInScreen from './src/components/screens/SignInScreen'
// import  HomeScreen from './src/views/screens/HomeScreenDm'
// import DmDashboard from './src/components/screens/DmDashboard';
// import PaDashboard from './src/components/screens/PaDashboard';
// import AppointmentScreen from './src/components/screens/AppointmentScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './src/views/screens/Home'
import  LoginScreen from './src/views/screens/LoginScreen'
import HomeScreenAdmin from './src/views/screens/HomeScreenAdmin';
import HomeScreenDm from './src/views/screens/HomeScreenDm';
import HomeScreenPa from './src/views/screens/HomeScreenPa';
import BookAppointment from './src/views/screens/BookAppointment'
import AddUserInfo from './src/views/screens/UserScreen/AddUser'
import Pending from './src/views/screens/StatusScreens/Pending'
import Completed from './src/views/screens/StatusScreens/Complete'
import Cancel from './src/views/screens/StatusScreens/Cancel'
import { DrawerContent } from './src/views/Drawer/DrawerContent';
// import TabNavigator from './src/views/Navigators/TabNavigator';
import DrawerNavigation from './src/views/Navigators/DrawerNavigation';
import ForgotPass from './src/views/screens/UserScreen/ForgotPass';
import NewPassword from './src/views/screens/UserScreen/NewPassword';
import { ToastProvider } from 'react-native-fast-toast'
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




const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <ToastProvider>
      
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Home}>
     
      {/* <Stack.Screen name='Drawer' component={DrawerContent} options={{headerShown:false}} /> */}
      {/* <Stack.Screen name='Home' component={Home} options={{headerShown:false}} /> */}
    
     <Stack.Screen name='login' component={LoginScreen} options={{headerShown:false}} />
  <Stack.Screen name='Forgotpassword' component={ForgotPass} options={{headerShown:false}} />  
  <Stack.Screen name='NewPassword' component={NewPassword} options={{headerShown:false}} /> 
      <Stack.Screen name='HomeScreenDm' component={HomeScreenDm} options={{headerShown:false}} /> 
          <Stack.Screen name='HomeScreenPa' component={DrawerNavigation} options={{headerShown:false}} />
            <Stack.Screen name='Appointment' component={BookAppointment} options={{headerShown:false}} />
          <Stack.Screen name='HomeScreenAdmin' component={HomeScreenAdmin} options={{headerShown:false}} />
         <Stack.Screen name='userInfo' component={AddUserInfo} options={{headerShown:false}} />
         <Stack.Screen name='pending' component={Pending} options={{headerShown:false}} />
         <Stack.Screen name='complete' component={Completed} options={{headerShown:false}} /> 
         <Stack.Screen name='cancel' component={Cancel} options={{headerShown:false}} /> 
          
    
      </Stack.Navigator>
    </NavigationContainer>
    </ToastProvider>
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

