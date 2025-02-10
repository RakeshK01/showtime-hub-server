# from load_json_to_db import saveData
# import json

# def main():
#     # Open and read the JSON file
#     with open('result/movies_data_128.json', 'r') as file:
#         theaterDetails = json.load(file)
        
#     isObject = isinstance(theaterDetails, dict)
#     isArray = isinstance(theaterDetails, list)

#     if isObject:
#         print("\n\nThe data is a JSON Object")
#         saveData(theaterDetails, 1)
#     elif isArray:
#         print(f"\n\nThe data is a JSON List with {len(theaterDetails)} theaters")
#         for i in range(len(theaterDetails)):
#             saveData(theaterDetails[i], i+1)

# if __name__ == "__main__":
#     main()

from load_json_to_db import saveData
import json
import os
from multiprocessing import Pool
from pathlib import Path

def process_file(file_path):
    """Process a single JSON file and save its data."""
    try:
        with open(file_path, 'r') as file:
            theater_details = json.load(file)
        
        # Check if the data is an object or array
        if isinstance(theater_details, dict):
            print(f"\nProcessing object from {file_path}")
            saveData(theater_details, 1)
        elif isinstance(theater_details, list):
            print(f"\nProcessing list of {len(theater_details)} theaters from {file_path}")
            for i, theater in enumerate(theater_details):
                saveData(theater, i+1)
        
        return f"Successfully processed {file_path}"
    except Exception as e:
        return f"Error processing {file_path}: {str(e)}"

def main():
    # Directory containing JSON files
    json_dir = Path(r'D:\Poland_movies_result')
    
    # Ensure the directory exists
    if not json_dir.exists():
        print(f"Directory {json_dir} does not exist")
        return
    
    # Get all JSON files from the directory
    json_files = list(json_dir.glob('*.json'))
    
    if not json_files:
        print(f"No JSON files found in {json_dir}")
        return
    
    print(f"Found {len(json_files)} JSON files to process")
    
    # Number of processes to run in parallel
    # You can adjust this based on your system's capabilities
    num_processes = min(len(json_files), os.cpu_count() or 1)
    
    print(f"Processing with {num_processes} parallel processes")
    
    # Create a pool of workers
    with Pool(processes=num_processes) as pool:
        # Process all files in parallel
        results = pool.map(process_file, json_files)
    
    # Print results
    for result in results:
        print(result)

if __name__ == "__main__":
    main()
