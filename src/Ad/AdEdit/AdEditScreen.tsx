import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import {
  useRoute,
  useNavigation,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';

import { useAppSelector, useAppDispatch } from '@src/store';
import { commonColors, FullScreenTemplate, Icon, spacing } from '@src/components';
import { IAdFormData, AdForm } from '../AdForm';
import { fetchServicesThunk, updateAdThunk } from '@src/Ad/adStore';
import { TNavParams } from '@src/navigation/RootNavigator';
import { UserDto } from '@src/User/user.dto';
import { fetchTypesOfEmploymentThunk } from '@src/Assessment/assessmentStore';
import { fetchUserThunk } from '@src/User/userStore';

export const AdEditScreen = () => {
  const route = useRoute<RouteProp<TNavParams, 'AdEdit'>>();
  const navigation = useNavigation<NavigationProp<TNavParams, 'AdEdit'>>();

  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [addr, setAddr] = useState('');
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.data);
  const userRoles = user?.roles;
  const allServices = useAppSelector(state => state.ad.services);
  const allTypesOfEmployment = useAppSelector(
    state => state.assessment.typesOfEmployment,
  );

  const {
    id,
    address,
    latitude,
    longitude,
    description,
    availability,
    availableFrom,
    availableTo,
    services,
    typesOfEmployment,
    createdAt,
    rooms,
    userId,
  } = route.params.ad;

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

  let serviceIds: string[] = [];
  services?.map(item => serviceIds.push(item.id));

  let employmentTypeIds: string[] = [];
  typesOfEmployment?.map(item => employmentTypeIds.push(item.id));

  const initialValues: IAdFormData = {
    serviceIds,
    employmentTypeIds,
    dateAvailableFrom: new Date(availableFrom),
    fixedTerm: availableTo === null ? false : true,
    dateAvailableTo: availableTo === null ? new Date() : new Date(availableTo),
    description,
    setHoursWorkingTime: {
      negotiable: availability?.negotiable,
      setHours: availability?.time.length ? true : false,
    },
    address,
    latitude,
    longitude,
    workingTime: availability?.time,
    id,
  };

  const isAdPending = useAppSelector(state => state.ad.updatePending);

  useEffect(() => {
    dispatch(fetchServicesThunk());
    dispatch(fetchTypesOfEmploymentThunk());
  }, [dispatch]);

  useEffect(() => {
    setLat(
      route.params.latitude !== undefined
        ? route.params.latitude
        : initialValues.latitude,
    );
    setLng(
      route.params.longitude !== undefined
        ? route.params.longitude
        : initialValues.longitude,
    );
    setAddr(
      route.params.address !== undefined && route.params.address !== ''
        ? route.params.address
        : initialValues.address,
    );
  }, [
    route.params,
    initialValues.address,
    initialValues.latitude,
    initialValues.longitude,
  ]);

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
        id,
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
      const newAd = await dispatch(updateAdThunk(data)).unwrap();
      if (newAd) {
        dispatch(fetchUserThunk());
        const {
          id,
          address,
          latitude,
          longitude,
          description,
          workingTimeNegotiable,
          workingTime,
          availableFrom,
          availableTo,
          services,
          typesOfEmployment,
        } = newAd;

        navigation.navigate('AdDetails', {
          ad: {
            id,
            address,
            latitude,
            longitude,
            description,
            availability: {
              negotiable: workingTimeNegotiable,
              time: workingTime,
            },
            availableFrom,
            availableTo,
            services,
            typesOfEmployment,
            createdAt,
            userId,
            rooms,
          },
          isAuthor: true,
        });
        resetForm();
        setAddr('');
      }
    },
    [dispatch, navigation, createdAt, id, rooms, userId],
  );

  const navigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <FullScreenTemplate safeArea paddedHotizontaly>
      <Icon
        name="close-circle-outline"
        color={commonColors.commonBlack}
        size={20}
        style={styles.closeIcon}
        onPress={navigateBack}
      />
      <AdForm
        initialValues={initialValues}
        services={allServices as UserDto.UserAd['services']}
        typeemployments={allTypesOfEmployment}
        isPending={isAdPending}
        onSubmit={submitHandler}
        navigation={navigation}
        roles={userRoles as UserDto.UserRoleItem[]}
        latitude={lat}
        longitude={lng}
        address={addr}
      />
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    position: 'absolute',
    top: -2,
    end: spacing.large,
  },
});
