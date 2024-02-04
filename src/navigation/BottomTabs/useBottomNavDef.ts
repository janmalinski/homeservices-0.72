import { useTranslation } from 'react-i18next';

import { TBottomTabsNavigatorParams } from './BottomTabsNavigator';

export const useBottomNavDef = () => {
  const [t] = useTranslation();

  const bottomNavDef: {
    routeName: keyof TBottomTabsNavigatorParams;
    label: string;
  }[] = [
    {
      routeName: 'AdList',
      label: t('adList.screenTitle'),
    },
    {
      routeName: 'AdCreate',
      label: t('adCreate.screenTitle'),
    },
    {
      routeName: 'Settings',
      label: t('settings.screenTitle'),
    },
  ];

  return bottomNavDef;
};
