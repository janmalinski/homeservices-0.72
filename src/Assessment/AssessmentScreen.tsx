import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { Button, Text, FullScreenTemplate } from '@src/components';
import { commonColors, spacing } from '@src/components';
import { useAppSelector, useAppDispatch } from '@src/store';
import {
  fetchRolesThunk,
  fetchTypesOfEmploymentThunk,
} from './assessmentStore';
import { IPayload } from './assessmentStore';
import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { useDispatch } from 'react-redux';

export const AssessmentScreen = () => {
  const [mapButtonPressed, setMapButtonPressed] = useState(false);
  const [userRole, setUserRole] = useState({ id: '', name: '' });
  const [typeOfEmployment, setTypeOfEmployment] = useState<string>('');

  const dispatch = useAppDispatch();

  const roles: IPayload[] = useAppSelector(state => state.assessment.roles);
  const typesOfEmployment: IPayload[] = useAppSelector(
    state => state.assessment.typesOfEmployment,
  );
  const isLoading = useAppSelector(
    state =>
      state.assessment.rolesPending ||
      state.assessment.typesOfEmploymentPending,
  );

  const navigation =
    useNavigation<StackNavigationProp<TRootNavigatorParams, 'Assessment'>>();

  const [t] = useTranslation();

  // useEffect(() => {
  //   console.log('TEST')
  //   fetch('http://192.168.1.24:9000/api/role')
  //   .then(response => response.json())
  //   .then(json => console.log(json))
  // }, []);
  useEffect(() => {
    dispatch(fetchRolesThunk());
    dispatch(fetchTypesOfEmploymentThunk());
  }, [dispatch]);

  const handlePresstypeOfEmploymentButton = useCallback(
    (id: string) => {
      setTypeOfEmployment(id);
    },
    [setTypeOfEmployment],
  );
  const navigateToMap = useCallback(() => {
    setMapButtonPressed(true);
    navigation.navigate('Map', {
      redirectAfterSubmit: 'Register',
      userRole,
    });
  }, [setMapButtonPressed, navigation, userRole]);

  return (
    <FullScreenTemplate safeArea paddedHotizontaly isLoading={isLoading}>
      <View style={styles.container}>
        {roles.length > 0 && (
          <Text typography="title3" style={styles.firstHeader}>
            {t('location.clientOrWorker')}
          </Text>
        )}
        <View style={styles.row}>
          {roles?.map(
            (item: IPayload) =>
              item.name !== 'Admin' && (
                <Button
                  key={item.id}
                  buttonStyle={styles.button}
                  variant={userRole.id === item.id ? 'SECONDARY' : 'PRIMARY'}
                  titleStyle={styles.buttonTitle}
                  title={t(
                    item.name === 'Help'
                      ? 'location.worker'
                      : 'location.client',
                  )}
                  onPress={() => setUserRole({ id: item.id, name: item.name })}
                />
              ),
          )}
        </View>
        {userRole?.id !== '' && (
          <>
            <Text typography="title3" style={styles.header}>
              {userRole.name === 'Client'
                ? t('location.clientEmploymentType')
                : t('location.workerEmploymentType')}
            </Text>
            <View style={styles.row}>
              {typesOfEmployment?.map(
                (typeemployment: { id: string; name: string }) => (
                  <Button
                    key={typeemployment.id}
                    buttonStyle={{ flex: 1 / typesOfEmployment.length - 0.04 }}
                    variant={
                      typeOfEmployment === typeemployment.id
                        ? 'SECONDARY'
                        : 'PRIMARY'
                    }
                    titleStyle={styles.buttonTitle}
                    title={typeemployment.name}
                    onPress={() =>
                      handlePresstypeOfEmploymentButton(typeemployment.id)
                    }
                  />
                ),
              )}
            </View>
          </>
        )}
        {typeOfEmployment.length > 0 && (
          <View>
            <Text typography="title3" style={styles.header}>
              {t('location.yourLocation')}
            </Text>
            <Button
              buttonStyle={styles.button}
              variant={mapButtonPressed ? 'SECONDARY' : 'PRIMARY'}
              titleStyle={styles.buttonTitle}
              title={t('location.detectLocation')}
              onPress={navigateToMap}
            />
          </View>
        )}
      </View>
    </FullScreenTemplate>
  );
};

interface IStyles {
  container: ViewStyle;
  firstHeader: TextStyle;
  header: TextStyle;
  row: ViewStyle;
  button: ViewStyle;
  buttonTitle: TextStyle;
}

const stylesDef: IStyles = {
  container: {
    flex: 1,
    backgroundColor: commonColors.commonWhite,
  },
  firstHeader: {
    marginBottom: spacing.tiny,
  },
  header: {
    marginTop: spacing.xxxLarge,
    marginBottom: spacing.tiny,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    height: 60,
  },
  buttonTitle: {
    color: commonColors.commonBlack,
  },
};

const styles = StyleSheet.create(stylesDef);
