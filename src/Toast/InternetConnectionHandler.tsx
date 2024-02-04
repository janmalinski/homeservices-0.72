import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@src/store';
import { hideGlobalToastAction, showErrorToastAction } from './toastStore';

export const InternetConnectionHandler = () => {
  const dispatch = useAppDispatch();
  const [t] = useTranslation();

  useEffect(() => {
    const netInSubscription = NetInfo.addEventListener(
      ({ isInternetReachable }) => {
        if (typeof isInternetReachable !== 'boolean') {
          return;
        }

        if (isInternetReachable) {
          dispatch(hideGlobalToastAction());
        } else {
          dispatch(
            showErrorToastAction({ message: t('common.noInternetConnection') }),
          );
        }
      },
    );

    return () => {
      netInSubscription();
    };
  }, [dispatch, t]);

  return null;
};
