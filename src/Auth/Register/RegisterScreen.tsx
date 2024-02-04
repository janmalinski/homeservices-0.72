import React, { useCallback, useEffect } from 'react';
import {
  useRoute,
  RouteProp,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';

import { FullScreenTemplate } from '@src/components';
import { RegisterForm, IRegisterFormData } from './RegisterForm';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '@src/store';
import { registerThunk } from '../authStore';
import { language } from '@src/locale/i18nConfig';

const initialValues: IRegisterFormData = {
  email: '',
  password: '',
  termsAccepted: false,
  latitude: 0,
  longitude: 0,
  userRole: {
    name: '',
    id: ''
  },
  language: '',
};

export const RegisterScreen = () => {
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<TRootNavigatorParams, 'Register'>>();

  const navigation =
    useNavigation<NavigationProp<TRootNavigatorParams, 'Register'>>();
  const isVerificationEmailSent = useAppSelector(
    state => state.auth.verificationEmailSent,
  );

  const isPending = useAppSelector(state => state.auth.registerPending);

  useEffect(() => {
    if (isVerificationEmailSent) {
      navigation.navigate('VerifyRegistrationCode');
    }
  }, [isVerificationEmailSent, navigation]);

  const registerHandler = useCallback(
    (values: IRegisterFormData) => {
      const {
        latitude,
        longitude,
        userRole,
      } = route.params;

      const data = {
        ...values,
        latitude,
        longitude,
        userRoleId: userRole?.id as string,
        language,
      };

      dispatch(registerThunk(data));
    },
    [dispatch, route.params],
  );

  return (
    <FullScreenTemplate safeArea paddedHotizontaly>
      <RegisterForm
        initialValues={initialValues}
        onSubmit={registerHandler}
        isPending={isPending}
      />
    </FullScreenTemplate>
  );
};
