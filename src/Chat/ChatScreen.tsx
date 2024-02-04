import { StyleSheet, View, ScrollView, TextInput, Keyboard, Platform } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import io from 'socket.io-client';
import Config from 'react-native-config';

import { TNavParams } from '@src/navigation/RootNavigator';
import { getMessages, postMessage, checkOrCreateRoom } from './chatApi';
import { spacing, commonColors, Icon } from '@src/components';
import { ChatDto } from './chat.dto';
import { useKeyboardHeight } from '@src/utils/hooks/useKeyboardHeight';
import Chat from './Chat';

const TEXT_INPUT_HEIGHT = 40;

export const ChatScreen = () => {

  const [roomName, setRoomName] = useState('');
  const [receiverID, setReceiverID] = useState('');
  const [ authorOfRoom, setAuthorOfRoom] = useState('');
  const [ userOfRoom, setUserOfRoom] = useState('');
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [messages, setMessages] = useState<ChatDto.Message[] | []>([]);
  const [textMessage, setTextMessage] = useState('');
  const [extraMarginBottom, setExtraMarginBottom] = useState(false);
 
  const route = useRoute<RouteProp<TNavParams, 'Chat'>>();
  const scrollRef = useRef<ScrollView>(null);
  const socketRef = useRef<any>(undefined);

  const { bottom } = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
 
  const { adId, authorId, userId, roomId, receiverId } = route.params;

  const checkRoomMembersAndGetMessages = useCallback( async() => {
    let data;
    if(roomId){
      data = await checkOrCreateRoom(adId, authorId, userId, roomId);
      setCurrentRoomId(data.roomId)
      setRoomName(`${data.authorId}--with--${data.userId}`);
    } else {
      data = await checkOrCreateRoom(adId, authorId, userId);
      setCurrentRoomId(data.roomId)
      setRoomName(`${data.authorId}--with--${data.userId}`);
    }
    if(userId === data?.authorId) {
      setReceiverID(data?.userId)
    } else if(userId === data?.userId){
      setReceiverID(data?.authorId);
    }
    setAuthorOfRoom(data.authorId);
    setUserOfRoom(data.userId)
  }, [setRoomName, adId, authorId, userId, roomId]);

  const getData = useCallback( async() => {
    const data = await getMessages(currentRoomId as string);
      setMessages(data);
  }, [setMessages, currentRoomId]);

  useEffect(()=> {
    socketRef.current = io(Config.DOMAIN_URL);
    socketRef.current.connect();
    return () => socketRef.current.disconnect();
  }, []);
  
  useEffect(()=>{
      socketRef.current.on("onMessage", (message: ChatDto.Message) => {
      setMessages(prevState => [...prevState, message]);
      scrollRef.current?.scrollToEnd()
    });
    checkRoomMembersAndGetMessages();
  }, [checkRoomMembersAndGetMessages, socketRef, setMessages]);

  useEffect(() => {
    if(roomName !== ''){
      socketRef.current.emit('join', roomName);
      getData();
    }
  }, [roomName, getData])

  const sendMessage = async () => {
    if(textMessage !== ''){
      const res = await postMessage(textMessage, currentRoomId as string, receiverId || userId, receiverID, adId, authorOfRoom, userOfRoom);
      if(res.status === 200){
        const { message } = res.data;
        const data = {
          id: message.id,
          text: message.text,
          user_id: message.user_id,
          createdAt: message.createdAt
      };
        socketRef.current.emit('emitMessage', data);
        setMessages(prevState => [...prevState, data]);
        setTextMessage('');
        Keyboard.dismiss();
      }
  }
};

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: commonColors.commonWhite}}>
      <ScrollView ref={scrollRef} scrollIndicatorInsets={{ right: 1 }} onContentSizeChange={() => scrollRef.current?.scrollToEnd()}>
        <Chat messages={messages} userId={receiverId || userId} />
      </ScrollView>
      <View style={[styles.textInputContainer, {bottom}, Platform.OS === 'ios' && extraMarginBottom && {marginBottom: keyboardHeight - TEXT_INPUT_HEIGHT}]}>
        <TextInput
          style={styles.textInput}
          value={textMessage}
          onChangeText={setTextMessage}
          autoCapitalize="none"
          blurOnSubmit
          onFocus={()=> setExtraMarginBottom(true)}
        />
        <View style={styles.texInputIconContainer}>
          <Icon name="send-outline" size={20} color={commonColors.commonBlack} onPress={sendMessage} />
        </View>
    </View>
  </SafeAreaView>
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonColors.commonWhite
  },
  content: {
    flex:1,
    justifyContent: 'space-between',
    paddingBottom: spacing.xLarge,
    paddingHorizontal: spacing.large,
    backgroundColor: commonColors.commonWhite
  },
  messageText: {
    fontSize: 14,
    width: '40%',
    height: 'auto',
    borderRadius: spacing.regular,
    overflow: 'hidden',
    padding: spacing.small,
    marginVertical: spacing.xxxLarge,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  textInput: {
    flex: 0.9,
    backgroundColor: commonColors.blue400,
    height: 40,
    paddingHorizontal: spacing.small
  },
  texInputIconContainer: {
    flex: 0.1,
    backgroundColor: commonColors.blue400,
    height: '100%',
    justifyContent: 'center'
  }
})