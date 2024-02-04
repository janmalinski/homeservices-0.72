import { Formik, FormikProps } from 'formik';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import i18n from 'i18next';

import {
  Button,
  Checkbox,
  commonColors,
  spacing,
  Text,
  TextInput,
} from '@src/components';
import { TNavParams } from '@src/navigation/RootNavigator';
import { NavigationProp } from '@react-navigation/native';

const MIN_NAME_LENGTH = 2;
const MIN_PHONE_NUMBER_LENGTH = 9;

export interface IAccountFormData {
  email: string;
  name: string;
  phoneNumber: string;
  phoneNumberConsent: boolean;
  latitude: number;
  longitude: number;
  address: string;
}

export interface IAccountFormProps {
  navigation: NavigationProp<TNavParams, 'Account'>;
  initialValues: IAccountFormData;
  isPending: boolean;
  latitude?: number;
  longitude?: number;
  address?: string;
  onSubmit: (values: IAccountFormData) => void;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(MIN_NAME_LENGTH, i18n.t('validation.nameLength'))
    .required(i18n.t('validation.required')),
  phoneNumber: Yup.string()
    .required(i18n.t('validation.required'))
    .matches(phoneRegExp, i18n.t('validation.phoneNumberMinLength'))
    .min(MIN_PHONE_NUMBER_LENGTH, i18n.t('validation.phoneNumberMinLength')),
  phoneNumberConsent: Yup.boolean().required(i18n.t('validation.required')),
  email: Yup.string()
    .email(i18n.t('validation.email'))
    .required(i18n.t('validation.required')),
  address: Yup.string().required('Detect location or set location manually'),
});

export const AccountForm = ({
  navigation,
  initialValues,
  isPending,
  latitude,
  longitude,
  address,
  onSubmit,
}: IAccountFormProps) => {

  const formRef = useRef<FormikProps<IAccountFormData>>(null);

  useEffect(() => {
    formRef?.current?.setFieldValue('address', address);
    formRef?.current?.setFieldValue('latitude', latitude);
    formRef?.current?.setFieldValue('longitude', longitude);
  }, [address, latitude, longitude]);

  const handlePhoneConsentPress = useCallback(
    (
      value: boolean,
      setFieldValue: {
        (
          field: string,
          value: string | Date | boolean | { id: string; name: string },
          shouldValidate?: boolean | undefined,
        ): void;
        (arg0: string, arg1: string[]): void;
      },
    ) => {
      setFieldValue('phoneNumberConsent', !value);
    },
    [],
  );
  0;
  const navigateToMap = useCallback(() => {
    navigation.navigate('AccountMap', {
      redirectAfterSubmit: 'Account',
    });
  }, [navigation]);

  const renderForm = useCallback(
    (formProps: FormikProps<IAccountFormData>) => {
      const {
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        handleSubmit,
        errors,
        touched,
      } = formProps;

      return (
        <View>
          <TextInput
            withBorder
            label={i18n.t('common.name')}
            errorMessage={errors.name && touched.name ? errors.name : ''}
            size="small"
            secureTextEntry={false}
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            autoCapitalize="none"
            blurOnSubmit
            autoCompleteType="off"
          />
          <TextInput
            withBorder
            label={i18n.t('common.phoneNumber')}
            errorMessage={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : ''
            }
            size="small"
            value={values.phoneNumber}
            onChangeText={handleChange('phoneNumber')}
            onBlur={handleBlur('phoneNumber')}
            autoCapitalize="none"
            blurOnSubmit
            keyboardType="phone-pad"
            autoCompleteType="off"
          />
          <Checkbox
            checked={values.phoneNumberConsent}
            onPress={() =>
              handlePhoneConsentPress(
                values.phoneNumberConsent as boolean,
                setFieldValue,
              )
            }
            label={i18n.t('account.consentPhoneNumberVisibility') as string}
          />
          <TextInput
            withBorder
            label={i18n.t('common.email')}
            errorMessage={errors.email && touched.email ? errors.email : ''}
            size="small"
            secureTextEntry={false}
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            blurOnSubmit
            autoCompleteType="off"
          />
          {address !== null && (
            <TextInput
              size="textArea"
              numberOfLines={2}
              multiline
              disabled
              label={i18n.t('adCreate.location')}
              withBorder
              value={address}
              autoCapitalize="none"
              blurOnSubmit
              autoCompleteType="off"
            />
          )}
          {errors.address && touched.address && (
            <Text typography="caption2" style={styles.errorMessage}>
              {errors.address}
            </Text>
          )}
          <Button
            variant={
              latitude !== 0 && longitude !== 0 ? 'SECONDARY' : 'PRIMARY'
            }
            buttonStyle={styles.detectLocationButton}
            title={i18n.t('location.detectLocation')}
            onPress={navigateToMap}
          />

          <Button
            onPress={handleSubmit}
            title={i18n.t('common.save')}
            buttonStyle={styles.button}
            isLoading={isPending}
          />
        </View>
      );
    },
    [
      handlePhoneConsentPress,
      isPending,
      navigateToMap,
      address,
      latitude,
      longitude,
    ],
  );

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {renderForm}
    </Formik>
  );
};

interface IStyles {
  button: ViewStyle;
  detectLocationButton: ViewStyle;
  errorMessage: TextStyle;
}

const stylesDef: IStyles = {
  button: {
    marginTop: 8,
    marginBottom: 20,
  },
  detectLocationButton: {
    marginBottom: 20,
  },
  errorMessage: {
    color: commonColors.error,
    marginTop: spacing.tiny,
  },
};

const styles = StyleSheet.create(stylesDef);
