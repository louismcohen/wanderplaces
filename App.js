import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ApiProvider } from './src/api/ApiContext';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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

SplashScreen.preventAutoHideAsync();

export default App = () => {
    // const [data, setData] = useState([]);
  const [fontsLoaded, fontError] = useFonts({
    'Syne-SemiBold': require('@expo-google-fonts/syne/Syne_600SemiBold.ttf'),
    'Syne-Bold': require('@expo-google-fonts/syne/Syne_700Bold.ttf'),
    'Mona-Light': require('./assets/fonts/mona-sans/Mona-Sans-Light.ttf'),
    'Mona-Regular': require('./assets/fonts/mona-sans/Mona-Sans-Regular.ttf'),
    'Mona-Medium': require('./assets/fonts/mona-sans/Mona-Sans-Medium.ttf'),
    'Mona-SemiBold': require('./assets/fonts/mona-sans/Mona-Sans-SemiBold.ttf'),
    'Mona-Bold': require('./assets/fonts/mona-sans/Mona-Sans-Bold.ttf'),
    'Mona-MediumWide': require('./assets/fonts/mona-sans/Mona-Sans-MediumWide.ttf'),
    'Mona-SemiBoldWide': require('./assets/fonts/mona-sans/Mona-Sans-SemiBoldWide.ttf'),
    'Mona-BoldWide': require('./assets/fonts/mona-sans/Mona-Sans-BoldWide.ttf'),
    'Mona-RegularNarrow': require('./assets/fonts/mona-sans/Mona-Sans-RegularNarrow.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  };

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