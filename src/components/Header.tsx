import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { spacing } from './designSystem/spacing';
import { Text } from './designSystem/Text/Text';

interface IProps {
    title: string;
    description? : string;
    titleStyles?: StyleProp<ViewStyle>;
};

export const Header = ({title, description, titleStyles}: IProps) => {
  return (
    <View style={styles.container}>
      <Text typography="title3" style={titleStyles}>{title}</Text>
      {description && <Text typography="caption3">{description}</Text>}
    </View>
  )
};

interface IStyles {
    container: ViewStyle;
}

const stylesDef: IStyles = {
    container: {
        justifyContent: 'center',
        height: 70,
        paddingHorizontal: spacing.large
    }
};

const styles = StyleSheet.create(stylesDef)


