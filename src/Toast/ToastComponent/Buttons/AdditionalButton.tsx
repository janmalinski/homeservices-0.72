import React from 'react';
import { Pressable } from 'react-native';

import { Text } from '@src/components';
import styles from '../Styles';

export const AdditionalButton = (props: {
  text: string | undefined;
  onPress: () => void;
}) => {
  const { onPress, text } = props;
  if (!onPress || !text) {
    return null;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        pressed ? styles.buttonContainerActive : undefined,
      ]}
      onPress={onPress}>
      <Text typography="subhead" color="primary" textDecorationLine="underline">
        {text}
      </Text>
    </Pressable>
  );
};
