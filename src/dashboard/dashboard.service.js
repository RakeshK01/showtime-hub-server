const pool = require("../../src/config/database");

exports.getCountryList = async (limit, offset) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT
            country_id,
            country_name,
            country_image,
            country_code,
            status,
            created_at,
            updated_at
        FROM
            country_table
        ORDER BY
            country_name ASC
        `;

        var arr = []
        var fncName = "getCountryList"

        if (![null, undefined].includes(limit) && ![null, undefined].includes(offset)) {

            query += ' LIMIT $1 OFFSET $2;'
            arr = [
                ...arr,
                limit,
                offset,
            ]

        }

        pool.query(query, arr, (err, result) => {
            if (err) {
                console.log(fncName, "error", err)
                reject(err)
            }
            console.log(fncName, result.rows)
            resolve(result.rows)
        })

    })
}

exports.getMovieList = async (limit, offset) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT
            movie_id,
            movie_name,
            movie_image,
            theater_id,
            country_id,
            category,
            status,
            created_at,
            updated_at
        FROM
            movie_table
        ORDER BY
            movie_name ASC
        `;

        var arr = []
        var fncName = "getMovieList"

        if (![null, undefined].includes(limit) && ![null, undefined].includes(offset)) {

            query += ' LIMIT $1 OFFSET $2;'
            arr = [
                ...arr,
                limit,
                offset,
            ]

        }

        pool.query(query, arr, (err, result) => {
            if (err) {
                console.log(fncName, "error", err)
                reject(err)
            }
            console.log(fncName, result.rows)
            resolve(result.rows)
        })

    })
}

exports.showtimeList = async (movie_id, country_id, limit, offset) => {
    return new Promise((resolve, reject) => {
        var query = `SELECT
            st.showtime_id,
            st.showtime_date,
            st.showtime_at,
            st.movie_id,
            st.booking_url,
            st.format,
            st.dubbed_language,
            st.subtitle_language,
            st.created_at,
            st.theater_id,
            tt.theater_name,
            tt.theater_image,
            tt.address,
            tt.lat,
            tt.lng
        FROM
            showtime_table st
            LEFT JOIN theater_table tt ON st.theater_id = tt.theater_id
        WHERE
            st.movie_id = $1
            AND tt.country_id = $2
            AND st.status = 'active'
            AND tt.status = 'active'
        ORDER BY st.showtime_at
        `;

        var arr = [movie_id, country_id]
        var fncName = "showtimeList"

        if (![null, undefined].includes(limit) && ![null, undefined].includes(offset)) {

            query += ' LIMIT $3 OFFSET $4'
            arr = [
                ...arr,
                limit,
                offset,
            ]

        }

        pool.query(query, arr, (err, result) => {
            if (err) {
                console.log(fncName, "error", err)
                reject(err)
            }
            console.log(fncName, result.rows)
            resolve(result.rows)
        })

    })
}

exports.updateMovieURL = async (image_url, movie_id) => {
    return new Promise((resolve, reject) => {
        var query = `UPDATE movie_table SET movie_image = $1 WHERE movie_id = $2`;

        var arr = [image_url, movie_id]
        var fncName = "showtimeList"

        pool.query(query, arr, (err, result) => {
            if (err) {
                console.log(fncName, "error", err)
                reject(err)
            }
            console.log(fncName, result.rows)
            resolve(result.rows)
        })

    })
}