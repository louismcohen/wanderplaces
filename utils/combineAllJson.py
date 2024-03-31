import os
import sys
import json

# Function to combine JSON files into a single JSON array
def combine_json_files(directory):
    combined_data = []
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            with open(os.path.join(directory, filename), "r") as file:
                json_data = json.load(file)
                combined_data.append({os.path.splitext(filename)[0]: json_data})
    return combined_data

# Check if the directory path is provided as an argument
if len(sys.argv) < 2:
    print("Usage: python script.py <directory_path>")
    sys.exit(1)

directory = sys.argv[1]

# Check if the directory exists
if not os.path.isdir(directory):
    print(f"Error: Directory '{directory}' not found.")
    sys.exit(1)

# Combine JSON files
combined_json = combine_json_files(directory)

# Write combined data to a new JSON file
output_file = os.path.join(directory, "combined_data.json")
with open(output_file, "w") as outfile:
    json.dump(combined_json, outfile, indent=2)

print(f"Combined JSON data written to {output_file}")
