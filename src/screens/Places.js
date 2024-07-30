import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useApiData } from '../api/ApiContext';
import { ListItem } from '../components/ListItems';

const Places = ({ navigation }) => {
  const apiData = useApiData();
  const { places } = apiData;

  const placesSorted = places.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={placesSorted}
        renderItem={({ item }) => <ListItem type='place' info={item} />}
      />
    </SafeAreaView>
  );
};

export default Places;
