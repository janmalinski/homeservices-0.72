import { protectedApi } from '@src/Api/protectedApi';
import { UserDto } from './user.dto';

type TGetUser = () => Promise<UserDto.userDetails>;
export const getUser: TGetUser = async () => {
  const response = await protectedApi.get('/user');
  return response.data.user;
};

type TUploadUserAvatar = (avatar: string) => Promise<UserDto.userAvatarDetails>;

export const uploadUserAvatar: TUploadUserAvatar = async avatar => {
  const formData = new FormData();
  formData.append('avatar', {
    uri: avatar,
    name: 'avatar.jpg',
    type: 'image/jpg',
  });
  const response = await protectedApi.post('/user/upload-avatar', formData);
  return response.data;
};

type TUpdateUser = (args: {
  name: string;
  phoneNumber: string;
  phoneNumberConsent: boolean;
  email: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
}) => Promise<UserDto.userDetails>;

export const updateUser: TUpdateUser = async ({
  name,
  phoneNumber,
  phoneNumberConsent,
  email,
  address,
  latitude,
  longitude,
}) => {
  const response = await protectedApi.patch('/user/update', {
    name,
    phoneNumber,
    phoneNumberConsent,
    email,
    address,
    latitude,
    longitude,
  });
  return response.data;
};
