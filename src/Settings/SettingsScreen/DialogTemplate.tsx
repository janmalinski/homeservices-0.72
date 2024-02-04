import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import { commonColors, Text } from '@src/components';

import { Button } from '@src/components/designSystem/Button';
import { Icon, IIconProps } from '@src/components/designSystem/Icon';

export interface DialogTemplateProps {
  title: string;
  description: string;
  iconProps?: IIconProps;
  proceedButtonLabel?: string;
  cancelButtonLabel?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onProceed?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  onBackdropPress?: () => void;
}

export const DialogTemplate = ({
  title,
  description,
  iconProps,
  proceedButtonLabel,
  cancelButtonLabel,
  containerStyle,
  onProceed,
  onCancel,
  onClose,
  onBackdropPress,
}: DialogTemplateProps) => {
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.dialog}>
        {onClose && (
          <View style={styles.wrapIconClose}>
            <Icon name="close-outline" color={commonColors.commonBlack} onPress={onClose} />
          </View>
        )}
        <View style={styles.content}>
          {iconProps && (
            <View style={styles.wrapIcon}>
              <Icon size={70} color={commonColors.primary} {...iconProps} />
            </View>
          )}
          {title && (
            <Text typography="title3" style={styles.title}>
              {title}
            </Text>
          )}
          {description && (
            <Text typography="subhead" style={styles.description}>
              {description}
            </Text>
          )}
        </View>
        <View style={styles.buttons}>
          {cancelButtonLabel && onCancel && (
            <View style={styles.wrapButton}>
              <Button title={cancelButtonLabel} onPress={onCancel} />
            </View>
          )}
          {proceedButtonLabel && onProceed && (
            <View style={styles.wrapButton}>
              <Button title={proceedButtonLabel} onPress={onProceed} />
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    // padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    width: '100%',
    backgroundColor: commonColors.commonWhite,
    borderRadius: 7,
  },
  wrapIconClose: {
    paddingTop: 24,
    paddingRight: 24,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 32,
  },
  wrapIcon: {
    marginBottom: 32,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    marginBottom: 14,
    textAlign: 'center',
  },
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  wrapButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
