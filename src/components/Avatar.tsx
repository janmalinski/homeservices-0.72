import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Icon, Spinner, Image } from './index';
import URL from '@src/helpers/domainUrlWithoutLastSlash';

export interface IAvatarProps {
  uri?: string;
  loading?: boolean;
  editable?: boolean;
}

export const Avatar = ({ uri, loading, editable }: IAvatarProps) => {

  if (loading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }

if (uri !== undefined) {
  return <Image source={{ uri: uri }} style={styles.container} />;
}
  return (
    <View style={styles.container}>
     {editable && <Icon name="person-circle-outline" size={64} style={styles.icon} />} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginRight: 0,
  },
});
