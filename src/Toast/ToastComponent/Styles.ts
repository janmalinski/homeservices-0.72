import { StyleSheet, ViewStyle } from 'react-native';
import { commonColors } from '@src/components';
import {
  CLOSE_ICON_SIZE,
  TOAST_MARGIN,
  TOAST_MIN_HEIGHT,
  TOAST_PADDING,
} from './Constants';

interface IStyles {
  container: ViewStyle;
  closeButton: ViewStyle;
  closeOverlay: ViewStyle;
  innerContainer: ViewStyle;
  textContainer: ViewStyle;
  buttonContainer: ViewStyle;
  buttonContainerActive: ViewStyle;
}

const stylesDef: IStyles = {
  container: {
    position: 'absolute',
    left: TOAST_MARGIN,
    right: TOAST_MARGIN,
    overflow: 'visible',
    backgroundColor: commonColors.commonWhite,
    padding: TOAST_PADDING,
    shadowColor: commonColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    minHeight: TOAST_MIN_HEIGHT,
    borderRadius: 10,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'visible',
    height: CLOSE_ICON_SIZE + 20,
    width: CLOSE_ICON_SIZE + 10,
  },
  closeOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: commonColors.disabled,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 15,
    marginRight: 50,
  },
  buttonContainer: {
    marginTop: 10,
  },
  buttonContainerActive: {
    opacity: 0.5,
  },
};

const styles = StyleSheet.create(stylesDef);

export default styles;
