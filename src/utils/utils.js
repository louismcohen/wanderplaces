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