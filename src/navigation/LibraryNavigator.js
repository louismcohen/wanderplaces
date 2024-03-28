import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Library from '../screens/Library';
import Collections from '../../Collections';
import CollectionItem from '../../CollectionItem';
import PlaceDetail from '../screens/PlaceDetail';

const LibraryNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Library'
            screenOptions={{
                headerLargeTitle: true,
                headerTransparent: true,
                headerBlurEffect: 'regular',
            }}
        >      
            <Stack.Group
                // Main Library Lists
            >
                <Stack.Screen 
                    name='Library'
                    component={Library}
                />
                <Stack.Screen
                    name='Collections'
                    component={Collections}
                />
            </Stack.Group>
            <Stack.Group
                // Individual Collection Items
            >
                <Stack.Screen 
                    name='Mae Hong Son Loop'
                    component={CollectionItem}
                />
            </Stack.Group>
            <Stack.Group
                // Collection Detail Modal
                screenOptions={{ presentation: 'modal' }}
            >
                <Stack.Screen 
                    name='PlaceDetail'
                    component={PlaceDetail}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default LibraryNavigator;