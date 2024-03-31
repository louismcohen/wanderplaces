import os
import csv
import json
import requests
import re
import argparse

# Function to make API call and return JSON response
def make_api_call(url, headers, body):
    response = requests.post(url, headers=headers, json=body)
    if response.status_code == 200:
        return response.json()
    else:
        return None

# Function to extract substring from URL
def extract_substring(url):
    start_index = url.find('https://www.google.com/maps/place/') + len('https://www.google.com/maps/place/')
    end_index = url.find('/', start_index)
    return url[start_index:end_index]

# Function to update row with data from JSON response
def update_row(row, json_data):
    # Extract relevant fields from json_data
    place_id = json_data['places'][0]['id']
    lat = json_data['places'][0]['location']['latitude']
    lng = json_data['places'][0]['location']['longitude']
    display_name = json_data['places'][0]['displayName']['text']

    types_dirty = json_data['places'][0]['types']    
    types = [word.replace("_", " ").title() for word in types_dirty]
    types_str = ','.join(types)

    icon_base_uri = json_data['places'][0]['iconMaskBaseUri']
    icon_pattern = r'(?<=https:\/\/maps\.gstatic\.com\/mapfiles\/place_api\/icons\/v2\/).*(?=_pinlet)'
    icon_type = re.findall(icon_pattern, icon_base_uri)[0]

    rating = json_data['places'][0].get('rating')
    user_rating_count = json_data['places'][0].get('userRatingCount')

    regular_opening_hours = json_data['places'][0].get('regularOpeningHours', {})
    if regular_opening_hours:
        opening_hours = regular_opening_hours['periods']
    else:
        opening_hours = []

    short_formatted_address = json_data['places'][0].get('shortFormattedAddress', '')

    photos = json_data['places'][0].get('photos', '')

    # Update row with extracted fields
    updated_row = {
        'lat': lat, 
        'lng': lng, 
        'google': {
            'place_id': place_id, 
            'display_name': display_name, 
            'types': types_str, 
            'icon_base_uri': icon_base_uri, 
            'icon_type': icon_type, 
            'rating': rating,
            'user_rating_count': user_rating_count,
            'opening_hours': opening_hours,
            'short_formatted_address': short_formatted_address,
            'photos': photos,
        }
    }

    # Add other fields to the "google" key
    for key, value in row.items():
        if key.lower() not in ['lat', 'lng']:
            if key.lower().startswith('google_'):
                updated_row[key[len('google_'):]] = value
            else:
                updated_row['google'][key.lower()] = value

    row.update(updated_row)

# Parse command-line arguments
parser = argparse.ArgumentParser(description='Process CSV files and output as JSON with Google Places API.')
parser.add_argument('input_directory', type=str, help='Input directory containing CSV files')
parser.add_argument('output_directory', type=str, help='Output directory to write updated JSON files')
args = parser.parse_args()

# API and field mask
api_url_base = 'https://places.googleapis.com/v1/places:searchText/'
api_key = 'AIzaSyAEoV6r3-BPVwnw8MvGep1Ok1oMsNMW9ZY'
field_mask = 'places.displayName,places.id,places.location,places.photos,places.types,places.addressComponents,places.primaryTypeDisplayName,places.primaryType,places.iconMaskBaseUri,places.rating,places.userRatingCount,places.regularOpeningHours,places.shortFormattedAddress,places.photos'

# Iterate through each CSV file in the input directory
for filename in os.listdir(args.input_directory):
    if filename.endswith('.csv'):
        input_file = os.path.join(args.input_directory, filename)
        output_filename = os.path.splitext(filename)[0] + '.json'
        output_file = os.path.join(args.output_directory, output_filename)

        print(f"Processing file '{filename}'")

        # Preprocess CSV file to ensure all column names are lowercase
        with open(input_file, 'r') as file:
            csv_reader = csv.DictReader(file)
            lowercase_fieldnames = [fieldname.lower() for fieldname in csv_reader.fieldnames]

        # Process the CSV file
        with open(input_file, 'r') as file:
            csv_reader = csv.DictReader(file, fieldnames=lowercase_fieldnames)
            data = []

            for row in csv_reader:
                endpoint_url = api_url_base
                headers = {
                    'X-Goog-FieldMask': field_mask,
                    'X-Goog-Api-Key': api_key,
                    'Content-Type': 'application/json'
                }
                body = {
                    'textQuery': extract_substring(row['url'])
                }
                print(f"-- '{extract_substring(row['title'])}'")
                api_response = make_api_call(endpoint_url, headers, body)

                if api_response:
                    update_row(row, api_response)
                    data.append(row)

            with open(output_file, 'w') as output_file:
                json.dump(data, output_file, indent=4)

        print(f"JSON file '{output_filename}' created successfully.")

    else:
        print(f"Skipping file '{filename}' because it is not a CSV file.")

print("All CSV files processed and output as JSON.")
