import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export interface IWavyHeaderProps {
  style?: StyleProp<ViewStyle>;
  height: number;
  top: number;
  color: string;
  pattern?: string;
}

export const WavyHeader = ({
  style,
  height,
  top,
  color,
  pattern = 'M0,0 L48,0 C96,0 192,0 288,0 C384,0 480,0 576,0 C672,0 768,0 864,0 C960,0 1056,0 1152,0 C1248,0 1344,0 1392,0 L1440,0 L1440,160 L1392,176 C1344,192 1248,224 1152,208 C1056,192 960,128 864,128 C768,128 672,192 576,213.3 C480,235 384,213 288,186.7 C192,160 96,128 48,112 L0,96 Z',
}: IWavyHeaderProps) => {
  return (
    <View style={style}>
      <View style={{ backgroundColor: color, height }}>
        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ position: 'absolute', top }}>
          <Path fill={color} d={pattern} />
        </Svg>
      </View>
    </View>
  );
};
