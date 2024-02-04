import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { StyleSheet, View, Platform, ViewStyle, TextStyle } from 'react-native';
import { Formik, FormikProps } from 'formik';
import DatePicker from 'react-native-date-picker';
import * as Yup from 'yup';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  TextInput,
  Text,
  commonColors,
  textStyles,
  spacing,
} from '@src/components';
import TimeOfDayCheckboxes from '../TimeOfDayCheckboxes';
import { AdDto } from '../ad.dto';
import { NavigationProp } from '@react-navigation/native';
import { TNavParams } from '@src/navigation/RootNavigator';
import { UserDto } from '@src/User/user.dto';

export interface IAdFormData {
  serviceIds: string[];
  employmentTypeIds: string[];
  dateAvailableFrom: Date;
  fixedTerm: boolean;
  dateAvailableTo: Date;
  description: string;
  setHoursWorkingTime: {
    negotiable: null | boolean;
    setHours: null | boolean;
  };
  address: string;
  latitude: number;
  longitude: number;
  workingTime: UserDto.AvailabilityTime[];
}

export interface IAddFormProps {
  initialValues: IAdFormData;
  isPending: boolean;
  services: AdDto.Service[];
  typeemployments: AdDto.TypeOfEmployment[];
  onSubmit: (
    values: IAdFormData,
    { resetForm }: { resetForm: () => void },
  ) => void;
  navigation: NavigationProp<TNavParams, 'AdCreate' | 'AdEdit'>;
  roles: UserDto.UserRoleItem[];
  latitude?: number;
  longitude?: number;
  address?: string;
}

const validationSchema = Yup.object().shape({
  serviceIds: Yup.array().min(1, 'Select at least one service'),
  employmentTypeIds: Yup.array().min(1, 'Select at least one employment type'),
  dateAvailableFrom: Yup.date().required(i18n.t('validation:required')),
  dateAvailableTo: Yup.date().required(i18n.t('validation:required')),
  fixedTerm: Yup.boolean().required(i18n.t('validation:required')),
  setHoursWorkingTime: Yup.object().shape({
    negotiable: Yup.boolean().required(i18n.t('validation:required')),
    setHours: Yup.boolean().required(i18n.t('validation:required')),
  }),
  address: Yup.string().required('Detect location or set location manually'),
  description: Yup.string().required('Description is required'),
});

