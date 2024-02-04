import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import ImagePicker, { Options } from 'react-native-image-crop-picker';

import { Icon } from '@src/components';
import { commonColors, spacing } from '@src/components';

import { Avatar } from '@src/components';
import { useAppDispatch, useAppSelector } from '@src/store';
import { uploadUserAvatarThunk } from '@src/User/userStore';
import URL from '@src/helpers/domainUrlWithoutLastSlash';

const imageOptions: Options = {
  width: 512,
  height: 512,
  compressImageQuality: 0.8,
  cropping: true,
  cropperCircleOverlay: true,
  multiple: false,
};

interface IUserProfilePicturePickerProps {
  initialImageURL?: string;
}

export const UserProfilePicturePicker = ({
  initialImageURL,
}: IUserProfilePicturePickerProps) => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(initialImageURL);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);

  useEffect(() => {
    if(user?.avatarUrl !== null){
      setImageURL(URL + user?.avatarUrl);
    }
  }, [user]);

  const openPicker = useCallback(async () => {
    try {
      const result = await ImagePicker.openPicker(imageOptions);
      const image = Array.isArray(result) ? result[0] : result;
      setLoading(true);
      const avatarUri = image.path;
      setImageURL(avatarUri);
      dispatch(uploadUserAvatarThunk(avatarUri));
    } catch (error) {
      /* eslint-disable no-console */
      console.log('openPickewrError', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Avatar uri={imageURL} loading={loading} editable />
      <Icon
        size={28}
        name="pencil"
        color={commonColors.gray}
        style={styles.iconContainer}
        onPress={openPicker}
      />
    </View>
  );
};

interface IStyles {
  container: ViewStyle;
  iconContainer: ViewStyle;
}

const stylesDef: IStyles = {
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    borderRadius: 30,
    top: spacing.regular,
    left: '58%',
  },
};

const styles = StyleSheet.create(stylesDef);
