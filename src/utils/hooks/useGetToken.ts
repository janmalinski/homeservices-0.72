import { useAppSelector } from '@src/store';
import { useCallback, useEffect, useState } from 'react';
import { SecureStorage } from '../Storage';

export const useGetToken = () => {
  const isLoginStatusChanged = useAppSelector(
    state => state.auth.loginStatusChanged,
  );

  const [token, setToken] = useState<string>('');

  const getToken = useCallback(async () => {
    const accessToken = await SecureStorage.read('ACCESS_TOKEN');
    if (accessToken && accessToken.length > 0) {
      setToken(accessToken);
    } else {
      setToken('');
    }
  }, []);

  useEffect(() => {
    if (isLoginStatusChanged === true || isLoginStatusChanged === false) {
      getToken();
    }
  }, [isLoginStatusChanged, getToken]);

  return token;
};
