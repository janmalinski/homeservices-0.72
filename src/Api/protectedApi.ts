import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';
import { SecureStorage } from '@src/utils';

export const API_URL = Config.API_URL;

const protectedApi: AxiosInstance = axios.create({
  baseURL: API_URL,
});

protectedApi.interceptors.request.use(
  async config => {
    let accessToken = await SecureStorage.read('ACCESS_TOKEN');

    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    } else {
      throw new Error(
        'accessToken was not provided by protected api' + config.url,
      );
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export { protectedApi };
