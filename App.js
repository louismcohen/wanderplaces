import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PlacesMap from './PlacesMap';

export default App = () => {
  return (
    <View style={ styles.container }>
      <StatusBar style='auto' />
      <PlacesMap />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});