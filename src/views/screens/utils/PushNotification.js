import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFcmToken();
    }
}

const getFcmToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    console.log('old fcm ', fcmToken)
    if (!fcmToken) {
        try {
            let fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log('new gen fcm', fcmToken)
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        } catch (error) {
            console.log(error)

        }

    }
}


export const NotificationService = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage.notification,
        );
        // navigation.navigate(remoteMessage.data.type);
    });

    //Forground state

    messaging().onMessage(async remoteMessage => {
        console.log('Notification on forground!', remoteMessage);
      });

     //Background state

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification on Background :',
          remoteMessage.notification,
        );
      }
    })
      


}


export const backgroundMessageHandler = messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });