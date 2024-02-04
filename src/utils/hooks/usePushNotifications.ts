import { useEffect, useState}  from 'react';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useAppDispatch } from '@src/store';
import { setFcmTokenAction } from '@src/User/userStore';
import { TNavParams } from '@src/navigation/RootNavigator';


let fcmUnsubscribe = null;

const usePushNotifications = () => {

  const [hasPermission, setHasPermission] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<TNavParams, keyof TNavParams>>();

    const requestUserPermission = async() => {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
          setHasPermission(true)
        }
        return enabled;
      }
    
      const getFCMToken = async() => {
          const hasPermission = await requestUserPermission();
        if(hasPermission){
          const token = await messaging().getToken();
          console.log("FCM_TOKEN", token)
          dispatch(setFcmTokenAction(token))
        } else {
          console.log('Failed token')
        }
      }
    
      const onTokenRefresh = async() => {
        const hasPermission = await requestUserPermission();
        if(hasPermission){
        messaging().onTokenRefresh(token => {
          console.log('messaging.onTokenRefresh')
           dispatch(setFcmTokenAction(token));
        })
        }
      };

      useEffect(()=> {
       requestUserPermission();
       fcmUnsubscribe = messaging().onMessage(async remoteMessage => {
          const messageBody = remoteMessage?.notification?.body;
          const messageTitle = remoteMessage?.notification?.title;
          const { authorId, userId, adId, receiverId } = remoteMessage.data;

          Alert.alert(messageTitle as string, messageBody,  [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Go to message', onPress: () => navigation.navigate('Chat', {
              authorId,
              userId,
              adId,
              receiverId,
            })},
          ])
       })
    
      //  Check wheter an initial notification is available
       messaging().getInitialNotification().then(remoteMessage => {
        if(remoteMessage){
          console.log('Notification caused app to open from quit state:',
          remoteMessage.notification
          )
        }
       });
      //  Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification caused app to open from background state:',
        remoteMessage.notification
        );
        // navigation.navigate(remote)
        // navigation.navigate('Chat', {
        //   authorId: userId,
        //   userId: user?.id as string,
        //   adId: id,
        // });
        // naviagtion.navigate()

      });
    

      // Register background handler - zaimplementowane w index.js
      // messaging().setBackgroundMessageHandler(async remoteMessage => {
      //     // const messageBody = remoteMessage?.notification?.body;
      //     // const messageTitle = remoteMessage?.notification?.title;
      //     // console.log('_ON_SET_BACKGROUND_MESSAGE_HANDLER', remoteMessage)
      //     // Alert.alert(messageTitle as string, messageBody)
      //     console.log('_SET_BACKGROUND_MESSAGE_HANDLER', remoteMessage)
      // });
    
      // return onMessage;
    
      }, []);

      useEffect(()=>{
        getFCMToken();
        onTokenRefresh();
      }, [hasPermission]);

      // useEffect(() => {
      //   checkAndroidPostNtotificationsPermissions();
      // }, [])
    
      // const checkAndroidPostNtotificationsPermissions = async() => {
    
      //   try {
      //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      //       {
      //         title: 'Cool Photo App Camera Permission',
      //         message:
      //           'Cool Photo App needs access to your camera ' +
      //           'so you can take awesome pictures.',
      //         buttonNeutral: 'Ask Me Later',
      //         buttonNegative: 'Cancel',
      //         buttonPositive: 'OK',
      //       },
      //     );
      //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      //       console.log('You can use the camera');
      //     } else {
      //       console.log('Camera permission denied');
      //     }
      //   } catch (err) {
      //     console.warn(err);
      //   }
      // }
}

export default usePushNotifications

