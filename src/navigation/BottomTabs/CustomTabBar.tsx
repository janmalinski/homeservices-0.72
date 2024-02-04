import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Text, Icon, commonColors, spacing } from '@src/components';
import { TBottomTabsNavigatorParams } from './BottomTabsNavigator';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

const getTabBarIconName = (routeName: keyof TBottomTabsNavigatorParams) => {
  switch (routeName) {
    case 'AdList':
      return 'list-outline';
    case 'AdCreate':
      return 'create-outline';
    case 'Settings':
      return 'settings-outline';
    default:
      throw new Error(`cannot find TabBarIcon of ${routeName}`);
  }
};

const TAB_BAR_HEIGHT = 50;

export const useCustomTabBarHeight = () => {
  const { bottom } = useSafeAreaInsets();
  return bottom + TAB_BAR_HEIGHT;
};

type TCustomTabBar = {
  tabs: {
    label: string;
    routeName: keyof TBottomTabsNavigatorParams;
    isFocused: boolean;
  }[];
};

export const CustomTabBar = ({ tabs }: TCustomTabBar) => {
  const { bottom } = useSafeAreaInsets();
  const navigation =
    useNavigation<
      BottomTabNavigationProp<TBottomTabsNavigatorParams, 'AdList', 'AdCreate'>
    >();

  return (
    <View style={styles.tabBarWrapper}>
      <View style={styles.tabBarContainer}>
        {tabs.map(({ label, routeName, isFocused }) => {
          const iconName = getTabBarIconName(routeName);

          const onPress = () => {
            navigation.navigate(routeName);
          };

          return (
            <TouchableOpacity
              key={routeName}
              style={styles.tabBarItem}
              onPress={onPress}>
              <Icon
                name={iconName}
                size={18}
                color={isFocused ? commonColors.textTitle : commonColors.primary}
              />
              <View style={styles.tabBarLabelContainer}>
                <Text
                  color={isFocused ? 'textTitle' : 'primary'}
                  textAlign="center"
                  typography="caption1"
                  fontWeight="medium">
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={{ height: bottom }} />
    </View>
  );
};

interface IStyles {
  tabBarWrapper: ViewStyle;
  tabBarContainer: ViewStyle;
  tabBarItem: ViewStyle;
  tabBarLabelContainer: ViewStyle;
}

const stylesDef: IStyles = {
  tabBarWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
    backgroundColor: commonColors.disabled,
    overflow: 'hidden',
    elevation: 12,
    shadowRadius: 12,
    shadowColor: commonColors.shadowColor,
    shadowOffset: { height: -12, width: 0 },
    shadowOpacity: 0.04,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
  },
  tabBarItem: {
    paddingVertical: spacing.small,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabelContainer: {
    marginTop: 5,
  },
};

const styles = StyleSheet.create(stylesDef);
