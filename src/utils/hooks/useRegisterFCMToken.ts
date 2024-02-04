import { useEffect } from 'react';
import Config from 'react-native-config';

import { useAppSelector } from '@src/store';
import { protectedApi } from '@src/Api/protectedApi';

const useRegisterFCMToken = () => {
    const userId = useAppSelector(state => state.user.data?.id);
    const fcmToken = useAppSelector(state => state.user.fcmToken);

    useEffect(() => {
      if(fcmToken !== '' && userId !== ''){
        registerFCMToken();
      }
    }, [userId, fcmToken]);
    
    const registerFCMToken = async() => {
        try {
          await protectedApi.post(`${Config.API_URL}/room/register-fcm-token`, { fcmToken, receiverId: userId });
        } catch (error) {
          console.log('ERROR_SEND_FCM_TOKEN', error);
        }
      };

}

export default useRegisterFCMToken;
