import React, { useCallback, useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Linking,
  Alert,
  ToastAndroid,
  View,
  Dimensions,
} from 'react-native';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useHeaderHeight } from '@react-navigation/elements';

import {
  TNavParams,
  TRootNavigatorParams,
} from '@src/navigation/RootNavigator';
import { Button, FullScreenTemplate, Spinner, Text } from '@src/components';
import { Map } from './Map';
import { MapInput } from './MapInput';
import { MapScreenStyles as styles } from './MapScreenStyles';
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';

export interface ICoordinates {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type TLatitudeLongitude = Pick<ICoordinates, 'latitude' | 'longitude'>;

const { height, width } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

export const MapScreen = () => {
  const [coordinates, setCoordinates] = useState<ICoordinates>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0028,
    longitudeDelta: 0.0028 * ASPECT_RATIO,
  });
  const [address, setAddress] = useState<string>('');
  const [addressChangedByInput, setAddressChangeByInput] = useState(false);

  const navigation =
    useNavigation<NavigationProp<TNavParams, 'Assessment', 'AdCreate'>>();

  const route = useRoute<RouteProp<TRootNavigatorParams, 'Map'>>();

  const [t] = useTranslation();

  const headerHeight = useHeaderHeight();

  const hasLocationPermissionIOS = useCallback(async () => {
    const openSettings = () => {
      Linking.openSettings().catch(() => {
        Alert.alert(t('map.unableOpenSettings'));
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');
    if (status === 'granted') {
      return true;
    }
    if (status === 'denied') {
      Alert.alert('adCreatelocationPermissionDenied');
    }
    if (status === 'disabled') {
      Alert.alert(t('map.locationDisabled'), '', [
        { text: t('map.goToSettings'), onPress: openSettings },
        {
          text: t('map.dontUseLocation'),
        },
      ]);
    }
    return false;
  }, [t]);

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasLocationPermissionIOS();
      return hasPermission;
    }
    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (hasPermission) {
      return true;
    }
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(t('map.locationPermissionDenied'), ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(t('map.locationPermisssionRevoked'), ToastAndroid.LONG);
    }
    return false;
  }, [hasLocationPermissionIOS, t]);

  const getLocation = useCallback(async () => {
    const hasLocationPermissionCheck = await hasLocationPermission();
    if (!hasLocationPermissionCheck) {
      return;
    }
    Geolocation.getCurrentPosition(
      async position => {
        const {
          coords: { latitude, longitude },
        } = position;
        const coords = {
          latitude,
          longitude,
          latitudeDelta: 0.0028,
          longitudeDelta: 0.0028 * ASPECT_RATIO,
        };
        setCoordinates(coords);
        const addressFromCoords = await getAddressFromCoords({
          latitude,
          longitude,
        });
        setAddress(addressFromCoords);
      },
      error => {
        // log error
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, [hasLocationPermission]);

  useEffect(() => {
    hasLocationPermission().then(() => getLocation());
    Geocoder.init(Config.GOOGLE_API_KEY as string);
  }, [getLocation, hasLocationPermission]);

  const getAddressFromCoords = async (coords: TLatitudeLongitude) => {
    const response = await Geocoder.from(coords);
    const str = response.results[0].formatted_address;
    const address = str
      .substring(str.indexOf(',') + 1, str.lastIndexOf(','))
      .trim();
    return address;
  };

  const handleAddressChange = (details: GooglePlaceDetail) => {
    const {
      geometry: {
        location: { lat, lng },
      },
    } = details;
    const coords = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0028,
      longitudeDelta: 0.0028 * ASPECT_RATIO,
    };
    setCoordinates(coords);
    setAddressChangeByInput(true);
  };

  const handleRegionChange = async (coords: ICoordinates) => {
    setCoordinates(coords);
    const { latitude, longitude } = coords;
    const addressFromCoords = await getAddressFromCoords({
      latitude,
      longitude,
    });
    setAddress(addressFromCoords);
  };

  const handleConfirmLocation = async () => {
    const { latitude, longitude } = coordinates;
    const { userRole, redirectAfterSubmit, ad } = route.params;
    if (redirectAfterSubmit === 'Register') {
      navigation.navigate('Register', {
        latitude,
        longitude,
        userRole,
      });
    } else if (redirectAfterSubmit === 'AdCreate') {
      navigation.navigate('AdCreate', {
        latitude,
        longitude,
        address,
      });
    } else if (redirectAfterSubmit === 'AdEdit') {
      navigation.navigate('AdEdit', {
        latitude,
        longitude,
        address,
        ad
      });
    } else if (redirectAfterSubmit === 'Account') {
      navigation.navigate('Account', {
        latitude,
        longitude,
        address,
      });
    }
  };
console.log("ADDRES_CHANGED_BY_INPUT", addressChangedByInput)
  const userType = route.params.userRole;
  return (
    <FullScreenTemplate noScroll>
      {coordinates.latitude === 0 && coordinates.longitude === 0 ? (
        <View style={styles.centeredContainer}>
          <Spinner />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={[styles.searchInputContainer, {top: headerHeight}]}>
            <View style={[styles.container, styles.questionContainer]}>
              <Text typography="title3" style={styles.questionText}>
                {userType?.name === 'Client'
                  ? t('map.whereAreYouLookingForHelp')
                  : t('map.whichAreYouWantToWork')}
              </Text>
            </View>
            <MapInput onAddressChange={addr => handleAddressChange(addr)} />
          </View>
          <Map
            // addressChangedByInput={addressChangedByInput}
            coordinates={[coordinates.longitude, coordinates.latitude]}
            // onRegionChange={handleRegionChange}
            // resetAddressChangedByInput={setAddressChangeByInput}
          />
          <View style={styles.bottomBox}>
            <Text typography="title3" style={styles.addressText}>
              {address}
            </Text>
            <Button
              title={t('map.confirmLocation')}
              onPress={handleConfirmLocation}
            />
          </View>
        </View>
      )}
    </FullScreenTemplate>
  );
};
