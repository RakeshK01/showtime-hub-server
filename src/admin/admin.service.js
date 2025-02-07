const pool = require("../../src/config/database");

exports.getAdminList = async () => {

    return new Promise((resolve, reject) => {

        var Query = 'SELECT * FROM admin_table ORDER BY admin_id ASC;';

        var Arr = []

        var fncName = "getAdminList"

        pool.query(Query, Arr, (err, result) => {
            if (err) {
                console.log(fncName, "error", err)
                reject(err)
            }
            console.log(fncName, result.rows)
            resolve(result.rows)
        })

    })
}
