export const getPlacePhotoUri = async ({ name, maxHeight, maxWidth }) => {
    if (!name) return;
    if (!maxHeight && !maxWidth) return;

    const photoUrlBase = `https://places.googleapis.com/v1/${name}/media?key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
    let params = [];
    if (maxHeight) {
        params.push(`&maxHeightPx=${maxHeight}`);
    }

    if (maxWidth) {
        params.push(`&maxWidthPx=${maxWidth}`);
    }

    const photoUrl = photoUrlBase + params;

    try {
        const response = await fetch(photoUrl); 
        return response.url;
    } catch (error) {
        console.error(error);
        return error;
    }
}