export const getFilteredPlaces = (places, query) => {
    const queryLowerCase = query.toLowerCase();
    const filtered = places.filter(place => 
            place.title.toLowerCase().includes(queryLowerCase)
            || place.primaryCategory.toLowerCase().includes(queryLowerCase)
            || place?.note.toLowerCase().includes(queryLowerCase)
        )   

    return filtered;
}