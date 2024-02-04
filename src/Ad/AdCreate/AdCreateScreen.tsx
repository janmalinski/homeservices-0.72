import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  useRoute,
  useNavigation,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '@src/store';
import { FullScreenTemplate } from '@src/components';
import { IAdFormData, AdForm } from '../AdForm';
import { fetchUserThunk } from '@src/User/userStore';
import { createAdThunk, fetchServicesThunk } from '@src/Ad/adStore';
import { fetchTypesOfEmploymentThunk } from '@src/Assessment/assessmentStore';
import { TBottomTabsNavigatorParams } from '@src/navigation/BottomTabs/BottomTabsNavigator';
import { TNavParams } from '@src/navigation/RootNavigator';
import { UserDto } from '@src/User/user.dto';

let workingTime = [];

for (let i = 0; i < 7; i++) {
  workingTime.push({
    '06-09': false,
    '09-12': false,
    '12-15': false,
    '15-18': false,
    '18-21': false,
    '21-24': false,
    '24-03': false,
    '03-06': false,
  });
}

const initialValues: IAdFormData = {
  serviceIds: [],
  employmentTypeIds: [],
  dateAvailableFrom: new Date(),
  fixedTerm: false,
  dateAvailableTo: new Date(),
  description: '',
  setHoursWorkingTime: {
    negotiable: null,
    setHours: null,
  },
  address: '',
  latitude: 0,
  longitude: 0,
  workingTime,
};

export const AdCreateScreen = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<TBottomTabsNavigatorParams, 'AdCreate'>>();
  const navigation = useNavigation<NavigationProp<TNavParams, 'AdCreate'>>();

  const user = useAppSelector(state => state.user.data);
  const userRoles = user?.roles;
  const services = useAppSelector(state => state.ad.services);
  const typesOfEmployment = useAppSelector(
    state => state.assessment.typesOfEmployment,
  );
  const isAdPending = useAppSelector(state => state.ad.adPending);

  useEffect(() => {
    dispatch(fetchUserThunk());
    dispatch(fetchServicesThunk());
    dispatch(fetchTypesOfEmploymentThunk());
  }, [dispatch]);

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

  const submitHandler = useCallback(
    async (values: IAdFormData, { resetForm }: { resetForm: () => void }) => {
      const {
        description,
        serviceIds,
        employmentTypeIds,
        dateAvailableFrom,
        fixedTerm,
        dateAvailableTo,
        setHoursWorkingTime,
        // eslint-disable-next-line no-shadow
        workingTime,
        // eslint-disable-next-line no-shadow
        address,
        // eslint-disable-next-line no-shadow
        latitude,
        // eslint-disable-next-line no-shadow
        longitude,
      } = values;

      const { negotiable } = setHoursWorkingTime;
      const data = {
        description,
        serviceIds,
        employmentTypeIds,
        dateAvailableFrom,
        fixedTerm,
        dateAvailableTo,
        workingTimeNegotiable: negotiable as boolean,
        workingTime,
        address,
        latitude,
        longitude,
      };
      const newAd = await dispatch(createAdThunk(data)).unwrap();
      if (newAd) {
        navigation.navigate('AdList');
        resetForm();
        setAddress('');
      }
    },
    [dispatch, navigation],
  );

  return (
    <FullScreenTemplate safeArea paddedHotizontaly>
      {typesOfEmployment.length > 0 && services && services.length > 0 && (
        <AdForm
          initialValues={initialValues}
          services={services}
          typeemployments={typesOfEmployment}
          isPending={isAdPending}
          onSubmit={submitHandler}
          navigation={navigation}
          roles={userRoles as UserDto.UserRoleItem[]}
          latitude={latitude}
          longitude={longitude}
          address={address}
        />
      )}
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({});
