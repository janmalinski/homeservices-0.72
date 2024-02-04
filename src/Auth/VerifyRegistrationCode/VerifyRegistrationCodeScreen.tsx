import React, { useCallback, useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import {
  IVerifyRegistrationCodeFormData,
  VerifyRegistrationCodeForm,
} from './VerifyRegistrationCodeForm';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { showSuccessToastAction } from '@src/Toast/toastStore';
import { useAppSelector, useAppDispatch } from '@src/store';
import { verifyRegistrationCodeThunk } from '../authStore';
import { FullScreenTemplate } from '@src/components';

const initialValues: IVerifyRegistrationCodeFormData = {
  code: '',
};

export const VerifyRegistrationCodeScreen = () => {
  const dispatch = useAppDispatch();

  const [t] = useTranslation();

  const isPending = useAppSelector(
    state => state.auth.verifyRegistrationCodePending,
  );

  const isVerificationEmailSent = useAppSelector(
    state => state.auth.verificationEmailSent,
  );

  const isRegistered = useAppSelector(state => state.auth.registered);

  const navigation =
    useNavigation<
      NavigationProp<TRootNavigatorParams, 'VerifyRegistrationCode'>
    >();

  useEffect(() => {
    if (isRegistered) {
      navigation.navigate('Login');
    }

    navigation.addListener('beforeRemove', e => {
      if (isVerificationEmailSent === false) {
        return;
      }
      e.preventDefault();
      dispatch(
        showSuccessToastAction({
          message: t('verifyRegistrationCode.checkEmail'),
        }),
      );
    });
  }, [navigation, isVerificationEmailSent, dispatch, t, isRegistered]);

  const registerCodeSignUpHandler = useCallback(
    (values: IVerifyRegistrationCodeFormData) => {
      const { code } = values;
      dispatch(verifyRegistrationCodeThunk(code));
    },
    [dispatch],
  );

  return (
    <FullScreenTemplate safeArea paddedHotizontaly>
      <VerifyRegistrationCodeForm
        initialValues={initialValues}
        onSubmit={registerCodeSignUpHandler}
        isPending={isPending}
      />
    </FullScreenTemplate>
  );
};
