import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const saveString = (key: string, value: any) => {
    try {
      storage.set(key, value);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  export const save = async (key: string, value: any) =>
    saveString(key, JSON.stringify(value));
  
  export const get = (key: string) => {
    try {
      const itemString = storage.getString(key);
      if (itemString) {
        return JSON.parse(itemString);
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  
  export default {
    saveString,
    save,   
    get,
  };