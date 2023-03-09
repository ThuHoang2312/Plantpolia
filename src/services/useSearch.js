import {useState} from 'react';

export const useSearch = (data) => {
  const [search, setSearch] = useState('');

  const updateSearch = (search) => {
    setSearch(search);
  };

  return {
    search: {
      value: search,
      set: setSearch,
      update: updateSearch,
    },
  };
};
