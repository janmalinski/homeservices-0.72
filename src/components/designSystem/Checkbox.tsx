import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Text } from './Text/Text';
import { spacing, commonColors, CheckboxColors, textStyles } from '@src/components';

import { Icon } from './Icon';

export interface ICheckboxProps {
  checked?: boolean;
  label?: string | React.ReactNode;
  onPress?: (value: boolean, index?: number) => void;
  size?: 'small' | 'medium';
  disabled?: boolean;
  raised?: boolean;
  errorMessage?: string | boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
  checked,
  onPress,
  label,
  size = 'medium',
  disabled,
  raised,
  errorMessage,
  containerStyle,
}) => {
  const state = disabled ? 'disabled' : raised ? 'raised' : 'default';
  const select = checked ? 'selected' : 'unselected';
  const handlePress = useCallback(() => {
    onPress && onPress(!checked);
  }, [checked, onPress]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={!disabled ? 0.2 : 1}
        onPress={!disabled ? handlePress : undefined}>
        <>
          <View style={[styles.container, containerStyle]}>
            <Icon
              onPress={!disabled ? handlePress : undefined}
              name="checkmark-sharp"
              color={CheckboxColors[select][state].icon}
              size={spacing.large}
              style={[
                styles.iconContainer,
                size === 'small' ? styles.iconSmall : styles.iconMedium,
                {
                  borderColor: errorMessage
                    ? commonColors.error
                    : CheckboxColors[select][state].border,
                  backgroundColor: CheckboxColors[select][state].background,
                },
              ]}
            />
            <View style={styles.labelContainer}>
              {
                typeof label === 'string' ? 
                  <Text
                  typography="caption1"
                  style={[
                    size === 'small' ? styles.labelSmall : styles.labelMedium,
                    { color: CheckboxColors[select][state].label },
                    errorMessage ? { color: commonColors.error } : {} ]}
                  >
                    {label}
                  </Text>
                :
                  label
              }
            </View>
          </View>
        </>
      </TouchableOpacity>
      {errorMessage && (
        <Text typography="footnote" style={styles.error}>
          {errorMessage}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 13,
  },
  iconContainer: {
    borderWidth: 1.6,
    borderRadius: 3,
    marginRight: 11,
  },
  iconSmall: {
    width: 15,
    height: 15,
  },
  iconMedium: {
    width: 18,
    height: 18,
  },
  labelContainer: {
    flex: 1,
    marginTop: -1,
  },
  labelSmall: {
    ...textStyles.typographies.caption1,
  },
  labelMedium: {
    ...textStyles.typographies.body,
  },
  error: {
    ...textStyles.typographies.footnote,
    color: commonColors.error,
    marginTop: -10,
  },
});
