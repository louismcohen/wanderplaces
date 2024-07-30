import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Library from '../screens/Library';
import Collections from '../screens/Collections';
import CollectionItem from '../components/CollectionItem';
import PlaceDetail from '../screens/PlaceDetail';
import Places from '../screens/Places';

const LibraryNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName='Library'
      screenOptions={{
        headerLargeTitle: true,
        headerTransparent: true,
        headerBlurEffect: 'regular',
        headerLargeTitleStyle: {
          fontFamily: 'Mona-BoldWide',
        },
        headerTitleStyle: {
          fontFamily: 'Mona-SemiBoldWide',
        },
        headerBackTitleStyle: {
          fontFamily: 'Mona-Regular',
        },
      }}
    >
      <Stack.Group>
        <Stack.Screen name='Library' component={Library} />
        <Stack.Screen name='Collections' component={Collections} />
        <Stack.Screen name='Places' component={Places} />
      </Stack.Group>
      <Stack.Group
      // Individual Collection Items
      >
        <Stack.Screen name='CollectionItem' component={CollectionItem} />
      </Stack.Group>
      <Stack.Group
        // Collection Detail Modal
        screenOptions={{ presentation: 'modal' }}
      >
        <Stack.Screen
          name='PlaceDetail'
          component={PlaceDetail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default LibraryNavigator;
