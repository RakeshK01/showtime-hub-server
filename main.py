from load_json_to_db import saveData
import json

def main():
    # Open and read the JSON file
    with open('result/movies_data_128.json', 'r') as file:
        theaterDetails = json.load(file)
        
    isObject = isinstance(theaterDetails, dict)
    isArray = isinstance(theaterDetails, list)

    if isObject:
        print("\n\nThe data is a JSON Object")
        saveData(theaterDetails, 1)
    elif isArray:
        print(f"\n\nThe data is a JSON List with {len(theaterDetails)} theaters")
        for i in range(len(theaterDetails)):
            saveData(theaterDetails[i], i+1)

if __name__ == "__main__":
    main()
