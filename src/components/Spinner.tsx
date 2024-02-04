import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { commonColors } from './designSystem/colors';

interface ISpinner {
  color?: string;
}

export const Spinner = ({ color = commonColors.navyBlue500 }: ISpinner) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
  }, [rotation]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      <Svg width="100%" height="100%" viewBox="0 0 32 32" fill="none">
        <Path
          opacity="0.4"
          d="M16 30.6667C24.1002 30.6667 30.6667 24.1002 30.6667 16C30.6667 7.89986 24.1002 1.33337 16 1.33337C7.89986 1.33337 1.33337 7.89986 1.33337 16C1.33337 24.1002 7.89986 30.6667 16 30.6667Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M16 1.33337C19.8898 1.33337 23.6204 2.87861 26.3709 5.62914C29.1214 8.37968 30.6667 12.1102 30.6667 16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

interface IStyles {
  container: ViewStyle;
}

const stylesDef: IStyles = {
  container: { width: 30, height: 30 },
};

const styles = StyleSheet.create(stylesDef);
