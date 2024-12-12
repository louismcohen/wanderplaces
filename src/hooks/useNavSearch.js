import { useLayoutEffect } from 'react';
import { HeaderRight } from '../components/HeaderRight';

const useNavSearch = (navigation, placeholder, setSearch) => {
  return useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder,
        onChangeText: (event) => setSearch(event.nativeEvent.text),
        onCancelButtonPress: (event) => setSearch(''),
        autoCapitalize: 'none',
      },
      headerRight: () => <HeaderRight />,
    });
  }, [navigation]);
};

export default useNavSearch;
