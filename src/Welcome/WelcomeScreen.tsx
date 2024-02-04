import React, { useCallback } from 'react';
import { View, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { TRootNavigatorParams } from '@src/navigation/RootNavigator';
import { Button, commonColors, Text, Link } from '@src/components';
import { WelcomeScreenStyles as styles } from './WelcomeScreenStyles';
import usePushNotifications from '@src/utils/hooks/usePushNotifications';

export const WelcomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<TRootNavigatorParams>>();
  const [t] = useTranslation();
  usePushNotifications();

  const navigateLoginScreen = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  const navigateToLocationScreen = useCallback(() => {
    navigation.navigate('Assessment');
  }, [navigation]);

  const Header = (
    <View style={styles.header}>
      <SafeAreaView style={styles.headerInner} edges={['top']}>
        <Image
          source={require('../assets/bootsplash_logo.png')}
          style={styles.brand}
        />
        <Text
          typography="largeTitle"
          fontWeight="extraBold"
          style={styles.headerText}>
          {t('welcome.hireHomeHelp')}
        </Text>
      </SafeAreaView>
    </View>
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://media.istockphoto.com/id/1807336346/pl/zdj%C4%99cie/ojciec-i-syn-je%C5%BCd%C5%BC%C4%85-na-rowerach-po-mie%C5%9Bcie-rodzinna-jazda-na-rowerze-rozmowa-ojca-z-synem.jpg?s=1024x1024&w=is&k=20&c=tqV1bJtED-tqwQLL7nlVJVUkaY_fO6_Ul7WAFF7S6rY=',
      }}
      resizeMode="cover"
      style={styles.imageBackground}>
      <View style={styles.container}>
        {Header}
        <Text typography="title2" fontWeight="bold" style={styles.title}>
          {t('welcome.findHomeHelp')}
        </Text>
        <View style={styles.subContainer}>
          <Button
            buttonStyle={styles.button}
            title={t('welcome.start')}
            onPress={navigateToLocationScreen}
          />
          <View style={styles.row}>
            <Text
              typography="body"
              fontWeight="medium"
              style={styles.paragraph}>
              {t('welcome.alreadyHaveAccount')}
            </Text>
            <Link
              text={t('common.login')}
              color={commonColors.commonWhite}
              onPress={navigateLoginScreen}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
