import React from 'react';
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { commonColors, spacing } from './index';
import { KeyboardAvoidingComponent } from './KeyboardAvoidingComponent';
import { Spinner } from './Spinner';

export interface IFullScreenTemplateProps {
  children?: React.ReactNode;
  paddedHotizontaly?: boolean;
  safeArea?: boolean;
  bottomNavigationPad?: boolean;
  noScroll?: boolean;
  isLoading?: boolean;
  contentContainerStyle?: ViewStyle;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  keyboardShouldPersistTaps?: boolean | 'always' | 'never' | 'handled';
  scrollRef?: React.RefObject<ScrollView>;
}

export const FullScreenTemplate: React.FC<IFullScreenTemplateProps> = ({
  children,
  paddedHotizontaly,
  safeArea,
  bottomNavigationPad,
  noScroll,
  isLoading,
  contentContainerStyle,
  header,
  footer,
  keyboardShouldPersistTaps,
  scrollRef,
}) => {
  const RootView = safeArea ? SafeAreaView : View;
  const Container = noScroll ? View : KeyboardAvoidingComponent;

  return (
    <RootView style={styles.mainContainer}>
      {header}
      {isLoading ? (
        <View style={styles.centeredContainer}>
          <Spinner />
        </View>
      ) : (
        <Container
          bounces={false}
          extraScrollHeight={Platform.select({ ios: 32, android: 0 })}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          contentContainerStyle={[
            paddedHotizontaly && styles.paddedHotizontaly,
            bottomNavigationPad && styles.bottomNavigationPad,
            contentContainerStyle,
          ]}
          scrollRef={scrollRef as React.RefObject<ScrollView>}
          style={[
            styles.container,
            noScroll && styles.containerNoScroll,
            noScroll && paddedHotizontaly && styles.paddedHotizontaly,
            noScroll && bottomNavigationPad && styles.bottomNavigationPad,
            noScroll && contentContainerStyle,
          ]}>
          {children}
        </Container>
      )}
      <View style={styles.footerContainer}>
        {footer}
      </View>
    </RootView>
  );
};

interface IStyles {
  mainContainer: ViewStyle;
  container: ViewStyle;
  centeredContainer: ViewStyle;
  containerNoScroll: ViewStyle;
  paddedHotizontaly: ViewStyle;
  bottomNavigationPad: ViewStyle;
  loadingContainer: ViewStyle;
  footerContainer: ViewStyle;
}

const stylesDef: IStyles = {
  mainContainer: {
    backgroundColor: commonColors.commonWhite,
    flex: 1,
  },
  container: {
    backgroundColor: commonColors.commonWhite,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: commonColors.commonWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerNoScroll: {
    flex: 1,
  },
  paddedHotizontaly: {
    paddingHorizontal: spacing.large,
  },
  bottomNavigationPad: {
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  }
};

const styles = StyleSheet.create(stylesDef);
