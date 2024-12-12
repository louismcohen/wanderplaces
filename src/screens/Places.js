import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useApiData } from '../api/ApiContext';
import { ListItem } from '../components/ListItems';
import useNavSearch from '../hooks/useNavSearch';
import useListFilter from '../hooks/useListFilter';

const Places = ({ navigation }) => {
  const apiData = useApiData();
  const { places } = apiData;
  const [filteredPlaces, setSearch] = useListFilter(places);

  useNavSearch(navigation, 'Name, Type, Details, and More', setSearch);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={filteredPlaces}
        renderItem={({ item }) => <ListItem type='place' info={item} />}
      />
    </SafeAreaView>
  );
};

export default Places;
