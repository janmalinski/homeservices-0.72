import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { Icon, commonColors } from '@src/components';
import { ICoordinates, TLatitudeLongitude } from './MapScreen';

interface IMapProps {
  // addressChangedByInput: boolean;
  coordinates: [number, number];
  // onRegionChange: (reg: ICoordinates) => void;
  // resetAddressChangedByInput: (value: boolean) => void;
}

export const Map = ({
  coordinates}: IMapProps) => {


  useEffect(() => {
    Mapbox.setAccessToken("sk.eyJ1IjoiamFubWFsaW5za2k4MSIsImEiOiJjbG1xaGZqemgwNHpzMnFwaXg2ZjkwajVwIn0.kTsH5Bvy7XhFW6M7KNtRaQ");
  }, []);


  console.log("COORDS", coordinates)

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          logoEnabled={false}
          preferredFramesPerSecond={1000}
          animated={true}
          styleURL={Mapbox.StyleURL.Street}
          >
          <Mapbox.Camera zoomLevel={10} centerCoordinate={coordinates} />
          <Mapbox.PointAnnotation id="marker" coordinate={coordinates}        
            draggable 
          // onDragStart={()=>console.log("DRAG") 
          // }
          >
            <Icon name="flag" size={20} color={commonColors.error} />
          </Mapbox.PointAnnotation>
        </Mapbox.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1
  }
});