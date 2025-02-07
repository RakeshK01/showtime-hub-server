from db_config import get_db_connection

def insertTheater(theater_name, country_id, address, lat, lng):
    
    query = """
        INSERT INTO theater_table (theater_name, country_id, address, lat, lng)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING theater_id;
    """
    
    fncName = 'insertTheater'

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(query, (theater_name, country_id, address, lat, lng))  # Efficient batch insert
            conn.commit()
            columns = [column[0] for column in cursor.description]
            data = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return data
        except Exception as e:
            print(fncName, "Error:", e)
            conn.rollback()
        finally:
            cursor.close()
            conn.close()


def insertMovie(movie_name, theater_id, country_id, category):
    
    query = """
        INSERT INTO movie_table (movie_name, theater_id, country_id, category)
        VALUES (%s, %s, %s, %s)
        RETURNING movie_id;
    """
    
    fncName = 'insertMovie'

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(query, (movie_name, theater_id, country_id, category))  # Efficient batch insert
            conn.commit()
            columns = [column[0] for column in cursor.description]
            data = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return data
        except Exception as e:
            print(fncName, "Error:", e)
            conn.rollback()
        finally:
            cursor.close()
            conn.close()


def insertShowtime(movie_id, date, time, format, dubbed_language, subtitle_language, booking_url, theater_id):
    
    query = """
        INSERT INTO showtime_table (movie_id, showtime_date, showtime_at, format, dubbed_language, subtitle_language, booking_url, theater_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING showtime_id;
    """
    
    fncName = 'insertShowtime'

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(query, (movie_id, date, time, format, dubbed_language, subtitle_language, booking_url, theater_id))
            conn.commit()
            columns = [column[0] for column in cursor.description]
            data = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return data
        except Exception as e:
            print(fncName, "Error:", e)
            conn.rollback()
        finally:
            cursor.close()
            conn.close()



def checkMovieExists(movie_name):
    
    movie_name = str(movie_name).lower()
    
    query = """
        SELECT movie_id, movie_name FROM movie_table 
        WHERE lower(movie_name) LIKE %s
    """
    
    fncName = 'checkMovieExists'

    conn = get_db_connection()
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute(query, (f"%{movie_name}%",))  # ✅ Correct parameterized query
            conn.commit()
            columns = [column[0] for column in cursor.description]
            data = [dict(zip(columns, row)) for row in cursor.fetchall()]
            return data
        except Exception as e:
            print(fncName, "Error: ", e)
            conn.rollback()
        finally:
            cursor.close()
            conn.close()
