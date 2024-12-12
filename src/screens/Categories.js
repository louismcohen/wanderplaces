import { FlatList, SafeAreaView } from 'react-native';
import { useApiData } from '../api/ApiContext';
import useListFilter from '../hooks/useListFilter';
import useNavSearch from '../hooks/useNavSearch';
import { ListItem } from '../components/ListItems';

const Categories = ({ navigation }) => {
  const { categories } = useApiData();
  const categoryNames = Object.keys(categories);
  const [filteredCategories, setSearch] = useListFilter(categoryNames);

  useNavSearch(navigation, 'Name', setSearch);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={filteredCategories}
        renderItem={({ item }) => <ListItem type='category' info={item} />}
      />
    </SafeAreaView>
  );
};a

export default Categories;
