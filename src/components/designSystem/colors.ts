export interface Colors {
  commonWhite: 'white',
  commonBlack: 'black',
  shadowColor: '#000000',
  lightContrast: '#FAFAFA',
  primary: '#e4f6f4',
  secondary: '#8184a1',
  disabled: '#878787',
  disabledLight: '#F2F2F2',
  pathColor: '#4169E1',
  link: '#1E90FF',
  overlay: 'rgba(0,0,0,0.8)',
  error: '#B22222',
  success: '#22bb33',
  warning: '#f0ad4e',
  textTitle: '#1A2333',
  textPrimary: '#6c6d7c',
  textSecondary: '#fff',
  textPlaceholder: '#B4BDCB',
  tertiaryButtonBackground: '#FFD1B2',
  tertiaryButtonText: '#BA4A00',
  textAccent: '#000000',
  dirtyBlue: '#222D40',
  gray: '#C2CCD7',
  gray90: '#E5E5E5',
  navyBlue50: '#ECEFF5',
  navyBlue100: '#D1D7E1',
  navyBlue200: '#B4BDCB',
  navyBlue300: '#97A2B5',
  navyBlue400: '#818EA3',
  navyBlue500: '#5D6D8B',
  navyBlue700: '#31415D',
  navyBlue800: '#222D40',
  navyBlue900: '#1A2333',
  green50: '#AFF5B4',
  green100: '#DCF9D2',
  green200: '#56D364',
  green500: '#228636',
  green700: '#459473',
  green900: '#235450',
  red50: '#FFDAD5',
  red700: '#8E1619',
  red500: '#DA3633',
  yellow100: '#FAF4B9',
  orange300: '#FFD1B2',
  orange400: '#FF9D5B',
  orange500: '#FD6500',
  orange900: '#923C27',
  blue400: '#3DB6FB',
  transparent: 'transparent',
  opacity: '#191E23'
}
export const commonColors: Colors = {
  commonWhite: 'white',
  commonBlack: 'black',
  shadowColor: '#000000',
  lightContrast: '#FAFAFA',
  primary: '#e4f6f4',
  secondary: '#8184a1',
  disabled: '#878787',
  disabledLight: '#F2F2F2',

  pathColor: '#4169E1',
  link: '#1E90FF',
  overlay: 'rgba(0,0,0,0.8)',

  error: '#B22222',
  success: '#22bb33',
  warning: '#f0ad4e',

  textTitle: '#1A2333',
  textPrimary: '#6c6d7c',
  textSecondary: '#fff',
  textPlaceholder: '#B4BDCB',
  tertiaryButtonBackground: '#FFD1B2',
  tertiaryButtonText: '#BA4A00',
  textAccent: '#000000',

  dirtyBlue: '#222D40',
  gray: '#C2CCD7',
  gray90: '#E5E5E5',
  navyBlue50: '#ECEFF5',
  navyBlue100: '#D1D7E1',
  navyBlue200: '#B4BDCB',
  navyBlue300: '#97A2B5',
  navyBlue400: '#818EA3',
  navyBlue500: '#5D6D8B',
  navyBlue700: '#31415D',
  navyBlue800: '#222D40',
  navyBlue900: '#1A2333',
  green50: '#AFF5B4',
  green100: '#DCF9D2',
  green200: '#56D364',
  green500: '#228636',
  green700: '#459473',
  green900: '#235450',
  red50: '#FFDAD5',
  red700: '#8E1619',
  red500: '#DA3633',
  yellow100: '#FAF4B9',
  orange300: '#FFD1B2',
  orange400: '#FF9D5B',
  orange500: '#FD6500',
  orange900: '#923C27',
  blue400: '#3DB6FB',
  transparent: 'transparent',
  opacity: '#191E23'
};

// export const light = {
//   themeColor: '#FFFFFF',
//   white: '#000000',
//   ...commonColors
// };

// export const dark = {
//   themeColor: '#000000',
//   white: '#FFFFFF',
//   ...commonColors,
// };


const grayscale = {
  grayscale00: 'rgba(255, 255, 255, 1)', // #FFFFFF
  grayscale01: 'rgba(247, 249, 251, 1)', // #F7F9FB
  grayscale02: 'rgba(236, 241, 245, 1)', // #ECF1F5
  grayscale03: 'rgba(215, 225, 235, 1)', // #D7E1EB
  grayscale04: 'rgba(194, 204, 215, 1)', // #C2CCD7
  grayscale05: 'rgba(163, 174, 186, 1)', // #A3AEBA
  grayscale06: 'rgba(119, 131, 144, 1)', // #778390
  grayscale07: 'rgba(86, 97, 108, 1)', // #56616C
  grayscale08: 'rgba(52, 61, 71, 1)', // #343D47
  grayscale09: 'rgba(25, 30, 35, 1)', // #191E23
};

const primary = {
  primaryLight: 'rgba(105, 192, 255, 1)', // #69C0FF
  primaryDefault: 'rgba(222, 245, 241, 1)', // #def5f1
  primaryRaised: 'rgba(9, 109, 217, 1)', // #096DD9
  primaryDark: 'rgba(0, 80, 179, 1)', // #0050B3
  primaryDisabled: 'rgba(213, 228, 242, 1)', // #D5E4F2
};

export const CheckboxColors = {
  unselected: {
    default: {
      border: grayscale.grayscale04,
      background: grayscale.grayscale00,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
    raised: {
      border: grayscale.grayscale04,
      background: grayscale.grayscale00,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
    disabled: {
      border: grayscale.grayscale03,
      background: grayscale.grayscale01,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale05,
    },
  },
  selected: {
    default: {
      border: primary.primaryDefault,
      background: primary.primaryDefault,
      icon: grayscale.grayscale09,
      label: grayscale.grayscale09,
    },
    raised: {
      border: primary.primaryRaised,
      background: primary.primaryRaised,
      icon: grayscale.grayscale00,
      label: grayscale.grayscale09,
    },
    disabled: {
      border: primary.primaryDefault,
      background: primary.primaryDefault,
      icon: grayscale.grayscale09,
      label: grayscale.grayscale09,
    },
  },
};

export const header = {
  primary: {
    background: commonColors.primary,
    border: commonColors.primary,
    title: commonColors.textTitle,
  },
  light: {
    background: commonColors.commonWhite,
    border: commonColors.primary,
    title: commonColors.textTitle,
  },
}

export const tabNavigator = {
  default: {
    active: primary.primaryDefault,
    inactive: grayscale.grayscale03,
  },
  raised: {
    active: primary.primaryDefault,
    inactive: grayscale.grayscale03,
  },
  disabled: {
    active: primary.primaryDefault,
    inactive: grayscale.grayscale03,
  },
};

const commonColor = {
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
  activeColor: '#DE5E69', //'#00695C',
  deactiveColor: '#DE5E6950', //'#B2DFDB',
  boxActiveColor: '#DE5E6940', //'#80CBC4',
};

const light = {
  themeColor: '#FFFFFF',
  white: '#000000',
  sky: '#DE5E69',
  gray: 'gray',
  ...commonColor,
};

const dark = {
  themeColor: '#000000',
  white: '#FFFFFF',
  sky: '#831a23',
  gray: 'white',
  ...commonColor,
};

export default { light, dark };
