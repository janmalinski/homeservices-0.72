import { useAppSelector } from '@src/store';
import { useCallback, useEffect, useState } from 'react';
import { SecureStorage } from '../Storage';

export const useLoadJWT = () => {
  const isUserAuthenticated = useAppSelector(
    state => state.auth.authenticated,
  );

  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [accessTokenExpiresAt, setAccessTokenExpiresAt] = useState<string>('');

  const getDataFromStorage = useCallback(async () => {
    const accessToken = await SecureStorage.read('ACCESS_TOKEN');
    const refreshToken = await SecureStorage.read('REFRESH_TOKEN');
    const accessTokenExpiresAt = await SecureStorage.read('ACCESS_TOKEN_EXPIRES_AT');

    if (accessToken && accessToken.length > 0) {
      setAccessToken(accessToken);
    } else {
      setAccessToken('');
    }
    if (refreshToken && refreshToken.length > 0) {
      setRefreshToken(refreshToken);
    } else {
      setRefreshToken('');
    }
    if (accessTokenExpiresAt && accessTokenExpiresAt.length > 0) {
      setAccessTokenExpiresAt(accessTokenExpiresAt);
    } else {
      setAccessTokenExpiresAt('');
    }
  }, []);

  useEffect(() => {
    if (isUserAuthenticated === true || isUserAuthenticated === false) {
      getDataFromStorage();
    }
  }, [isUserAuthenticated, getDataFromStorage]);

  return {
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
  };
};
