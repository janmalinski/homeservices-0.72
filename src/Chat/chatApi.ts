import { protectedApi } from '@src/Api/protectedApi';
import { ChatDto } from './chat.dto';

type TCheckOrCreateRoom = (adId: string, authorId: string, userId: string, roomId?: string) => Promise<{roomId: string; authorId: string; userId: string}>;

type TGetMessages = (roomId: string) => Promise<ChatDto.Message[]>;

type TPostMessage = (text: string, roomId: string, senderId: string, receiverId: string, adId: string, authorOfRoom: string, userOfRoom: string
   ) => Promise<any>;

export const checkOrCreateRoom: TCheckOrCreateRoom = async( adId, authorId, userId, roomId) => {
  const response = await protectedApi.post(`/room/${adId}/${authorId}/${userId}/${roomId}`);
  return response.data;
} 

export const getMessages: TGetMessages = async(roomId: string) => {
  const response = await protectedApi.get(`/room/${roomId}/messages`);
  return response.data.messages;
};

export const postMessage: TPostMessage = async(text, roomId, senderId, receiverId, adId, authorOfRoom, userOfRoom) => {
  const response = await protectedApi.post(`/room/${roomId}`, {
        text,
        senderId,
        receiverId,
        adId,
        authorOfRoom,
        userOfRoom
      });
  return response;
};
