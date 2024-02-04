import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';

import { FullScreenTemplate, ListItem, spacing } from '@src/components';
import { TNavParams } from '@src/navigation/RootNavigator';
import { UserDto } from '../../User/user.dto';
import { convertDate } from '@src/helpers/convertDate';
import { useAppDispatch } from '@src/store';
import { fetchAdsThunk } from '../adStore';
import { fetchUserThunk } from '@src/User/userStore';
import useRegisterFCMToken from '@src/utils/hooks/useRegisterFCMToken';

interface IProps {
  route: RouteProp<TNavParams, 'UserAdList' | 'AdList'>;
}

export const AdListScreen = ({ route }: IProps) => {
  const navigation =
    useNavigation<NavigationProp<TNavParams, 'UserAdList' | 'AdList'>>();
  const [ads, setAds] = useState<UserDto.UserAd[] | []>([]);
  const dispatch = useAppDispatch();
  useRegisterFCMToken();

  const setAllAds = useCallback(async () => {
    const allAds = await dispatch(fetchAdsThunk()).unwrap();
    if (allAds) {
      setAds(allAds);
    }
  }, [setAds, dispatch]);

  const getUser = async() => {
    return await dispatch(fetchUserThunk()).unwrap();
  } 

  const setUserAds = useCallback(async (user:UserDto.userDetails) => {
    if (user) {
      setAds(user.ads);
    }
  }, [setAds, dispatch]);

  const triggerOnFocus = useCallback(async () => {
    const user = await getUser();
    if (route.name === 'AdList') {
      setAllAds();
    } else if(user) {
      setUserAds(user);
    }
  }, [route.name, setAllAds, setUserAds]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', triggerOnFocus);
    return unsubscribe;
  }, [navigation, triggerOnFocus]);

  const navigateToAd = useCallback(
    (ad: UserDto.UserAd) => {
      navigation.navigate('AdDetails', {
        ad,
        isAuthor: route.name === 'UserAdList',
      });
    },
    [navigation, route.name],
  );

  const renderItem = ({ item }: { item: UserDto.UserAd }) => (
    <ListItem
      rightComponent="chevron"
      title={item.description}
      subtitle={convertDate(item.createdAt)}
      onPress={() => navigateToAd(item)}
      raised
      titleNumberOfLines={1}
      subtitleNumberOfLines={1}
      style={styles.listItem}
    />
  );

  return (
    <FullScreenTemplate safeArea paddedHotizontaly noScroll>
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
