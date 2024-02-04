import * as rnLocalize from 'react-native-localize';

export const detectLanguageIsoFromDeviceSettings = () => {
  const lang = rnLocalize?.getLocales()[0].languageCode.split('_')[0];
  return lang === 'pl' ? 'pl' : 'en';
};
