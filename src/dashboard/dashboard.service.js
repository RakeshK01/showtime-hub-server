const pool = require("../../src/config/database");

exports.getCountryList = async () => {
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
            country_name ASC;`;

        var arr = []
        var fncName = "getCountryList"

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

exports.getMovieList = async () => {
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
            movie_name ASC;`;

        var arr = []
        var fncName = "getMovieList"

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