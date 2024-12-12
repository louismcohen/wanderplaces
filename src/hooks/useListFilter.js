import { useState, useEffect } from 'react';
import { QuickJsonSearch } from '../utils/utils';

const useListFilter = (displayList, searchList) => {
  const queryList = searchList ? searchList : displayList;
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (search === '') {
      setFiltered(displayList);
    } else {
      const filteredList = QuickJsonSearch(search, queryList);
      setFiltered(filteredList);
    }
  }, [search, displayList]);

  return [filtered, setSearch];
};

export default useListFilter;
