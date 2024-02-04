import React, { useCallback } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import i18n from 'i18next';

import { AdListScreen } from '@src/Ad/AdList/AdListScreen';
import { AdCreateScreen } from '@src/Ad/AdCreate/AdCreateScreen';
import { SettingsScreen } from '@src/Settings/SettingsScreen/SettingsScreen';
import { useBottomNavDef } from './useBottomNavDef';
import { CustomTabBar } from './CustomTabBar';

export type TBottomTabsNavigatorParams = {
  AdList: undefined;
  AdCreate: TAdCreateParams;
  Settings: undefined;
};

export type TAdCreateParams = {
  latitude: number | undefined;
  longitude: number | undefined;
  address: string | undefined;
};

const BottomTabs = createBottomTabNavigator<TBottomTabsNavigatorParams>();

export const BottomTabsNavigator = () => {
  const bottomNavDef = useBottomNavDef();

  const renderTabBar = useCallback(
    ({ state }: BottomTabBarProps) => {
      const tabs = bottomNavDef.map(r => ({
        routeName: r.routeName,
        isFocused: r.routeName === state.routes[state.index].name,
        label: r.label,
      }));
      return <CustomTabBar tabs={tabs} />;
    },
    [bottomNavDef],
  );

  return (
    <BottomTabs.Navigator
      tabBar={renderTabBar}
      >
      <BottomTabs.Screen
        name={bottomNavDef[0].routeName}
        component={AdListScreen}
        options={{
          title: i18n.t('adList.screenTitle')
        }}
      />
      <BottomTabs.Screen
        name={bottomNavDef[1].routeName}
        component={AdCreateScreen}
        options={{headerShown: false}}
      />
      <BottomTabs.Screen
        name={bottomNavDef[2].routeName}
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </BottomTabs.Navigator>
  );
};
