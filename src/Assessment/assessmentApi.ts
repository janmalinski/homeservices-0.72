import { publicApi } from '@src/Api/publicApi';

export const getRoles = async () => {
  const data = await publicApi.get('/role')
  return data;
};

export const getTypesOfEmployment = async () => {
  const data = await publicApi.get('/typeemployment');
  return data;
};
