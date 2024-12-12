import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/supabase';

import collectionsData from '../data/collections.json';
import placesData from '../data/places.json';

const placesSorted = placesData.sort((a, b) => a.title.localeCompare(b.title));

const getCategories = (places) => {
  const categories = [
    ...new Set(
      places.reduce((acc, place) => [...acc, ...place.types.split(',')], [])
    ),
  ].sort((a, b) => a.localeCompare(b));

  const categoriesMap = places.reduce((acc, place) => {
    const currentCategories = Object.keys(acc);
    const types = place.types.split(',');
    const newMap = types.reduce((mapAcc, type) => {
      if (currentCategories.includes(type)) {
        return mapAcc;
      } else {
        const placeWithThisCategory = places.reduce((filtered, place) => {
          if (place.types.includes(type)) {
            return [...filtered, place._id];
          } else {
            return filtered;
          }
        }, []);

        return {
          ...mapAcc,
          [type]: {
            placeIds: placeWithThisCategory,
            count: placeWithThisCategory.length,
          },
        };
      }
    }, {});

    return {
      ...acc,
      ...newMap,
    };
  }, {});

  console.log(categoriesMap);

  return categoriesMap;
};

const ApiContext = createContext();

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState();
  const [collections, setCollections] = useState(collectionsData);
  const [places, setPlaces] = useState(placesSorted);
  const [placesCollections, setPlacesCollections] = useState();

  const [categories, setCategories] = useState([]);

  // const [loginData, setLoginData] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!collections || !places) return;

    const placesCollectionsData = collections.map((collection) => {
      // console.log(places.slice(0,3));
      const placesInThisCollection = places.filter(
        (place) => place.collection_id === collection._id
      );
      return {
        ...collection,
        places: placesInThisCollection,
      };
    });

    setPlacesCollections(placesCollectionsData);

    const placesWithDefaultEmojis = places.map((place) => {
      const collectionForThisPlace = collections.find(
        (collection) => collection._id === place.collection_id
      );

      return {
        ...place,
        emoji: place.emoji ? place.emoji : collectionForThisPlace.emoji,
      };
    });

    setCategories(getCategories(places));
    setPlaces(placesWithDefaultEmojis);

    // setApiData({
    //   collections,
    //   setCollections,
    //   places: placesWithDefaultEmojis,
    //   setPlaces,
    //   placesCollections,
    //   categories,
    // });
  }, []);

  // useEffect(() => {
  //   const login = async () => {
  //     try {
  //       const { data, error } = await supabase.auth.signInWithPassword({
  //         email: process.env.EXPO_PUBLIC_SUPABASE_EMAIL,
  //         password: process.env.EXPO_PUBLIC_SUPABASE_PASSWORD,
  //       })
  //       setLoginData(data);
  //     } catch (error) {
  //       console.error('Error logging into Supabase:', error);
  //     }
  //   }

  //   login();
  // }, [])

  // useEffect(() => {
  //   const databases = ['collections', 'places', 'places_collections'];

  //   const fetchDb = async (db) => {
  //     try {
  //       // const { data, error } = await supabase
  //       //   .from('places_collections')
  //       //   .select(`
  //       //     *,
  //       //     google_data:place_id (
  //       //       *
  //       //     ),
  //       //     places (
  //       //       *
  //       //     ),
  //       //     collections (
  //       //       *
  //       //     )
  //       //   `)
  //       const { data, error } = await supabase.rpc('get_places');

  //       console.log(data)
  //       if (error) console.error(error);
  //       return data;
  //     } catch (error) {
  //       console.error('Error fetching API data:', error);
  //     }
  //   };

  //   const fetchData = async (databases) => {
  //     // const [ collections, places, places_collections ] = await Promise.all(databases.map(db => fetchDb(db)));
  //     setApiData({
  //       collections,
  //       places,
  //       places_collections
  //     })
  //   }

  //   if (loginData) {
  //     fetchDb('places_collections')
  //     // fetchData(databases);
  //   }
  // }, [loginData]);

  return (
    <ApiContext.Provider
      value={{
        collections,
        places,
        placesCollections,
        categories,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

const useApiData = () => useContext(ApiContext);

export { ApiContext, ApiProvider, useApiData };
