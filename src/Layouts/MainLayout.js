import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


const Wrapper = ({ children, currentRouteName }) => {
  return currentRouteName === 'Login' ? (
    children
  ) : (
    <Drawer.Navigator>
      {/* Add your drawer content here */}
      {children}
    </Drawer.Navigator>
  );
};

export default Wrapper;