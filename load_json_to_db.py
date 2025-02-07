from db_service import insertTheater, insertMovie, insertShowtime, checkMovieExists

def getDataValue(data):
    
    value = None
    
    if str(data).lower().strip() not in ["na", "n/a", ""]:
        value = data
        
    return value

def saveData(data, index):
    
    print("\n\n")
    
    required_keys = ['theater_name', 'address', 'latitude', 'longitude', 'movies']
    
    if any(key not in data for key in required_keys):
        print("Some of the keys are not present in the theater")
        return
    else:
        print("All of the keys are present in the theater")
        
    print(f"{index} - {data['theater_name']}")
    
    theaterName = getDataValue(data['theater_name'])
        
    if theaterName == None:
        print("Theater name doesn't exist")
        return
        
    address = getDataValue(data['address'])
        
    latitude = getDataValue(data['latitude'])
        
    longitude = getDataValue(data['longitude'])
    
    countryID = 1
    
    print(f"theaterName {theaterName}")
    print(f"address {address}")
    print(f"latitude {latitude}")
    print(f"longitude {longitude}")
    
    theater_results = insertTheater(theaterName, countryID, address, latitude, longitude)
    
    print(theater_results)
    
    if isinstance(theater_results, list) and len(theater_results) > 0:
        
        theaterID = theater_results[0]['theater_id']
        
        if isinstance(data['movies'], list):
            
            for i in range(len(data['movies'])):
                
                movie = data['movies'][i]
                movieName = getDataValue(movie['movie_name'])
                category = getDataValue(movie['category'])
        
                if movieName == None:
                    print("Movie Name doesn't exist")
                    continue
                
                movie_exists_list = checkMovieExists(movieName)
                
                movieID = None
                
                if isinstance(movie_exists_list, list) and len(movie_exists_list) > 0:
                    movieID = movie_exists_list[0]['movie_id']
                    print("Movie Exists In Same Name")
                else:
                    movie_results = insertMovie(movieName, theaterID, countryID, category)
                    if isinstance(movie_results, list) and len(movie_results) > 0:
                        print("Adding New Movie")
                        movieID = movie_results[0]['movie_id']
                    
                print("movieID", movieID)
                
                if isinstance(movie['showtimes'], list):
        
                    for j in range(len(movie['showtimes'])):
                        
                        showtime = movie['showtimes'][j]
                        date = getDataValue(showtime['date'])
                
                        if date == None:
                            print("Date doesn't exist")
                            continue
                
                        if isinstance(showtime['times'], list):
                
                            for k in range(len(showtime['times'])):
            
                                showtimeDetails = showtime['times'][k]
                                time = getDataValue(showtimeDetails['time'])
                                format = getDataValue(showtimeDetails['format'])
                                dubbedLanguage = getDataValue(showtimeDetails['dubbed_language'])
                                subtitleLanguage = getDataValue(showtimeDetails['subtitle_language'])
                                bookingURL = getDataValue(showtimeDetails['booking_url'])
                        
                                if time == None:
                                    print("Time doesn't exist")
                                    continue
                                
                                time = f"{date} {time}:00"
                                
                                print("time", time)
                                
                                showtime_results = insertShowtime(movieID, date, time, format, dubbedLanguage, subtitleLanguage, bookingURL)
                                
                                if isinstance(showtime_results, list) and len(showtime_results) > 0:
                        
                                    showtimeID = showtime_results[0]['showtime_id']
                                    
                                    print("showtimeID", showtimeID)