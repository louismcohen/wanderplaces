import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ApiProvider } from './src/api/ApiContext';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './src/navigation/TabNavigator';

import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const CustomTabBar = (props) => {
  return (
    <BlurView 
      intensity={100}
      tint='light'
    >
      <BottomTabBar {...props} />
    </BlurView>
    
  )
}

const TableView = () => {
  return (
    <View style={styles.container}>
      <Text>This is the table view</Text>
    </View>
  )
}

export default App = () => {
    // const [data, setData] = useState([]);


  return (
    <ApiProvider>
      <SafeAreaProvider>
        <StatusBar
          animated={true}
        />
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApiProvider>
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