import os
import json
import requests
import pandas as pd
from dotenv import load_dotenv

def load_yelp_bookmarks(json_file, limit=None):
    """Load Yelp bookmarks from a JSON file"""
    with open(json_file, 'r') as f:
        # If it's a list of bookmarks
        if isinstance(json.load(f), list):
            with open(json_file, 'r') as f:
                bookmarks = json.load(f)[::-1]
        else:
            # If it's a single bookmark or different structure
            with open(json_file, 'r') as f:
                bookmarks = [json.load(f)]
    
    processed_bookmarks = []
    for bookmark in bookmarks[:limit]:
        processed_bookmarks.append({
            'name': bookmark.get('name', ''),
            'address': ' '.join(bookmark.get('location', {}).get('display_address', [])),
            'note': bookmark.get('note', ''),
            'lat': bookmark.get('coordinates', {}).get('latitude'),
            'lng': bookmark.get('coordinates', {}).get('longitude')
        })
    
    return pd.DataFrame(processed_bookmarks)

def get_place_details(name, address, location, serper_api_key, yelp_lat, yelp_lng, lat_tolerance=0.001, lng_tolerance=0.001):
    """Fetch place details using Serper API"""
    url = "https://google.serper.dev/places"
    payload = json.dumps({
        "q": f"{name} {address}",
        "location": location
    })
    headers = {
        'X-API-KEY': serper_api_key,
        'Content-Type': 'application/json'
    }
    
    response = requests.post(url, headers=headers, data=payload)
    data = response.json()
    
    if data.get('places'):
        # Check first result and subsequent results
        for place in data['places']:
            if (abs(place['latitude'] - yelp_lat) <= lat_tolerance and 
                abs(place['longitude'] - yelp_lng) <= lng_tolerance):
                return {
                    'cid': place.get('cid'),
                    'url': f"http://maps.google.com/?cid={place.get('cid')}",
                    'latitude': place.get('latitude'),
                    'longitude': place.get('longitude')
                }
    
    return None

def batch_place_lookup(df, serper_api_key, location="United States"):
    """Add place details to DataFrame"""
    df['place_details'] = df.apply(
        lambda row: get_place_details(
            row['name'], 
            row['address'], 
            location, 
            serper_api_key, 
            row['lat'], 
            row['lng']
        ), 
        axis=1
    )
    
    # Extract specific fields
    df['cid'] = df['place_details'].apply(lambda x: x['cid'] if x else None)
    df['maps_url'] = df['place_details'].apply(lambda x: x['url'] if x else None)
    
    # Drop intermediate column
    df.drop(columns=['place_details'], inplace=True)
    
    return df

def main():
    dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    load_dotenv(dotenv_path)
    serper_api_key = os.getenv('SERPER_API_KEY')
    
    yelp_bookmarks = load_yelp_bookmarks('yelp-collections.yelpbusinesses.json', limit=3)
    result_df = batch_place_lookup(yelp_bookmarks, serper_api_key)

    # Rename and select columns as requested
    result_df = result_df.rename(columns={
        'name': 'Title',
        'note': 'Note',
        'maps_url': 'URL'
    })
    
    # Select only the specified columns
    result_df = result_df[['Title', 'Note', 'URL']]
    
    result_df.to_csv('yelp_bookmarks_with_place_details.csv', index=False)
    print(result_df)

if __name__ == '__main__':
    main()