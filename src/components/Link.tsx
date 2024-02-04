import { StyleProp, StyleSheet,TextStyle,TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Colors } from './designSystem/colors';
import { spacing } from './designSystem/spacing';
import { Text } from './designSystem/Text/Text';

interface ILinkProps {
  text: string;
  color: keyof Colors;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
}

export const Link = ({text, color, onPress}: ILinkProps) => {
  const [t] = useTranslation();
  return (
    <TouchableOpacity style={[styles.linkContainer, {borderBottomColor: color}]} onPress={onPress}>
      <Text
        typography="body"
        fontWeight="medium"
        style={[styles.paragraph, {color}]}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  linkContainer: {
    marginLeft: 3,
    borderBottomWidth: 1,
    height: 16
  },
  paragraph: {
    lineHeight: spacing.large,
  },
});
