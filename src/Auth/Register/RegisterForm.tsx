import React, { useCallback } from 'react';
import { View, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Formik, FormikProps } from 'formik';
import i18n from 'i18next';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  TextInput,
  Text,
  commonColors,
  spacing,
  Link,
} from '@src/components';

export interface IRegisterFormData {
  email: string;
  password: string;
  termsAccepted: boolean;
  latitude: number;
  longitude: number;
  userRole: {
    name: string;
    id: string;
  }
  language: string;
}

export interface IRegisterFormProps {
  initialValues: IRegisterFormData;
  onSubmit: (values: IRegisterFormData) => void;
  isPending: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validation.email'))
    .required(i18n.t('validation.required')),
  password: Yup.string()
    .min(6, i18n.t('validation.passwordLength'))
    .required(i18n.t('validation.required')),
  termsAccepted: Yup.boolean().oneOf(
    [true],
    i18n.t('validation.acceptRequired'),
  ),
});

export const RegisterForm = ({
  initialValues,
  onSubmit,
  isPending,
}: IRegisterFormProps) => {

  const [t] = useTranslation();

  const navigateToTermsOfUse = useCallback(() => {
    // navigate to terms of use
  }, []);

  const renderForm = useCallback(
    (props: FormikProps<IRegisterFormData>) => {
      const {
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        setFieldValue,
        touched,
        isValid,
      } = props;

      return (
        <>
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
          <TextInput
            withBorder
            label={i18n.t('common.password')}
            errorMessage={
              errors.password && touched.password ? errors.password : ''
            }
            size="small"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            autoCapitalize="none"
            textContentType="password"
            blurOnSubmit
            autoCompleteType="off"
          />
          <Checkbox
            checked={values.termsAccepted}
            onPress={() =>
              setFieldValue('termsAccepted', !values.termsAccepted)
            }
            label={
              <View style={styles.row}>
                <Text
                  typography="body"
                  fontWeight="medium"
                  style={styles.paragraph}>
                  {t('welcome.alreadyHaveAccount')}
                </Text>
                <Link
                  text={t('register.termsOfUse')}
                  color={commonColors.commonBlack}
                  textStyle={
                    errors.termsAccepted && touched.termsAccepted
                      ? styles.error
                      : 
                      undefined
                  }
                  onPress={navigateToTermsOfUse} />
              </View>
            }
            errorMessage={
              errors.termsAccepted &&
              touched.termsAccepted &&
              errors.termsAccepted
            }
          />
          <Button
            disabled={
              !isValid ||
              isPending ||
              (Object.keys(touched).length === 0 &&
                touched.constructor === Object)
            }
            onPress={handleSubmit}
            title={i18n.t('register.register')}
            buttonStyle={styles.button}
            isLoading={isPending}
          />
        </>
      );
    },
    [navigateToTermsOfUse, isPending, t],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {renderForm}
    </Formik>
  );
};

interface IStyles {
  row: ViewStyle;
  button: ViewStyle;
  error: TextStyle;
  paragraph: TextStyle
}

const stylesDef: IStyles = {
  row: {
    flexDirection: 'row',
    paddingTop: 6,
  },
  button: {
    marginTop: spacing.small,
    marginBottom: spacing.xLarge,
  },
  paragraph: {
    lineHeight: spacing.large,
    color: commonColors.textPrimary,
  },
  error: {
    color: commonColors.error,
  },
};

const styles = StyleSheet.create(stylesDef);
