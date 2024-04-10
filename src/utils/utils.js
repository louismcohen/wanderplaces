import _ from 'lodash';
import JsonSearch from 'search-array';

export const getFilteredPlaces = (collectionName, places, query) => {
    const queryLowerCase = query.toLowerCase();
    const filtered = places.filter(place => 
            place.name === collectionName && (
            place.title.toLowerCase().includes(queryLowerCase)
            || place.primaryCategory.toLowerCase().includes(queryLowerCase)
            || place?.note.toLowerCase().includes(queryLowerCase))
        )   

    return filtered;
}

export const filterData = (query, data, fields) => {
    const results = data.filter((item) => {
        const found = fields.map((field) => {
            return _.get(item, field)
                ?.toLowerCase()
                .includes(query.toLowerCase());
        });

        const matchCount = found.filter((item) => !!item).length;

        return matchCount > 0;
    });

    return results;
};

export const QuickJsonSearch = (query, data) => {
    const searcher = new JsonSearch(data);
    const filtered = searcher.query(query);
    return filtered;
}

export const searchPlacesCollections = (query, collections, places) => {
    const placesSearcher = new JsonSearch(places);
    const filteredPlaces = placesSearcher.query(query);
    console.log({filteredPlaces});

    const collectionsSearcher = new JsonSearch(collections);
    const filteredCollections = collectionsSearcher.query(query);
    console.log({filteredCollections});

    const collectionsFoundFromPlaces = collections.some(collection => filteredPlaces.map(place => place.collection_id).includes(collection._id));
    const result = [...new Set([...filteredCollections, collectionsFoundFromPlaces])];

    return result;
}