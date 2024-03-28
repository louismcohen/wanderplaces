import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Library from '../screens/Library';
import LibraryNavigator from '../navigation/LibraryNavigator';
import PlacesMap from '../../PlacesMap';
import Communities from '../screens/Communities';

import { MaterialIcons, FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const TabNavigator = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName='LibraryNavigator'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name='LibraryNavigator'
                component={LibraryNavigator} 
                options={{
                    title: 'Library',
                    tabBarIcon: ({color, size}) => (
                        <MaterialIcons name='collections' color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='PlacesMap'
                component={PlacesMap}
                options={{
                    title: 'Map',
                    tabBarIcon: ({color, size}) => (
                      <FontAwesome6 name='map-location-dot' color={color} size={size} />
                    )
                }} 
            />
            <Tab.Screen
                name='Communities'
                component={Communities}
                options={{
                    title: 'Communities',
                    tabBarIcon: ({color, size}) => (
                      <FontAwesome name='users' color={color} size={size} />
                    )
                }} 
            />
        </Tab.Navigator>
    )
};

export default TabNavigator;