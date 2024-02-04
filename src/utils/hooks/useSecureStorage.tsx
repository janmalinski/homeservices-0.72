import { useState, useEffect, useCallback } from 'react';
import { SecureStorage } from '../Storage';

function useReadSecureStorage(key: string) {
  const [val, setVal] = useState<string>('');

  const getValue = useCallback(async () => {
    const value = await SecureStorage.read(key);
    if (value && value?.length > 0) {
      setVal(value);
    }
  }, [key]);

  useEffect(() => {
    getValue();
  }, [getValue]);

  return val;
};

export { useReadSecureStorage };
