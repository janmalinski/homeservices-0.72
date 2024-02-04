import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import i18n from 'i18next';

import { Button, TextInput } from '@src/components';
import { spacing } from '@src/components';

export interface ILoginFormData {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  initialValues: ILoginFormData;
  onSubmit: (values: ILoginFormData) => void;
  isPending: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validation.email'))
    .required(i18n.t('validation.required')),
  password: Yup.string()
    .min(6, i18n.t('validation.passwordLength'))
    .required(i18n.t('validation.required')),
});

export const LoginForm = ({
  initialValues,
  onSubmit,
  isPending,
}: ILoginFormProps) => {
  const renderForm = useCallback(
    (formProps: FormikProps<ILoginFormData>) => {
      const {
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        touched,
        isValid,
      } = formProps;
      return (
        <View>
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
          <Button
            onPress={handleSubmit}
            title={i18n.t('common.login')}
            buttonStyle={styles.button}
            isLoading={isPending}
            disabled={
              !isValid ||
              isPending ||
              (Object.keys(touched).length === 0 &&
                touched.constructor === Object)
            }
          />
        </View>
      );
    },
    [isPending],
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
  button: ViewStyle;
}

const stylesDef: IStyles = {
  button: {
    marginTop: spacing.small,
    marginBottom: spacing.xLarge,
  },
};

const styles = StyleSheet.create(stylesDef);
