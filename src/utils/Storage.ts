import Keychain from 'react-native-keychain';
import { MMKV } from 'react-native-mmkv';
import Config from 'react-native-config';

type TSetString = (key: string, value: string) => Promise<void>;
type TGetString = (key: string) => Promise<string | undefined>;
type TRemoveString = (key: string) => Promise<void>;

const storage = new MMKV();

const writeSecure: TSetString = async (key, value) => {
  const keychainKey = await getKeychainKey(key);
  if (!value) {
    if (await readSecure(keychainKey)) {
      await clearSecure(key);
    }
    return;
  }
  await Keychain.setGenericPassword(Config.APP_ENV, value, {
    service: keychainKey,
  });
};

const readSecure: TGetString = async key => {
  const keychainKey = await getKeychainKey(key);
  const result = await Keychain.getGenericPassword({ service: keychainKey });
  if (result) {
    return result.password;
  }
  return undefined;
};

const clearSecure: TRemoveString = async key => {
  const keychainKey = await getKeychainKey(key);
  await Keychain.resetGenericPassword({ service: keychainKey });
};

const KEYCHAIN_SALT = 'KEYCHAIN_SALT';

const getKeychainKey = async (key: string) => {
  const salt = await getKeychainKeySalt();
  return `${key}_${salt}`;
};

const getKeychainKeySalt = async () => {
  const salt = await storage.getString(KEYCHAIN_SALT);
  if (salt) {
    return salt;
  } else {
    await clearKeychain();
    const newSalt = generateKeychainSalt();
    await storage.set(KEYCHAIN_SALT, newSalt);
    return newSalt;
  }
};

const clearKeychain = async () => {
  const services = await Keychain.getAllGenericPasswordServices();
  for (let service of services) {
    await Keychain.resetGenericPassword({ service });
  }
};

const generateKeychainSalt = () => {
  return Math.round(Math.random() * 10000).toString();
};

export const SecureStorage = {
  write: writeSecure,
  read: readSecure,
  clear: clearSecure,
};

export const buildSecureStorage = (key: string) => ({
  write: (value: string) => writeSecure(key, value),
  read: () => readSecure(key),
  clear: () => clearSecure(key),
  clearAll: () => clearKeychain(),
});
