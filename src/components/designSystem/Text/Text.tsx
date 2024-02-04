import React from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  Text as TextRN,
  TextStyle,
} from 'react-native';

import {
  fontWeights,
  textAligns,
  typographies,
  commonColors,
  textDecorationLines,
} from './styles';

interface ITextProps {
  typography: keyof typeof typographies;
  fontWeight?: keyof typeof fontWeights;
  textAlign?: keyof typeof textAligns;
  color?: keyof typeof commonColors;
  textDecorationLine?: keyof typeof textDecorationLines;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  children?: React.ReactNode;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  onLayout?: ((event: LayoutChangeEvent) => void) | undefined;
}

export const Text: React.FC<ITextProps> = ({
  children,
  typography,
  fontWeight = 'regular',
  textAlign = 'auto',
  color = 'textPrimary',
  textDecorationLine = 'none',
  numberOfLines,
  ellipsizeMode,
  style,
  onPress,
  onLayout,
}) => {
  return (
    <TextRN
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      onLayout={onLayout}
      maxFontSizeMultiplier={1.5}
      style={[
        typographies[typography],
        fontWeights[fontWeight],
        textAligns[textAlign],
        commonColors[color],
        textDecorationLines[textDecorationLine],
        style,
      ]}>
      {children}
    </TextRN>
  );
};
