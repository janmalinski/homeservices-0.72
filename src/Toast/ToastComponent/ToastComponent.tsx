import React, { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import { snapPoint } from 'react-native-redash';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { Text } from '@src/components';
import { CloseButton } from './Buttons/CloseButton';
import { AdditionalButton } from './Buttons/AdditionalButton';
import { IToastProps } from './Interfaces';
import {
  BIG_ICON_SIZE,
  IconColors,
  Icons,
  TOAST_MARGIN,
  TOAST_MIN_HEIGHT,
} from './Constants';
import styles from './Styles';

const SPRING_CONFIG = {
  overshootClamping: false,
  stiffness: 100,
  mass: 0.5,
};

export const ToastComponent = ({
  isVisible,
  text,
  bottomOffset = 0,
  buttonText,
  onButtonPress,
  variant = 'info',
  onHidden,
  isDismissable = true,
  autoHideTimeout = 0,
}: IToastProps) => {
  const hiddenPosition = bottomOffset + TOAST_MIN_HEIGHT + TOAST_MARGIN + 50;
  const panY = useSharedValue(hiddenPosition);
  const componentWasShown = useSharedValue(false);

  const onClose = useCallback(() => {
    onHidden && onHidden();
  }, [onHidden]);

  useEffect(() => {
    if (isVisible) {
      panY.value = withSpring(0, SPRING_CONFIG, done => {
        if (done) {
          componentWasShown.value = true;
        }
      });
      if (autoHideTimeout) {
        const autoHideTimeoutRef = setTimeout(() => {
          onClose();
        }, autoHideTimeout);

        return () => clearTimeout(autoHideTimeoutRef);
      }
    } else {
      panY.value = withTiming(hiddenPosition, undefined, done => {
        if (done) {
          componentWasShown.value = false;
        }
      });
    }
  }, [
    isVisible,
    componentWasShown,
    hiddenPosition,
    panY,
    onClose,
    autoHideTimeout,
  ]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            panY.value,
            [0, 1],
            [0, 1],
            componentWasShown.value
              ? { extrapolateLeft: Extrapolation.CLAMP }
              : Extrapolate.EXTEND,
          ),
        },
      ],
    };
  });

  const onButtonPressed = useCallback(() => {
    onButtonPress && onButtonPress();
    onClose();
  }, [onClose, onButtonPress]);

  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startY: number }
  >(
    {
      onStart: (_, ctx) => {
        ctx.startY = panY.value;
      },
      onActive: (e, ctx) => {
        panY.value = ctx.startY + e.translationY;
      },
      onEnd: ({ translationY, velocityY }) => {
        if (!isDismissable) {
          panY.value = withTiming(0);
        }
        const toSnap = snapPoint(translationY, velocityY, [0, hiddenPosition]);

        const isHiding = toSnap > 0;

        panY.value = withTiming(
          toSnap,
          undefined,
          isHiding
            ? done => {
                if (done) {
                  if (onHidden) {
                    runOnJS(onHidden)();
                  }
                  componentWasShown.value = false;
                }
              }
            : undefined,
        );
      },
    },
    [hiddenPosition, isDismissable],
  );

  return (
    <PanGestureHandler onGestureEvent={panGestureHandler}>
      <Animated.View
        style={[
          animatedStyle,
          styles.container,
          {
            bottom: TOAST_MARGIN + bottomOffset,
          },
        ]}>
        {isDismissable && <CloseButton onPress={onClose} />}
        <View style={styles.innerContainer}>
          <FontAwesome5Icon
            size={BIG_ICON_SIZE}
            name={Icons[variant]}
            color={IconColors[variant]}
          />
          <View style={styles.textContainer}>
            <Text fontWeight="regular" typography="subhead" color="textPrimary">
              {text}
            </Text>
            <AdditionalButton text={buttonText} onPress={onButtonPressed} />
          </View>
        </View>
        
      </Animated.View>
    </PanGestureHandler>
  );
};
