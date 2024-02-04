import { commonColors, spacing } from '@src/components';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface IStyles {
  container: ViewStyle;
  centeredContainer: ViewStyle;
  searchInputContainer: ViewStyle;
  bottomBox: ViewStyle;
  addressText: TextStyle;
  questionContainer: ViewStyle;
  questionText: TextStyle;
}

const stylesDef: IStyles = {
  container: {
    flex: 1,
    backgroundColor: commonColors.commonWhite,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: commonColors.commonWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 100,
    backgroundColor: commonColors.commonWhite,
    borderRadius: 4,
  },
  bottomBox: {
    position: 'absolute',
    height: 150,
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: commonColors.commonWhite,
    paddingHorizontal: spacing.regular,
    paddingTop: spacing.regular,
  },
  addressText: {
    marginBottom: spacing.xxLarge,
  },
  questionContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor: commonColors.commonWhite,
    borderRadius: 4,
    borderBottomColor: commonColors.commonBlack,
    borderBottomWidth: 1,
  },
  questionText: {
    fontSize: 18,
  },
};

export const MapScreenStyles = StyleSheet.create(stylesDef);
