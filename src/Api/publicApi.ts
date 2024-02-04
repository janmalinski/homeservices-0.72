import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

export const API_URL = Config.API_URL;

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
});
