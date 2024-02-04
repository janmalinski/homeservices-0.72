import React from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  StyleProp,
} from 'react-native';

export interface IKeyboardAvoidingComponentProps {
  children?: React.ReactNode;
  bounces?: boolean;
  extraScrollHeight?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  scrollRef: React.RefObject<ScrollView>;
}

export const KeyboardAvoidingComponent: React.FC<
  IKeyboardAvoidingComponentProps
> = ({ children, extraScrollHeight, scrollRef, ...props }) => {

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={extraScrollHeight}>
      <ScrollView ref={scrollRef} {...props}>{children}</ScrollView>
    </KeyboardAvoidingView>
  );
};

interface IStyles {
  container: ViewStyle;
}

const stylesDef: IStyles = {
  container: {
    flex: 1,
  },
};

const styles = StyleSheet.create(stylesDef);
