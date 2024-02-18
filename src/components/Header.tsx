import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle, TextStyle } from 'react-native';
import { spacing } from './designSystem/spacing';
import { Text } from './designSystem/Text/Text';

interface IProps {
    title: string;
    description? : string;
    titleStyles?: StyleProp<TextStyle>;
    centered?: boolean;
};

export const Header = ({title, description, titleStyles, centered}: IProps) => {
  return (
    <View style={[centered ? styles.centeredContainer : styles.leftContainer]}>
      <Text typography="title3" style={titleStyles}>{title}</Text>
      {description && <Text typography="caption3">{description}</Text>}
    </View>
  )
};

interface IStyles {
  centeredContainer: ViewStyle;
  leftContainer: ViewStyle;
}

const stylesDef: IStyles = {
    centeredContainer: {
        justifyContent: 'center',
        height: 70,
        paddingHorizontal: spacing.large
    },
    leftContainer: {
      justifyContent: 'flex-start',
      height: 70,
      paddingHorizontal: spacing.large
    }
};

const styles = StyleSheet.create(stylesDef)


