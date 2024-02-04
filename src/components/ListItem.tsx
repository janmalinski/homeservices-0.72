import React, { useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';

import { commonColors, Text, textStyles, spacing, Avatar } from './index';

import { Icon, IIconProps } from './designSystem/Icon';
import { AdDto } from '@src/Ad/ad.dto';

export interface ListItemProps {
  title?: string;
  subtitle?: string;
  raised?: boolean;
  border?: boolean;
  leftComponent?: 'avatar' | 'icon';
  rightComponent?: 'chevron' | 'close';
  avatarUri?: string;
  icon?: IIconProps;
  titleNumberOfLines?: number;
  subtitleNumberOfLines?: number;
  style?: StyleProp<ViewStyle>;
  onPress: (item?: AdDto.AdDetails) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  raised,
  leftComponent,
  rightComponent,
  avatarUri,
  icon,
  titleNumberOfLines,
  subtitleNumberOfLines,
  style,
  onPress,
}) => {

  const pressItem = useCallback(
    () => onPress(),
    [onPress]
  );

  return (
    <TouchableOpacity
      style={[styles.container, style, raised && styles.raised]}
      onPress={pressItem}>
      {leftComponent === 'avatar' && avatarUri && <Avatar uri={avatarUri} />}

      {leftComponent === 'icon' && icon && (
        <Icon name={icon.name} color={commonColors.commonBlack} size={28} />
      )}

      <View
        style={
          (leftComponent && styles.textContainerLeftPadding,
          styles.textContainerRightPadding)
        }>
        {title && <Text numberOfLines={titleNumberOfLines} typography="body">{title}</Text>}
        {subtitle && <Text numberOfLines={subtitleNumberOfLines} typography="caption1">{subtitle}</Text>}
      </View>

      {rightComponent === 'chevron' && (
        <Icon
          name="chevron-forward-outline"
          color={commonColors.commonBlack}
          size={28}
          style={styles.rightIcon}
        />
      )}

      {rightComponent === 'close' && (
        <Icon
          name="close-outline"
          color={commonColors.commonBlack}
          size={28}
          style={styles.rightIcon}
        />
      )}

      {/*
      {rightComponent === 'switch' && switchProps && <Switch {...switchProps} />} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.tiny,
    backgroundColor: commonColors.gray90,
    paddingHorizontal: spacing.regular,
    paddingVertical: 11,
    minHeight: 52,
  },
  textContainerLeftPadding: {
    paddingLeft: spacing.regular,
  },
  textContainerRightPadding: {
    paddingRight: spacing.large,
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
  },
  raised: {
    shadowColor: commonColors.commonBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  //   border: {
  //     borderWidth: 1,
  //     borderRadius: 4,
  //     color: palette.ListItem.default.border,
  //   },
  //   line: {
  //     borderBottomWidth: 1,
  //     borderBottomColor: palette.ListItem.default.line,
  //   },
  //   avatar: {
  //     width: 36,
  //     height: 36,
  //   },
  //   title: {
  //     ...typography.subtitle2,
  //   },
  //   subtitle: {
  //     ...typography.caption,
  //     color: palette.ListItem.default.subtitle,
  //   },
});