export const AdEditForm = ({
  initialValues,
  isPending,
  services,
  typeemployments,
  onSubmit,
  navigation,
  roles,
  latitude,
  longitude,
  address,
}: IAddFormProps) => {
  const checkedEmploymentTypes: { id: string; name: string }[] = useMemo(
    () => [],
    [],
  );

  const formRef = useRef<FormikProps<IAdFormData>>(null);
  const [t] = useTranslation();

  useEffect(() => {
    formRef?.current?.setFieldValue('address', address);
    formRef?.current?.setFieldValue('latitude', latitude);
    formRef?.current?.setFieldValue('longitude', longitude);
  }, [address, latitude, longitude]);

  const handleSetValue = useCallback(
    (
      type: string,
      value: string | Date | boolean,
      setFieldValue: {
        (
          field: string,
          value: string | Date | boolean | { id: string; name: string },
          shouldValidate?: boolean | undefined,
        ): void;
        (arg0: string, arg1: string[]): void;
      },
      name?: string,
    ) => {
      switch (type) {
        case 'services':
          const checkedServices: string[] = [];
          const clickedService = checkedServices.indexOf(value as string);
          if (clickedService === -1) {
            checkedServices.push(value as string);
          } else {
            checkedServices.splice(clickedService, 1);
          }
          return setFieldValue('serviceIds', checkedServices);

        case 'employmentTypes':
          const clickedEmploymentType = checkedEmploymentTypes
            .map(el => el.id)
            .indexOf(value as string);
          if (clickedEmploymentType === -1) {
            checkedEmploymentTypes.push({
              id: value as string,
              name: name as string,
            });
          } else {
            checkedEmploymentTypes.splice(clickedEmploymentType, 1);
          }
          return setFieldValue(
            'employmentTypeIds',
            checkedEmploymentTypes.map(el => el.id),
          );

        case 'dateAvailableFrom':
          return setFieldValue('dateAvailableFrom', value);

        case 'dateAvailableTo':
          return setFieldValue('dateAvailableTo', value);

        case 'setHoursWorkingTime':
          return setFieldValue(`setHoursWorkingTime.${name}`, value);

        default:
          return false;
      }
    },
    [checkedEmploymentTypes],
  );

  const handleworkingTime = (
    value: boolean,
    index: number,
    setFieldValue: {
      (
        field: string,
        value: string | Date | boolean | UserDto.AvailabilityTime[],
        shouldValidate?: boolean | undefined,
      ): void;
      (arg0: string, arg1: string[]): void;
    },
    workingTime: UserDto.AvailabilityTime[],
    range: string,
  ) => {
    const upadatedworkingTime = workingTime.map((el, i) =>
      i === index ? { ...el, [range]: value } : el,
    );
    setFieldValue('workingTime', upadatedworkingTime);
  };

  const navigateToMap = useCallback(() => {
    if (roles.length === 1) {
      navigation.navigate('AdMap', {
        redirectAfterSubmit: 'AdCreate',
        userRole: roles[0],
      });
    }
  }, [navigation, roles]);

  const renderForm = useCallback(
    (formProps: FormikProps<IAdFormData>) => {
      const {
        handleChange,
        handleBlur,
        setFieldValue,
        values,
        handleSubmit,
        errors,
        touched,
        isValid,
      } = formProps;

      return (
        <View style={styles.container}>
          <Text typography="subhead" style={styles.label}>
            {t('adCreate.employmentType')}
          </Text>
          <View style={[styles.row, styles.marginBottomRegular]}>
            {typeemployments?.map(typeemployment => (
              <Button
                variant={
                  values.employmentTypeIds.includes(typeemployment.id)
                    ? 'SECONDARY'
                    : 'PRIMARY'
                }
                key={typeemployment.id}
                buttonStyle={[styles.typeofEmploymentButton]}
                title={typeemployment.name}
                onPress={() =>
                  handleSetValue(
                    'employmentTypes',
                    typeemployment.id,
                    setFieldValue,
                    typeemployment.name,
                  )
                }
              />
            ))}
            {errors.employmentTypeIds && touched.employmentTypeIds && (
              <Text typography="caption2" style={styles.errorMessage}>
                {errors.employmentTypeIds}
              </Text>
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <Text typography="subhead" style={styles.label}>
              {t('adCreate.availableFrom')}
            </Text>
            <DatePicker
              date={values.dateAvailableFrom}
              onDateChange={date =>
                handleSetValue('dateAvailableFrom', date, setFieldValue)
              }
              androidVariant={
                Platform.OS === 'android' ? 'nativeAndroid' : undefined
              }
              mode="date"
            />
            {checkedEmploymentTypes.filter(el => el.name === 'Once').length ===
              0 && (
              <Checkbox
                checked={values.fixedTerm}
                onPress={() => setFieldValue('fixedTerm', !values.fixedTerm)}
                label={t('adCreate.fixedTerm')}
                containerStyle={styles.checkboxContainer}
              />
            )}
          </View>
          {checkedEmploymentTypes.filter(el => el.name === 'Once').length ===
            0 &&
            values.fixedTerm && (
              <View style={styles.marginBottomRegular}>
                <Text typography="subhead" style={styles.label}>
                  {t('adCreate.availableTo')}
                </Text>
                <DatePicker
                  date={values.dateAvailableTo}
                  onDateChange={(date: Date) =>
                    handleSetValue('dateAvailableTo', date, setFieldValue)
                  }
                  androidVariant={
                    Platform.OS === 'android' ? 'nativeAndroid' : undefined
                  }
                  mode="date"
                />
              </View>
            )}
          <View style={styles.marginBottomRegular}>
            <Text typography="subhead" style={styles.label}>
              {t('adCreate.services')}
            </Text>
            {services?.map(service => (
              <Checkbox
                key={service.id}
                checked={values.serviceIds.includes(service.id)}
                onPress={() =>
                  handleSetValue('services', service.id, setFieldValue)
                }
                label={service.name}
                containerStyle={styles.checkboxContainer}
              />
            ))}
            {errors.serviceIds && touched.serviceIds && (
              <Text typography="caption2" style={styles.errorMessage}>
                {errors.serviceIds}
              </Text>
            )}
          </View>
          <View style={styles.marginBottomRegular}>
            <Text typography="subhead" style={styles.label}>
              {t('adCreate.setHoursWorkingTime')}
            </Text>
            <View style={[styles.row, styles.marginBottomRegular]}>
              <Button
                variant={
                  values.setHoursWorkingTime.negotiable === true
                    ? 'SECONDARY'
                    : 'PRIMARY'
                }
                buttonStyle={styles.buttonHalfScreen}
                title={i18n.t('adCreate.workingTimeNegotiable')}
                onPress={() => {
                  handleSetValue(
                    'setHoursWorkingTime',
                    !values.setHoursWorkingTime.negotiable,
                    setFieldValue,
                    'negotiable',
                  );
                  handleSetValue(
                    'setHoursWorkingTime',
                    false,
                    setFieldValue,
                    'setHours',
                  );
                }}
              />
              {errors.setHoursWorkingTime &&
                touched.setHoursWorkingTime &&
                values.setHoursWorkingTime.negotiable === null &&
                values.setHoursWorkingTime.setHours === null && (
                  <Text
                    typography="caption2"
                    style={[styles.errorMessage, styles.marginTopTiny]}>
                    Choose one option
                  </Text>
                )}

              <Button
                variant={
                  values.setHoursWorkingTime.setHours === true
                    ? 'SECONDARY'
                    : 'PRIMARY'
                }
                buttonStyle={[styles.buttonHalfScreen]}
                title={i18n.t('adCreate.setHoursWorkingTimeSetHours')}
                onPress={() => {
                  handleSetValue(
                    'setHoursWorkingTime',
                    !values.setHoursWorkingTime.setHours,
                    setFieldValue,
                    'setHours',
                  );
                  handleSetValue(
                    'setHoursWorkingTime',
                    false,
                    setFieldValue,
                    'negotiable',
                  );
                }}
              />
            </View>
            {/* { values.setHoursWorkingTime.setHours  && ( */}
            <TimeOfDayCheckboxes
              setFieldValue={setFieldValue}
              workingTime={values.workingTime}
              handleOnPress={handleworkingTime}
            />
            {/* )} */}
          </View>
          <View style={styles.marginBottomRegular}>
            {address !== null && (
              <TextInput
                size="textArea"
                numberOfLines={2}
                multiline
                disabled
                label={i18n.t('adCreate.location')}
                containerStyle={styles.negativeMarginBottomRegular}
                withBorder
                secureTextEntry={false}
                value={address}
                autoCapitalize="none"
                blurOnSubmit
                autoCompleteType="off"
              />
            )}
            <Button
              variant={
                latitude !== 0 && longitude !== 0 ? 'SECONDARY' : 'PRIMARY'
              }
              buttonStyle={[styles.button, styles.marginTopXlarge]}
              title={i18n.t('location.detectLocation')}
              onPress={() => navigateToMap()}
            />
          </View>
          <View style={styles.marginBottomRegular}>
            <TextInput
              size="textArea"
              numberOfLines={4}
              multiline
              withBorder
              errorMessage={
                errors.description && touched.description
                  ? errors.description
                  : ''
              }
              secureTextEntry={false}
              value={values.description}
              onChangeText={handleChange('description')}
              autoCapitalize="none"
              blurOnSubmit
              style={styles.textArea}
              autoCompleteType="off"
              label={i18n.t('adCreate.description')}
            />
          </View>
          <Button
            onPress={handleSubmit}
            title={i18n.t('common.save')}
            buttonStyle={styles.button}
            disabled={!isValid || isPending}
            isLoading={isPending}
          />
        </View>
      );
    },
    [
      t,
      typeemployments,
      checkedEmploymentTypes,
      services,
      address,
      latitude,
      longitude,
      isPending,
      handleSetValue,
      navigateToMap,
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
  container: ViewStyle;
  row: ViewStyle;
  button: ViewStyle;
  checkboxContainer: ViewStyle;
  errorMessage: TextStyle;
  buttonHalfScreen: ViewStyle;
  marginTopXlarge: ViewStyle;
  marginTopTiny: ViewStyle;
  marginBottomRegular: ViewStyle;
  negativeMarginBottomRegular: ViewStyle;
  typeofEmploymentButton: ViewStyle;
  textArea: TextStyle;
  label: TextStyle;
}

const stylesDef: IStyles = {
  container: { paddingBottom: 80 },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 8,
  },
  checkboxContainer: {
    marginBottom: -spacing.small,
  },
  errorMessage: {
    color: commonColors.error,
    marginTop: spacing.tiny,
  },
  buttonHalfScreen: {
    flex: 0.48,
  },
  marginTopXlarge: {
    marginTop: spacing.xLarge,
  },
  marginTopTiny: {
    marginTop: spacing.tiny,
  },
  marginBottomRegular: {
    marginBottom: spacing.regular,
  },
  negativeMarginBottomRegular: {
    marginBottom: -spacing.regular,
  },
  typeofEmploymentButton: {
    flex: 0.3,
    marginBottom: 5,
  },
  textArea: {
    height: 160,
    ...Platform.select({
      android: {
        textAlignVertical: 'top',
      },
      ios: {
        paddingTop: 0,
      },
    }),
  },
  label: {
    ...textStyles.fontWeights.semiBold,
    color: commonColors.commonBlack,
    marginBottom: 4,
  },
};

const styles = StyleSheet.create(stylesDef);
