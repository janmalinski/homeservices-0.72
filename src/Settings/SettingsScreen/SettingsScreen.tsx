import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { FullScreenTemplate, ListItem, WavyHeader } from '@src/components';
import { useTranslation } from 'react-i18next';
import { spacing, commonColors } from '@src/components';
import { UserProfilePicturePicker } from './UserProfilePicturePicker';
import { useAppDispatch, useAppSelector } from '@src/store';
import { fetchUserThunk } from '@src/User/userStore';
import { TNavParams } from '@src/navigation/RootNavigator';
import { DialogTemplate } from './DialogTemplate';
import { logoutThunk } from '@src/Auth/authStore';

export const SettingsScreen = () => {
  const navigation = useNavigation<NavigationProp<TNavParams>>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [t] = useTranslation();
  const dispatch = useAppDispatch();

  const user = useAppSelector(state => state.user.data);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchUserThunk());
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  const Header = (
    <View style={styles.header}>
      <WavyHeader 
        style={styles.wave}
        height={200}
        top={165}
        color={commonColors.blue400}
      />
      <UserProfilePicturePicker initialImageURL={user?.avatarUrl !== null ? user?.avatarUrl : undefined} />
    </View>
  );

  const navigateToAccount = useCallback(() => navigation.navigate('Account' as any), [navigation]);

  const navigateToSignOutDialog = useCallback(() => {
    setDialogVisible(true);
  }, []);

  const navigateToUserAds = useCallback(() => {
    navigation.navigate('UserAdList');
  }, [navigation]);

  const navigateToManageTheme = useCallback(() => {
    navigation.navigate('ManageTheme');
  }, [navigation]);

  const signOut = useCallback(async () => {
    await dispatch(logoutThunk()).unwrap();
  }, [dispatch]);

  const goBack = useCallback(() => {
    setDialogVisible(false);
  }, []);

  return (
    <FullScreenTemplate
      header={Header}
      paddedHotizontaly
      bottomNavigationPad
      isLoading={false}>
      <ListItem
        rightComponent="chevron"
        title={t('settings.account')}
        onPress={navigateToAccount}
        raised
        style={styles.listItem}
      />
      <ListItem
        rightComponent="chevron"
        title={t('settings.yourAds')}
        onPress={navigateToUserAds}
        raised
        style={styles.listItem}
      />
        <ListItem
        rightComponent="chevron"
        title={t('settings.manageTheme')}
        onPress={navigateToManageTheme}
        raised
        style={styles.listItem}
      />
      {dialogVisible && (
        <DialogTemplate
          title={t('settings.signOutTitle')}
          description={t('settings.signOutDialogDescription')}
          proceedButtonLabel={t('settings.signOutAction')}
          cancelButtonLabel={t('common.no')}
          onProceed={signOut}
          onCancel={goBack}
          onBackdropPress={goBack}
        />
      )}
        <ListItem
        rightComponent="chevron"
        title={t('settings.signOutTitle')}
        onPress={navigateToSignOutDialog}
        raised
        style={styles.listItem}
      />
    </FullScreenTemplate>
  );
};

interface IStyles {
  header: ViewStyle;
  wave: ViewStyle;
  listItem: ViewStyle;
}

const stylesDef: IStyles = {
  header: {
    height: 280,
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginHorizontal: -spacing.large,
  },
  listItem: {
    marginVertical: spacing.small,
  },
};

const styles = StyleSheet.create(stylesDef);
