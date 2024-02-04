import { Formik, FormikProps } from 'formik';
import React, { useCallback } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import i18n from 'i18next';

import { Button, TextInput } from '@src/components';

export interface IResetPasswordFormData {
  email: string;
}

export interface IResetPasswordFormProps {
  initialValues: IResetPasswordFormData;
  onSubmit: (values: IResetPasswordFormData) => void;
  isPending: boolean;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(i18n.t('validation.email'))
    .required(i18n.t('validation.required')),
});

export const ResetPasswordForm = ({
  initialValues,
  onSubmit,
  isPending,
}: IResetPasswordFormProps) => {
  const renderForm = useCallback(
    (props: FormikProps<IResetPasswordFormData>) => {
      const {
        handleChange,
        handleBlur,
        values,
        handleSubmit,
        errors,
        touched,
        isValid,
      } = props;
      return (
        <View style={styles.container}>
          <TextInput
            withBorder
            label={i18n.t('common.email')}
            errorMessage={errors.email && touched.email ? errors.email : ''}
            size="small"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            blurOnSubmit
            autoCompleteType="off"
          />
          <Button
            onPress={handleSubmit}
            title={i18n.t('resetPassword.resetPasswordButtonLabel')}
            buttonStyle={styles.button}
            isLoading={isPending}
            disabled={!isValid || isPending || !touched}
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
  container: ViewStyle;
  button: ViewStyle;
}

const stylesDef: IStyles = {
  container: {
    marginTop: 40,
  },
  button: {
    marginTop: 8,
  },
};

const styles = StyleSheet.create(stylesDef);
