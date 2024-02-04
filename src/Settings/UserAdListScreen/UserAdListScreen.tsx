import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import i18n from 'i18next';

import { FullScreenTemplate, ListItem, spacing } from '@src/components';
import { TNavParams } from '@src/navigation/RootNavigator';

import { AdDto } from '../../Ad/ad.dto';


interface IProps {
  previousScreen: string;
  ads?: AdDto.AdDetails[];
}

export const UserAdListScreen = ({ previousScreen, ads }: IProps) => {
  const navigation = useNavigation<NavigationProp<TNavParams, "UserAdList">>();
  

  const navigateToAd = () => {
    console.log('NAV');
  };

  const renderItem = ({ item }: { item: AdDto.AdDetails }) => (
    <ListItem
      rightComponent="chevron"
      title={i18n.t('settings.yourAds')}
      onPress={navigateToAd}
      raised
      style={styles.listItem}
    />
  );

  return (
    <FullScreenTemplate safeArea paddedHotizontaly noScroll contentContainerStyle={{backgroundColor: '#e2e2e2'}}>
      <FlatList
          keyExtractor={item => item.id}
          data={ads}
          renderItem={renderItem}
        />
    </FullScreenTemplate>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: spacing.small,
  },
});
