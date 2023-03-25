/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppWrapper from './AppWrapper';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
PushNotification.configure({
  onNotification: function (notification) {
    // console.log("NOTIFICATION:", notification);
    notification.finish();
  },
  requestPermissions: Platform.OS === 'ios'
});

AppRegistry.registerComponent(appName, () => AppWrapper);
