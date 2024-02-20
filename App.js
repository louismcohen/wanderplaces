import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoogleMap from './Map';

export default App = () => {
  return (
    <View style={ styles.container }>
      <StatusBar style='auto' />
      <GoogleMap />
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