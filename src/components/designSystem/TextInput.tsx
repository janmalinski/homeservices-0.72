import React, { useState, useCallback, useMemo } from 'react';
import {
  TextInput as TextInputRN,
  TextInputProps,
  StyleSheet,
  Platform,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
  Text,
  TextStyle,
} from 'react-native';

import { commonColors, spacing, textStyles, Icon } from '@src/components';

export interface ITextInputProps extends TextInputProps {
  withBorder: boolean;
  size: 'small' | 'medium' | 'textArea';
  label?: string;
  disabled?: boolean;
  errorMessage?: string;
  autoCompleteType?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export const SMALL_INPUT_HEIGHT = 48;
export const MEDIUM_INPUT_HEIGHT = 60;
export const TEXTAREA_INPUTP_HEIGHT = 80;
const SECURE_ICON_CONTAINER_TOP_MARGIN = 41;

export const TextInput: React.FC<ITextInputProps> = ({
  withBorder,
  label,
  disabled,
  errorMessage,
  iconLeft,
  iconRight,
  size,
  placeholder,
  secureTextEntry,
  numberOfLines,
  value,
  containerStyle,
  onFocus,
  onBlur,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(
    !secureTextEntry,
  );

  const SECURE_ICON_TOP_MARGIN_STYLE = useMemo(() => {
    return {
      top:
        size === 'small'
          ? SECURE_ICON_CONTAINER_TOP_MARGIN
          : size === 'medium'
          ? SECURE_ICON_CONTAINER_TOP_MARGIN +
            (MEDIUM_INPUT_HEIGHT - SMALL_INPUT_HEIGHT) / 2
          : undefined,
    };
  }, [size]);

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setActive(prevState => !prevState);
      onBlur && onBlur(event);
    },
    [onBlur],
  );

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setActive(prevState => !prevState);
      onFocus && onFocus(event);
    },
    [onFocus],
  );

  const secureTextHandler = useCallback(() => {
    setIsSecureTextVisible(prevState => !prevState);
  }, []);

  const SecureTextIcon = (
    <Icon
      name={isSecureTextVisible ? 'eye-off-outline' : 'eye-outline'}
      size={20}
      onPress={secureTextHandler}
      color={disabled ? commonColors.disabled : commonColors.secondary}
      style={[styles.iconContainer, SECURE_ICON_TOP_MARGIN_STYLE]}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text
        style={[
          styles.label,
          errorMessage !== undefined &&
            errorMessage.length > 0 &&
            styles.labelError,
        ]}>
        {label}
      </Text>
      <TextInputRN
        {...props}
        style={
          disabled
            ? [
                styles.disabledText,
                styles.disabledContainer,
                size === 'small'
                  ? styles.smallInput
                  : size === 'medium'
                  ? styles.mediumInput
                  : null,
                size === 'textArea' && styles.textArea,
                size === 'textArea' &&
                  Platform.OS === 'android' &&
                  styles.textAreaAndroid,
                styles.text,
                withBorder ? styles.withBorder : styles.lineInput,
                !!value && styles.filledBorder,
              ]
            : [
                size === 'textArea' && styles.textArea,
                size === 'textArea' &&
                  Platform.OS === 'android' &&
                  styles.textAreaAndroid,
                styles.text,
                styles.inputContainer,
                size === 'small'
                  ? styles.smallInput
                  : size === 'medium'
                  ? styles.mediumInput
                  : null,
                withBorder ? styles.withBorder : styles.lineInput,
                !!value && styles.filledBorder,
                !!errorMessage && styles.errorBorder,
                active && styles.activeBorder,
              ]
        }
        value={value}
        editable={disabled}
        placeholder={placeholder}
        placeholderTextColor={commonColors.disabled}
        secureTextEntry={secureTextEntry && !isSecureTextVisible}
        multiline={props.multiline}
        numberOfLines={numberOfLines}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      {secureTextEntry && SecureTextIcon}
    </View>
  );
};

interface IStyles {
  container: ViewStyle;
  inputcontainer: ViewStyle;
  smallInput: ViewStyle;
  mediumInput: ViewStyle;
  lineInput: ViewStyle;
  withBorder: ViewStyle;
  activeBorder: ViewStyle;
  filledBorder: ViewStyle;
  errorBorder: ViewStyle;
  disabledContainer: ViewStyle;
  disabledText: TextStyle;
  text: TextStyle;
  textArea: ViewStyle;
  textAreaAndroid: TextStyle;
  errorMessage: TextStyle;
  label: TextStyle;
  labelError: TextStyle;
  iconContainer: ViewStyle;
}

const stylesDef = {
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingVertical: spacing.tiny,
  },
  inputContainer: {
    backgroundColor: commonColors.commonWhite,
  },
  smallInput: {
    height: SMALL_INPUT_HEIGHT,
  },
  mediumInput: {
    height: MEDIUM_INPUT_HEIGHT,
  },
  lineInput: {
    borderBottomWidth: 2,
  },
  withBorder: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: commonColors.primary,
  },
  activeBorder: {
    borderColor: commonColors.commonBlack,
  },
  filledBorder: {
    borderColor: commonColors.disabled,
  },
  errorBorder: {
    borderColor: commonColors.error,
  },
  disabledContainer: {
    borderColor: commonColors.disabled,
    backgroundColor: commonColors.disabledLight,
  },
  disabledText: {
    ...textStyles.typographies.body,
    color: commonColors.disabled,
  },
  text: {
    ...textStyles.typographies.body,
    color: commonColors.commonBlack,
    paddingHorizontal: spacing.small,
  },
  textArea: {
    height: TEXTAREA_INPUTP_HEIGHT,
  },
  textAreaAndroid: {
    textAlignVertical: 'top' as 'top',
  },
  errorMessage: {
    ...textStyles.typographies.caption2,
    color: commonColors.error,
    marginTop: spacing.tiny,
  },
  label: {
    ...textStyles.typographies.subhead,
    ...textStyles.fontWeights.semiBold,
    color: commonColors.commonBlack,
    marginBottom: 4,
  },
  labelError: {
    color: commonColors.error,
  },
  iconContainer: {
    right: spacing.small,
    position: 'absolute' as 'absolute',
  },
};

const styles = StyleSheet.create(stylesDef);
