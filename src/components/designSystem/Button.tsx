import React, { useMemo } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  StyleSheet,
  View,
  GestureResponderEvent,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Spinner } from '../Spinner';

import { commonColors } from './colors';
import { spacing } from './spacing';
import { Text } from './Text/Text';

interface IButton extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'FULLWIDTH';
  isFullWidth?: boolean;
  isLoading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
}

const getBtnStyle = (
  variant: NonNullable<IButton['variant']>,
  isDisabled: boolean,
) => {
  if (variant === 'PRIMARY') {
    return isDisabled ? styles.btn_primary_disabled : styles.btn_primary;
  } else if (variant === 'SECONDARY') {
    return isDisabled ? styles.btn_secondary_disabled : styles.btn_secondary;
  } else {
    return isDisabled ? styles.btn_tertiary_disabled : styles.btn_tertiary;
  }
};

export const Button = ({
  title,
  disabled = false,
  variant = 'PRIMARY',
  isFullWidth = true,
  accessibilityRole,
  activeOpacity,
  isLoading,
  buttonStyle,
  titleStyle,
  onPress,
  ...touchableOpacityProps
}: IButton) => {
  const btnStyle = useMemo(
    () => getBtnStyle(variant, disabled || false),
    [variant, disabled],
  );
  const widthStyle = useMemo(
    () => (isFullWidth ? { width: '100%' } : {}),
    [isFullWidth],
  );

  const onPressHandler = (e: GestureResponderEvent) => {
    !isLoading && onPress && onPress(e);
  };

  return (
    <TouchableOpacity
      style={[styles.btn, btnStyle, widthStyle, buttonStyle]}
      accessibilityRole={accessibilityRole || 'button'}
      activeOpacity={activeOpacity || 0.7}
      disabled={disabled}
      onPress={onPressHandler}
      {...touchableOpacityProps}>
      <>
        {isLoading && (
          <View style={styles.loader}>
            <Spinner
              color={variant === 'PRIMARY' ? commonColors.secondary : commonColors.primary}
            />
          </View>
        )}

        {!isLoading && (
          <Text
            color={
              variant === 'PRIMARY'
                ? 'textPrimary'
                : variant === 'SECONDARY'
                ? 'textSecondary'
                : 'tertiaryButtonText'
            }
            typography="subhead"
            fontWeight="semiBold">
            {title}
          </Text>
        )}
      </>
    </TouchableOpacity>
  );
};

type Tstyles = Record<
  | 'title'
  | 'btn'
  | 'btn_primary'
  | 'btn_secondary'
  | 'btn_tertiary'
  | 'btn_primary_disabled'
  | 'btn_secondary_disabled'
  | 'btn_tertiary_disabled'
  | 'loader',
  ViewStyle | TextStyle
>;

const stylesDef: Tstyles = {
  title: {
    color: commonColors.commonWhite,
  },
  btn: {
    borderWidth: 1,
    borderRadius: spacing.small,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  btn_primary: {
    backgroundColor: commonColors.primary,
    borderColor: commonColors.primary,
  },
  btn_secondary: {
    backgroundColor: commonColors.secondary,
    borderColor: commonColors.secondary,
  },
  btn_tertiary: {
    backgroundColor: commonColors.tertiaryButtonBackground,
    borderColor: commonColors.tertiaryButtonBackground,
  },
  btn_primary_disabled: {
    backgroundColor: commonColors.navyBlue100,
    borderColor: commonColors.navyBlue100,
  },
  btn_secondary_disabled: {
    backgroundColor: commonColors.navyBlue100,
    borderColor: commonColors.navyBlue100,
  },
  btn_tertiary_disabled: {
    backgroundColor: commonColors.navyBlue100,
    borderColor: commonColors.navyBlue100,
  },
  loader: {
    position: 'absolute',
    zIndex: 2,
  },
};

const styles = StyleSheet.create(stylesDef);
