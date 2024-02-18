import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import { t } from 'i18next';

import { WelcomeScreen } from '@src/Welcome/WelcomeScreen';
import { AssessmentScreen } from '@src/Assessment/AssessmentScreen';
import { MapScreen } from '@src/Map/MapScreen/MapScreen';
import { RegisterScreen } from '@src/Auth/Register/RegisterScreen';
import { VerifyRegistrationCodeScreen } from '@src/Auth/VerifyRegistrationCode/VerifyRegistrationCodeScreen';
import { LoginScreen } from '@src/Auth/Login/LoginScreen';
import { ResetPasswordScreen } from '@src/Auth/ResetPassword/ResetPasswordScreen';
import { AccountScreen } from '@src/Settings/AccountScreen/AccountScreen';
import { AdListScreen } from '@src/Ad/AdList/AdListScreen';
import {
  BottomTabsNavigator,
  TBottomTabsNavigatorParams,
} from './BottomTabs/BottomTabsNavigator';
import { InternetConnectionHandler } from '@src/Toast/InternetConnectionHandler';
import { GlobalToast } from '@src/Toast/GlobalToast';
import { useAppDispatch } from '@src/store';
import { defaultHeaderOptions } from './screenOptions';
import { commonColors } from '@src/components';
import AdDetailsScreen from '@src/Ad/AdDetails/AdDetailsScreen';
import { UserDto } from '@src/User/user.dto';
import { AdEditScreen } from '@src/Ad/AdEdit/AdEditScreen';
import { ChatScreen } from '@src/Chat/ChatScreen';
import { AuthorRoomListScreen } from '@src/Chat/AuthorRoomListScreen';
import { ChatDto } from '@src/Chat/chat.dto';
import { useLoadJWT } from '@src/utils/hooks/useLoadJWT';
import { showErrorToastAction } from '@src/Toast/toastStore';
import ManageThemeScreen from '@src/Settings/ManageThemeScreen/ManageThemeScreen';
import { logoutThunk } from '@src/Auth/authStore';

export type TMapScreenParams = {
  redirectAfterSubmit: 'Register' | 'AdCreate' | 'AdEdit' | 'Account';
  userRole?: {
    id: string;
    name: string;
  };
  ad?: any;
};
export interface IRegisterScreenParams
  extends Pick<TMapScreenParams, 'userRole'>,
    Pick<TCoordinates, 'latitude' | 'longitude'> {}

export type TCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export interface IAccount
  extends Partial<Pick<TCoordinates, 'latitude' | 'longitude'>> {
  address?: string;
}

export type TRootNavigatorParams = {
  Tabs: NavigatorScreenParams<TBottomTabsNavigatorParams>;
  ResetPassword: undefined;
  Assessment: undefined;
  Map: TMapScreenParams;
  Login: undefined;
  Register: IRegisterScreenParams;
  VerifyRegistrationCode: undefined;
  Welcome: undefined;
  AdMap: TMapScreenParams;
  Account: IAccount;
  AccountMap: TMapScreenParams;
  ManageTheme: undefined;
  UserAdList: undefined;
  AdDetails: {
    ad: UserDto.UserAd;
    isAuthor: boolean;
  };
  Chat: {
    adId: string;
    authorId: string;
    userId: string;
    roomId?: string;
    receiverId?: string;
  };
  AuthorRoomList: {
    rooms: ChatDto.Room[];
    userId: string;
  };
  AdEdit: {
    ad: UserDto.UserAd;
    latitude?: number;
    longitude?: number;
    address?: string;
  };
};

export type TNavParams = TRootNavigatorParams & TBottomTabsNavigatorParams;

const Root = createNativeStackNavigator<TRootNavigatorParams>();

export const dialogScreenOptions = {
  ...defaultHeaderOptions,
  headerShown: false,
  presentation: 'transparentModal',
  cardOverlayEnabled: true,
  cardStyleInterpolator: () => ({
    overlayStyle: {
      backgroundColor: commonColors.opacity,
    },
  }),
};

export const headerOptions = {
  title: '',
  headerBackTitle: '',
  headerTintColor: commonColors.textPrimary,
  headerShadowVisible: false,
};

const mapScreensOptions = {
  headerTransparent: true,
  title: '',
  headerBackTitleVisible: false,
  headerTintColor: commonColors.textPrimary,
};

export const RootNavigator = () => {
  const [appState, setAppState] = useState(AppState.currentState);

  const dispatch = useAppDispatch();

  const {accessToken,  accessTokenExpiresAt, refreshToken} = useLoadJWT();
  
  useEffect(() => {
    RNBootSplash.hide();
    const appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        if (
          appState.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          try {
             if (Number(accessTokenExpiresAt) > Math.floor(Date.now() / 1000)) {
              return false;
            } else if (
              Number(accessTokenExpiresAt) < Math.floor(Date.now() / 1000)
            ) {
              // LOGOUT_THUNK_ROOTNAVIGATOR
                dispatch(logoutThunk());
            }
          } catch (error) {
            console.log("ERROR_CHECK_ACCESS_TOKEN_EXPIRATION", error)
            dispatch(
              showErrorToastAction({ message: t('common.somethingWentWrong') }),
            );
          }
        }
        setAppState(nextAppState);
      },
    );
    return () => appStateSubscription.remove();
  }, [appState, dispatch, accessTokenExpiresAt, showErrorToastAction, setAppState]);

  const welcomeScreens = (
    <>
      <Root.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen
        name="Assessment"
        component={AssessmentScreen}
        options={headerOptions}
      />
      <Root.Screen
        name="Map"
        component={MapScreen}
        options={mapScreensOptions}
      />
      <Root.Screen
        name="Register"
        component={RegisterScreen}
        options={headerOptions}
      />
      <Root.Screen
        name="VerifyRegistrationCode"
        component={VerifyRegistrationCodeScreen}
        options={{ headerShown: false }}
      />
      <Root.Screen name="Login" component={LoginScreen} />
      <Root.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={headerOptions}
      />
    </>
  );

  const authorizedScreens = (
    <>
      <Root.Screen
        name="Tabs"
        component={BottomTabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="AdMap"
        component={MapScreen}
        options={mapScreensOptions}
      />
      <Root.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('settings.screenTitle'),
          headerTintColor: commonColors.commonBlack,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AccountMap"
        component={MapScreen}
        options={mapScreensOptions}
      />
       <Root.Screen
        name="ManageTheme"
        component={ManageThemeScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('settings.screenTitle'),
          headerTintColor: commonColors.commonBlack,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="UserAdList"
        component={AdListScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('settings.screenTitle'),
          headerTintColor: commonColors.commonBlack,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AdDetails"
        component={AdDetailsScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('userAdList.screenTitle'),
          headerTintColor: commonColors.commonBlack,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('adDetails.screenTitle'),
          headerTintColor: commonColors.commonBlack,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AuthorRoomList"
        component={AuthorRoomListScreen}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackTitle: t('adDetails.screenTitle'),
          headerTintColor: commonColors.commonBlack,
          headerShadowVisible: false,
        }}
      />
      <Root.Screen
        name="AdEdit"
        component={AdEditScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </>
  );

  return (
    
      <NavigationContainer>
        <Root.Navigator initialRouteName="Welcome">
        {accessToken?.length > 0 ? authorizedScreens : welcomeScreens}
        </Root.Navigator>
        <GlobalToast />
        <InternetConnectionHandler />
      </NavigationContainer>
  );
};
