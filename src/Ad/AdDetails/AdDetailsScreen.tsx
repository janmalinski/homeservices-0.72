import { HeaderBackButton } from '@react-navigation/elements';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {
  commonColors,
  FullScreenTemplate,
  Icon,
  Image,
  spacing,
  Text,
  textStyles,
} from '@src/components';
import { convertDate } from '@src/helpers/convertDate';
import URL from '@src/helpers/domainUrlWithoutLastSlash';
import { TNavParams } from '@src/navigation/RootNavigator';
import { useAppDispatch, useAppSelector } from '@src/store';
import { fetchUserThunk } from '@src/User/userStore';
import TimeOfDayCheckboxes from '../TimeOfDayCheckboxes';

interface IProps {
  route: RouteProp<TNavParams, 'AdDetails'>;
  navigation: NavigationProp<TNavParams, 'AdDetails'>;
}

const AdDetailsScreen = ({ route, navigation }: IProps) => {
  const [t] = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const avatarUri = URL + user?.avatarUrl;

  const {
    id,
    address,
    description,
    availability,
    availableFrom,
    availableTo,
    services,
    typesOfEmployment,
    createdAt,
    userId,
    rooms,
  } = route.params.ad;

  const { isAuthor } = route.params;

  useEffect(() => {
    dispatch(fetchUserThunk());
    navigation.setOptions({
      headerRight: () =>
        isAuthor ? (
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={editAd}>
              <Icon
                name="create-outline"
                color={commonColors.commonBlack}
                size={20}
                style={styles.editIcon}
              />
            </TouchableOpacity>

            <Icon
              name="trash-outline"
              color={commonColors.commonBlack}
              size={20}
              onPress={() => deleteAd()}
            />
          </View>
        ) : (
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={navigateToChat}>
              <Icon
                name="chatbubble-ellipses-outline"
                color={commonColors.commonBlack}
                size={20}
              />
            </TouchableOpacity>
          </View>
        ),
      headerLeft: () => (
        <HeaderBackButton
          onPress={() =>
            isAuthor
              ? navigation.navigate('UserAdList')
              : navigation.navigate('AdList')
          }
        />
      ),
    });
  }, []);

  const deleteAd = useCallback(() => {
  }, [id]);

  const editAd = useCallback(() => {
    navigation.navigate('AdEdit', { ad: route.params.ad });
  }, [navigation, route.params.ad]);

  const navigateToChat = useCallback(() => {
    if (userId === user?.id && rooms.length > 0) {
      navigation.navigate('AuthorRoomList', { rooms, userId: user?.id });
    } else {
      navigation.navigate('Chat', {
        authorId: userId,
        userId: user?.id as string,
        adId: id,
      });
    };
  }, [navigation, user, id, rooms, userId]);

  return (
    <FullScreenTemplate paddedHotizontaly>
      <View style={styles.rowExpanded}>
        <View>
          <Text typography="body">
            {t('adDetails.published') + ': ' + convertDate(createdAt)}
          </Text>
          <Text typography="body">
            {t('adDetails.availableFrom') + ': ' + convertDate(availableFrom)}
          </Text>
          {availableTo && (
            <Text typography="body">
              {t('adDetails.availableTo') + ': ' + convertDate(availableTo)}
            </Text>
          )}
          {user?.phoneNumberConsent && (
            <Text typography="body">{user?.phoneNumber}</Text>
          )}
          <View style={styles.addressContainer}>
            <Text typography="body" style={styles.addressText}>
              {address}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={{ uri: avatarUri }}
            style={styles.avatarContainer as any}
          />
          <View style={[styles.nameContainer]}>
            <Text typography="body">{user?.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.row}>
          {services.map(item => (
            <Text
              key={item.id}
              typography="body"
              fontWeight="extraBold"
              style={styles.tag}>
              {item.name}
            </Text>
          ))}
        </View>
        <View style={styles.itemContainer}>
          <Text typography="body">{description}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text typography="body" style={styles.label}>
            {t('adDetails.typesOfEmployment')}:
          </Text>
          <View style={styles.row}>
            {typesOfEmployment.map((item, index) => (
              <Text key={item.id} typography="body">
                {item.name}
                {index !== typesOfEmployment.length - 1 && ','}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.itemContainer}>
          <Text typography="body" style={styles.label}>
            {t('adDetails.availability')}:
          </Text>
          {availability !== undefined && !availability?.negotiable ? (
            <TimeOfDayCheckboxes workingTime={availability?.time} />
          ) : (
            <Text typography="body">{t('adDetails.negotiable')}</Text>
          )}
        </View>
      </View>
    </FullScreenTemplate>
  );
};

export default AdDetailsScreen;

interface IStyles {
  addressText: TextStyle;
  addressContainer: ViewStyle;
  avatarContainer: ViewStyle;
  nameContainer: ViewStyle;
  iconsContainer: ViewStyle;
  editIcon: ViewStyle;
  row: ViewStyle;
  rowExpanded: ViewStyle;
  mainContainer: ViewStyle;
  label: TextStyle;
  itemContainer: ViewStyle;
  tag: ViewStyle;
}

const stylesDef: IStyles = {
  addressText: { flex: 1, width: 1 },
  addressContainer: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    marginRight: spacing.large,
  },
  editIcon: { marginRight: 15 },
  row: {
    flexDirection: 'row',
  },
  rowExpanded: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContainer: {
    paddingVertical: spacing.regular,
  },
  label: {
    ...textStyles.fontWeights.semiBold,
    color: commonColors.commonBlack,
    marginBottom: 4,
  },
  itemContainer: {
    paddingVertical: spacing.regular,
  },
  tag: {
    backgroundColor: commonColors.primary,
    borderRadius: spacing.large,
    padding: spacing.small,
    overflow: 'hidden',
  },
};

const styles = StyleSheet.create(stylesDef);
