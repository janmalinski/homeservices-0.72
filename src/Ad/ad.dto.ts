import { ChatDto } from '@src/Chat/chat.dto';
import { UserDto } from '@src/User/user.dto';

export namespace AdDto {
  export type Service = {
    id: string;
    name: string;
  };

  export type TypeOfEmployment = {
    id: string;
    name: string;
  };

  export type AdDetails = {
    id: string;
    userId: string;
    description: string;
    services: Service[];
    typesOfEmployment: TypeOfEmployment[];
    latitude: number;
    longitude: number;
    address: string;
    createdAt: string;
    availableFrom: string;
    availableTo: string;
    workingTimeNegotiable: boolean;
    workingTime: UserDto.AvailabilityTime[];
    availability: {
      negotiable: boolean;
      time: UserDto.AvailabilityTime[];
    };
    rooms: ChatDto.Room[];
  };
}
