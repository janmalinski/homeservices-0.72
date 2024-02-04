import React from 'react';
import { Pressable, View } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { CLOSE_ICON_SIZE } from '../Constants';
import { commonColors, spacing } from '@src/components';
import styles from '../Styles';

export const CloseButton = (props: { onPress: () => void }) => (
  <Pressable hitSlop={20} style={styles.closeButton} onPress={props.onPress}>
    {({ pressed }) => (
      <>
        {pressed && <View style={styles.closeOverlay} />}
        <FontAwesome5Icon
          name="times"
          color={commonColors.textPrimary}
          size={CLOSE_ICON_SIZE}
          style={{marginBottom: spacing.regular, backgroundColor: commonColors.transparent}}
        />
      </>
    )}
  </Pressable>
);
