import os
import json
import csv
import argparse

def write_to_csv(data, filepath):
    with open(filepath + '.csv', 'w', newline='') as f:
        fieldnames = list(data[0].keys())
        writer = csv.DictWriter(f, fieldnames=fieldnames)

        writer.writeheader()

        for row in data:
            writer.writerow(row)

def convert_to_jsonb(obj):
    if isinstance(obj, dict):
        return {key: convert_to_jsonb(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return json.dumps([convert_to_jsonb(item) for item in obj])
    else:
        return obj

def combine_json_files(input_dir, output_dir):
    collection_id = 1
    place_id = 1
    google_id = 1
    places_collections_id = 1
    google_data = []
    collections = []
    places = []
    places_collections = []

    for filename in os.listdir(input_dir):
        if filename.endswith('.json'):
            with open(os.path.join(input_dir, filename), 'r') as file:
                data = json.load(file)
                places_to_add = []
                collection_name = os.path.splitext(filename)[0]

                for place in data:
                    duplicate_matches = [item for item in places if item.get('google_place_id') == place.get('google').get('place_id')]
                    if duplicate_matches:
                        print('duplicate found: ', place.get('title'), place_id, collection_name)
                        continue

                    # Check for invalid Google URL
                    if 'maps/search' in place.get('url'):
                        continue

                    place['_id'] = place_id
                    if 'google' in place and isinstance(place['google'], dict):
                            google = place['google']

                            google['_id'] = google_id
                            # Remove duplicate keys if they exist
                            google.pop('title', None)
                            google.pop('note', None)
                            google.pop('url', None)
                            google.pop('comment', None)

                            # Add a 'google_place_id' key to the root of the object
                            if 'place_id' in google:
                                place['google_place_id'] = google['place_id']

                            google_data.append(google)
                        
                    # Get rid of unused fields
                    place.pop('google', None)
                    place.pop('comment', None)

                    places_to_add.append(place)

                    # Places <> Collection association
                    places_collections.append({
                        '_id': places_collections_id,
                        'place_id': place_id,
                        'collection_id': collection_id,
                    })

                    place_id += 1
                    google_id += 1
                    places_collections_id += 1

                places.extend(places_to_add)

                collections.append({
                    '_id': collection_id,
                    'name': collection_name,
                    'description:': '',
                    'emoji': '',
                })
                collection_id += 1
    
    places_filepath = os.path.join(output_dir, 'places')
    with open(places_filepath + '.json', 'w') as f:
        json.dump(places, f, indent=4)
    
    write_to_csv(places, places_filepath)
    
    google_places_filepath = os.path.join(output_dir, 'google_places')
    converted_google_data = [convert_to_jsonb(item) for item in google_data]
    with open(google_places_filepath + '.json', 'w') as f:
        json.dump(converted_google_data, f, indent=4)

    places_collections_filepath = os.path.join(output_dir, 'places_collections')
    with open(places_collections_filepath + '.json', 'w') as f:
        json.dump(places_collections, f, indent=4)

    collections_filepath = os.path.join(output_dir, 'collections')

    write_to_csv(places, places_filepath)
    write_to_csv(converted_google_data, google_places_filepath)
    write_to_csv(places_collections, places_collections_filepath)
    write_to_csv(collections, collections_filepath)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Combine JSON files in a directory into one JSON file')
    parser.add_argument('input_dir', type=str, help='Path to the input directory containing JSON files')
    parser.add_argument('output_dir', type=str, help='Path to the output directory containing the JSON files')
    args = parser.parse_args()

    combine_json_files(args.input_dir, args.output_dir)