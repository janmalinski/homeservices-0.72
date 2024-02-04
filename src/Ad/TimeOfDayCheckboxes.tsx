import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Checkbox, spacing, Text } from '@src/components';

import { IAdFormData } from './AdForm';
import { UserDto } from '@src/User/user.dto';

export interface IProps {
  workingTime: IAdFormData['workingTime'];
  setFieldValue?: any;
  handleOnPress?: (
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
    workingTime: IAdFormData['workingTime'],
    range: string,
  ) => void;
}

const TimeOfDayCheckboxes = React.memo<IProps>(
  ({ workingTime, handleOnPress, setFieldValue }: IProps) => {
    const [t] = useTranslation();

    const handleOnPressCheckbox = (
      value: boolean,
      index: number,
      range: keyof UserDto.AvailabilityTime,
    ) =>
      handleOnPress &&
      handleOnPress(value, index, setFieldValue, workingTime, range);

    const handleRenderRow = (
      item: UserDto.AvailabilityTime,
      index: number,
      range: keyof UserDto.AvailabilityTime,
      header?: boolean,
    ) => (
      <View key={'index' + index}>
        {index === 0 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.monday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
        {index === 1 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.tuesday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
        {index === 2 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.wednesday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
        {index === 3 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.thursday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
        {index === 4 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.friday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
        {index === 5 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.saturday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
        {index === 6 && (
          <View style={styles.column}>
            {header && (
              <Text typography="subhead">{t('adCreate.days.sunday')}</Text>
            )}
            <Checkbox
              onPress={value => handleOnPressCheckbox(value, index, range)}
              checked={workingTime[index][range]}
              containerStyle={styles.checkboxContainer}
              disabled={!handleOnPress}
            />
          </View>
        )}
      </View>
    );

    return (
      <View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.xxxLargeTopMargin}>
            06-09
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '06-09', true),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            09-12
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '09-12'),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            12-15
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '12-15'),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            15-18
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '15-18'),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            18-21
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '18-21'),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            21-24
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '21-24'),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            24-03
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '24-03'),
          )}
        </View>
        <View style={styles.rowCheckboxes}>
          <Text typography="caption1" style={styles.marginTop}>
            03-06
          </Text>
          {workingTime.map((item, index: number) =>
            handleRenderRow(item, index, '03-06'),
          )}
        </View>
      </View>
    );
  },
);

export default TimeOfDayCheckboxes;

interface IStyles {
  checkboxContainer: ViewStyle;
  rowCheckboxes: ViewStyle;
  marginTop: ViewStyle;
  column: ViewStyle;
  xxxLargeTopMargin: ViewStyle;
}

const stylesDef: IStyles = {
  checkboxContainer: {
    marginBottom: 0,
  },
  rowCheckboxes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  marginTop: {
    marginTop: 14,
  },
  column: {
    flexDirection: 'column',
  },
  xxxLargeTopMargin: {
    marginTop: spacing.xxxLarge,
  },
};

const styles = StyleSheet.create(stylesDef);
