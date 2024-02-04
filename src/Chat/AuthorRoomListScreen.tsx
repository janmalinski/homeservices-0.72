import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { TNavParams } from '@src/navigation/RootNavigator';
import { FullScreenTemplate, ListItem, spacing } from '@src/components';
import { ChatDto } from './chat.dto';
import { convertDate } from '@src/helpers/convertDate';

interface IProps {
  route: RouteProp<TNavParams, 'AuthorRoomList'>;
  navigation: NavigationProp<TNavParams, 'AuthorRoomList'>;
}

export const AuthorRoomListScreen = ({route, navigation}: IProps) => {

  const navigateToRoom = (item: ChatDto.Room) => {
    navigation.navigate('Chat', { authorId: item.room.author_id, userId: route.params.userId, adId: item.room.ad_id, roomId: item.room.id});
  }

  const renderItem = ({ item }: { item: ChatDto.Room }) => (
    <ListItem
      rightComponent="chevron"
      title={item.user.name}
      subtitle={convertDate(item.room.created_at)}
      onPress={() => navigateToRoom(item)}
      raised
      titleNumberOfLines={1}
      subtitleNumberOfLines={1}
      style={styles.listItem}
    />
  );
  
  return (
    <FullScreenTemplate
      safeArea
      paddedHotizontaly
      noScroll
    >
      <FlatList
        data={route.params.rooms}
        keyExtractor={item => item.room.id}
        renderItem={renderItem}
        />
    </FullScreenTemplate>
  )
};

const styles = StyleSheet.create({
  listItem: {
    marginVertical: spacing.small,
  },
});

