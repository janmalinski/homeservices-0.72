import { AdDto } from '@src/Ad/ad.dto';
import { ChatDto } from '@src/Chat/chat.dto';

export namespace UserDto {
  export type UserRoleItem = {
    id: string;
    name: string;
  };

  export type AvailabilityTime = {
    '06-09': boolean;
    '09-12': boolean;
    '12-15': boolean;
    '15-18': boolean;
    '18-21': boolean;
    '21-24': boolean;
    '24-03': boolean;
    '03-06': boolean;
  };

  export type UserAd = {
    id: string;
    userId: string;
    createdAt: string;
    description: string;
    availableFrom: string;
    availableTo: string;
    address: string;
    services: AdDto.Service[];
    typesOfEmployment: AdDto.TypeOfEmployment[];
    availability: {
      negotiable: boolean;
      time: AvailabilityTime[];
    };
    workingTimeNegotiable?: boolean;
    latitude: number;
    longitude: number;
    rooms: ChatDto.Room[];
  };

  export type userDetails = {
    id: string;
    email: string;
    name: string;
    phoneNumber: string | null;
    phoneNumberConsent: boolean | null;
    latitude: number | null;
    longitude: number | null;
    address: string;
    avatarUrl: string | null;
    ads: UserAd[];
    roles: UserRoleItem[];
  };

  export type userAvatarDetails = {
    avatarURL: string;
    message: string;
  };
}
