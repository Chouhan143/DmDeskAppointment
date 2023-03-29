/**
 * @format
 */

import { AppRegistry } from 'react-native';
import AppWrapper from './AppWrapper';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import { backgroundMessageHandler } from './src/views/screens/utils/PushNotification';
PushNotification.configure({
  onNotification: function (notification) {
    // console.log("NOTIFICATION:", notification);
    notification.finish();
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,

  // (optional) default: true
  requestPermissions: true,
  requestPermissions: Platform.OS === 'ios',
});


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});


AppRegistry.registerComponent(appName, () => AppWrapper);
