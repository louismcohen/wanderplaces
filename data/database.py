import pymongo
import os
import json

# Connect to the MongoDB server running on localhost at port 27017
client = pymongo.MongoClient("mongodb+srv://louiscohen:YH1oGGZndDQAzE3B@cluster0.6jhtv.mongodb.net/")

# Create or access a database called "mydatabase"
db = client["wanderplaces"]

# Create or access a collection called "mycollection" within the "mydatabase" database
collections_collection = db["collections"]
places_collection = db["places"]

collections_list = list(collections_collection.find({}))
places_list = list(places_collection.find({}))
# print(collections)

for filename in os.listdir('.'):
    if filename.endswith(".json"):
        with open(os.path.join('.', filename), "r") as file:
            places_from_file = json.load(file)
            collection_name = os.path.splitext(filename)[0]

            collection_in_db = next((collection for collection in collections_list if collection.get("title") == collection_name), None)
            
            places = []
            for place_from_file in places_from_file:
                place_in_db = next((place for place in places_list if place.get("title") == place_from_file.get("title")), None)
                if place_in_db:
                    places.append({
                        "place_id": place_in_db.get("_id"),
                        "title": place_in_db.get("title"),
                    })
            
            filter = {"_id": collection_in_db.get("_id")}
            update = {
                "$push": {
                    "places": {
                        "$each": places
                    }
                }
            }
            collections_collection.update_one(filter, update)
                






                # print(list(map((lambda place: place.get("title")), places)))
            # else:
                # print(collection_name)
    

# Insert a document into the collection
# data = {"name": "John", "age": 30}
# insert_result = collection.insert_one(data)
# print("Inserted document id:", insert_result.inserted_id)

# Find one document in the collection
# result = collections_collection.find_one({"name": "John"})
# print("Found document:", result)

# # Update a document in the collection
# update_result = collections_collection.update_one({"name": "John"}, {"$set": {"age": 35}})
# print("Modified document count:", update_result.modified_count)

# # Delete a document from the collection
# delete_result = collections_collection.delete_one({"name": "John"})
# print("Deleted document count:", delete_result.deleted_count)

# Disconnect from the MongoDB server
client.close()