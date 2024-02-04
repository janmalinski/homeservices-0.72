import React, { useCallback, useEffect, useState } from 'react';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';

import { FullScreenTemplate } from '@src/components';
import { IAccountFormData, AccountForm } from './AccountForm';
import { TNavParams } from '@src/navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '@src/store';
import { updateUserThunk } from '@src/User/userStore';

export const AccountScreen = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<TNavParams, 'Account'>>();
  const route = useRoute<RouteProp<TNavParams, 'Account'>>();
  const user = useAppSelector(state => state.user.data);
  const isUserUpdatePending = useAppSelector(
    state => state.user.userUpdatePending,
  );

  const initialValues: IAccountFormData = {
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    phoneNumberConsent: user?.phoneNumberConsent || false,
    latitude: user?.latitude as number,
    longitude: user?.latitude as number,
    address: user?.address || '',
  };

  useEffect(() => {
    if (
      route.params?.latitude &&
      route.params?.longitude &&
      route.params?.address
    ) {
      // eslint-disable-next-line no-shadow
      const { latitude, longitude, address } = route.params;
      setLatitude(latitude);
      setLongitude(longitude);
      setAddress(address);
    }
  }, [route.params]);

  const accountFormHandler = useCallback(
    async (values: IAccountFormData) => {
      const upadeddUser = await dispatch(updateUserThunk(values)).unwrap();
      if (upadeddUser) {
        navigation.navigate('Settings');
      }
    },
    [dispatch, navigation],
  );

  return (
    <FullScreenTemplate paddedHotizontaly>
      <AccountForm
        navigation={navigation}
        initialValues={initialValues}
        isPending={isUserUpdatePending}
        latitude={latitude}
        longitude={longitude}
        address={address !== '' ? address : user!.address}
        onSubmit={accountFormHandler}
      />
    </FullScreenTemplate>
  );
};
