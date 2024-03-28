import React, { createContext, useState, useEffect } from 'react';
import data from '../../data/combined_data.json';

const ApiContext = createContext();

const createCollectionNames = (data) => {
  const names = data.map(item => Object.keys(item)[0]);
  console.log(data[names[3]]);
  return names;
}

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  // Simulating API call
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch('https://api.example.com/data');
        // const data = await response.json();
        const collectionNames = createCollectionNames(data);
        setApiData(data);
      } catch (error) {
        console.error('Error fetching API data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ApiContext.Provider value={apiData}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
