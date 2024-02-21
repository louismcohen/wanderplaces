import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import PlacesMap from './PlacesMap';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const TableView = () => {
  return (
    <View style={styles.container}>
      <Text>This is the table view</Text>
    </View>
  )
}

export default App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 13,
          }}}
      >
        <Tab.Screen 
          name='Places' 
          component={TableView} 
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome name='th-list' color={color} size={size} />
            )
          }}  
        />
        <Tab.Screen 
          name='Map' 
          component={PlacesMap} 
          options={{
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name='map' color={color} size={size} />
            )
          }}          
        />
      </Tab.Navigator>
    </NavigationContainer>
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