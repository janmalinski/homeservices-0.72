import { StyleSheet } from 'react-native';
import { fonts } from '../fonts';
import { commonColors as ColorPallette } from '../colors';

type TTextColors = Pick<
  typeof ColorPallette,
  | 'primary'
  | 'textPlaceholder'
  | 'textPrimary'
  | 'textSecondary'
  | 'textTitle'
  | 'error'
  | 'white'
  | 'tertiaryButtonText'
  | 'textAccent'
  | 'navyBlue100'
  | 'navyBlue300'
  | 'navyBlue200'
  | 'navyBlue400'
  | 'navyBlue500'
  | 'navyBlue700'
  | 'navyBlue800'
  | 'navyBlue900'
  | 'green500'
  | 'green700'
  | 'red500'
  | 'red700'
  | 'green900'
  | 'orange500'
  | 'orange400'
  | 'orange900'
  | 'opacity'
>;

const commonColors: { [key in keyof TTextColors]: { color: string } } =
  StyleSheet.create({
    primary: {
      color: ColorPallette.primary,
    },
    textPlaceholder: {
      color: ColorPallette.textPlaceholder,
    },
    textPrimary: {
      color: ColorPallette.textPrimary,
    },
    textSecondary: {
      color: ColorPallette.textSecondary,
    },
    textTitle: {
      color: ColorPallette.textTitle,
    },
    error: {
      color: ColorPallette.error,
    },
    white: {
      color: ColorPallette.white,
    },
    tertiaryButtonText: {
      color: ColorPallette.tertiaryButtonText,
    },
    textAccent: {
      color: ColorPallette.textAccent,
    },

    red500: {
      color: ColorPallette.red500,
    },
    green500: {
      color: ColorPallette.green500,
    },
    green700: {
      color: ColorPallette.green700,
    },
    navyBlue100: {
      color: ColorPallette.navyBlue100,
    },
    navyBlue200: {
      color: ColorPallette.navyBlue200,
    },
    navyBlue300: {
      color: ColorPallette.navyBlue300,
    },
    navyBlue400: {
      color: ColorPallette.navyBlue400,
    },
    navyBlue500: {
      color: ColorPallette.navyBlue500,
    },
    navyBlue700: {
      color: ColorPallette.navyBlue700,
    },
    navyBlue800: {
      color: ColorPallette.navyBlue800,
    },
    navyBlue900: {
      color: ColorPallette.navyBlue900,
    },
    green900: {
      color: ColorPallette.green900,
    },
    orange400: {
      color: ColorPallette.orange400,
    },
    orange500: {
      color: ColorPallette.orange500,
    },
    orange900: {
      color: ColorPallette.orange900,
    },
    red700: {
      color: ColorPallette.red700,
    },
    opacity: {
      color: ColorPallette.opacity
    }
  });

const typographies = StyleSheet.create({
  caption3: {
    fontSize: 9,
    lineHeight: 13,
    letterSpacing: 0.06,
  },
  caption2: {
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0.06,
  },
  caption1: {
    fontSize: 12,
    lineHeight: 16,
  },
  subhead: {
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.23,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.43,
  },
  footnote: {
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  title2: {
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.26,
  },
  title3: {
    fontSize: 20,
    lineHeight: 25,
    letterSpacing: -0.28,
  },
  largeTitle: {
    fontSize: 34,
    lineHeight: 41,
    letterSpacing: 0.3,
  },
});

const fontWeights = StyleSheet.create({
  regular: {
    fontFamily: fonts.inter.regular,
  },
  medium: {
    fontFamily: fonts.inter.medium,
  },
  semiBold: {
    fontFamily: fonts.inter.semiBold,
  },
  bold: {
    fontFamily: fonts.montserrat.semiBold,
  },
  extraBold: {
    fontFamily: fonts.montserrat.bold,
  },
});

const textAligns = StyleSheet.create({
  left: {
    textAlign: 'left',
  },
  right: {
    textAlign: 'right',
  },
  justify: {
    textAlign: 'justify',
  },
  center: {
    textAlign: 'center',
  },
  auto: {
    textAlign: 'auto',
  },
});

const textDecorationLines = StyleSheet.create({
  none: {
    textDecorationLine: 'none',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  lineThrough: {
    textDecorationLine: 'line-through',
  },
  underlineLineThrough: {
    textDecorationLine: 'underline line-through',
  },
});

export { typographies, textAligns, fontWeights, commonColors, textDecorationLines};
