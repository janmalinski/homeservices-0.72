import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

import { commonColors } from './colors';
export interface IIconProps {
  name: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const Icon = ({
  name,
  color = commonColors.primary,
  size,
  style,
  onPress,
}: IIconProps) => (
  <IonIcon
    name={name}
    color={color}
    size={size}
    style={style}
    onPress={onPress}
  />
);
