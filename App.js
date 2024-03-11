import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PlacesMap from './PlacesMap';
import Collections from './Collections';

import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';

import { MaterialIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
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
  return (
    <SafeAreaProvider>
      <StatusBar
        animated={true}
      />
      <NavigationContainer>
        <Tab.Navigator 
          // tabBar={(props) => <CustomTabBar {...props} />}
          initialRouteName='Map'
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              // position: 'absolute',
              // backgroundColor: 'rgba(255,255,255,0.8)',
            },
            tabBarLabelStyle: {
              fontSize: 13,
              // fontFamily: 'SpaceGrotesk_600SemiBold'
            },
            // tabBarBackground: () => (
            //   <BlurView tint='dark' intensity={50} />
            // )
          }}
        >
          <Tab.Screen 
            name='Collections' 
            component={Collections} 
            options={{
              tabBarIcon: ({color, size}) => (
                // <FontAwesome name='th-list' color={color} size={size} />
                <MaterialIcons name='collections' color={color} size={size} />
              )
            }}  
          />
          <Tab.Screen 
            name='Map' 
            component={PlacesMap} 
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <FontAwesome6 name='map-location-dot' color={color} size={size} />
              )
            }} 

          />
          <Tab.Screen 
            name='Community' 
            component={TableView} 
            options={{
              tabBarIcon: ({color, size}) => (
                <FontAwesome name='users' color={color} size={size} />
              )
            }}          
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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