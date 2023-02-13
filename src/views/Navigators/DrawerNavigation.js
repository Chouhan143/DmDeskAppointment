import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Pending from '../screens/StatusScreens/Pending';
import Cancel from '../screens/StatusScreens/Cancel';
import Complete from '../screens/StatusScreens/Complete';
import TabNavigator from './TabNavigator';
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator  screenOptions={{
        // headerShown:false,
        drawerActiveBackgroundColor:'#3e2465',
        drawerActiveTintColor:'#ffff',
    }}>
      <Drawer.Screen name="Home" component={TabNavigator} 
      options={{
        headerShown:false,
        drawerIcon: ({ color }) => (    
            <Icon name="home" color={color} size={26} />
        ),
    }} />
      <Drawer.Screen name="Pending" component={Pending}
       options={{
         
        drawerIcon: ({ color }) => (
            <Icon2 name="pending" color='#C8F526' size={26} />
        ),
    }} />
      <Drawer.Screen name="Cancel" component={Cancel}
       options={{
        drawerIcon: ({ color }) => (
            <Icon2 name="cancel" color='#E31230' size={26} />
        ),
    }} />
      <Drawer.Screen name="Complete" component={Complete}
      options={{
        drawerIcon: ({ color }) => (
            <Icon3 name="checkmark-done" color='#306060' size={26} />
        ),
    }} />
    </Drawer.Navigator>
  );
}
export default DrawerNavigation