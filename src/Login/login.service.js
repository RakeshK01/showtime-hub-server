const pool = require('../config/database');
const dotenv = require('dotenv');

exports.checkAdminExists = async (email, mobile_no) => {

    return new Promise((resolve, reject) => {

        var Query = 'SELECT COUNT(*)::INTEGER FROM admin_table WHERE email = $1 OR mobile_no = $2;';

        var Arr = [email, mobile_no]

        var fncName = "checkAdminExists"

        pool.query(Query, Arr, (err, result) => {
            if (err) {
                console.log(fncName, "error", err)
                reject(err)
            }
            console.log(fncName, result.rows)
            resolve(result.rowCount)
        })

    })
}

exports.adminSignup = async (first_name, last_name, zone_id, profile_image, email, mobile_no, password, whatsapp_no, address, lat, lng, role_id) => {

    return new Promise((resolve, reject) => {

        const currentDate = new Date().toDateString();

        var Query = 'INSERT INTO admin_table (first_name, last_name, zone_id, profile_image, email, mobile_no, password, whatsapp_no, address, lat, lng, role_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13);';

        var Arr = [first_name, last_name, zone_id, profile_image, email, mobile_no, password, whatsapp_no, address, lat, lng, role_id, currentDate]

        var fncName = "adminSignup"

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


exports.GetLoginCredentials = async (json) => {

    return new Promise((resolve, reject) => {
        var query = `SELECT ut.user_id, ut.name, ut.email, ut.password, ut.status, urt.role_code as role, urt.status as role_status 
        FROM user_table ut
        LEFT JOIN user_role_table as urt ON urt.role_id = ut.role_id
        WHERE email = $1;`;

        pool.query(query, [json.email], (err, result) => {
            if (err){
                reject(err)
                console.log("error", err)
            } 
            resolve(result.rows[0])
        })

    })
}

exports.forgotPassword = async (json) => {
    return new Promise((resolve, reject) => {
        const mobile = json.mobile_no;
        console.log("Mobile: ", mobile)

        const authkey = process.env.MSG91_AUTH;
        const template_id = process.env.MSG91_template_id;


        var options = {
            'method': 'POST',
            'url': `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=91${mobile}&authkey=${authkey}&otp_length=6`,
            'headers': {
                'Authorization': `key=${authkey}`,
                'Content-Type': 'application/json'
            }
        }


        // console.log('authkey', authkey)
        // console.log('template_id', template_id)
        // console.log('url: ', `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=91${mobile}&authkey=${authkey}&otp_length=6`)

        request.get(options, (error, response, body) => {
            console.log(error, "OTPError")
            console.log(response, "OTPSuccess")

            if (error) {
                reject(error)
            }

            if (response.statusCode === 200) {
                resolve(response.body)
            }
        })
    })
}

exports.verifyOtp = async (json) => {
    return new Promise((resolve, reject) => {
        const mobile = json.mobile_no;
        const otp = json.otp;
        console.log("Mobile: ", mobile)
        console.log("OTP: ", otp)

        const authkey = process.env.MSG91_AUTH;


        var options = {
            'method': 'POST',
            // 'url': `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=91${mobile}&authkey=${authkey}&otp_length=6`,
            'url': `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}&authkey=${authkey}`,
            'headers': {
                'Authorization': `key=${authkey}`,
                'Content-Type': 'application/json'
            }
        }


        console.log('authkey', authkey)
        console.log('url: ', `https://api.msg91.com/api/v5/otp/verify?mobile=91${mobile}&otp=${otp}&authkey=${authkey}`)

        request.get(options, (error, response, body) => {
            if (error) {
                reject(error)
            }

            let responseBody = JSON.parse(response.body)

            console.log(responseBody)

            console.log(responseBody.message)

            if (responseBody.type == "error") {
                reject(responseBody.message)
            }

            if (responseBody.type == "success") {
                resolve(responseBody)
            }

            reject("Something Went Wrong!")

        })
    })
}

exports.changePassword = async (json) => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE admin_table SET password = $1 WHERE mobile_no = $2;"

        pool.query(
            query,
            [json.password, json.mobile_no],
            (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            }
        )

    });
}

exports.getAdminCount = async (json) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT COUNT(admin_id) AS admin_count FROM admin_table WHERE mobile_no = $1;"

        pool.query(
            query,
            [json.mobile_no],
            (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result.rows[0].admin_count)
                }
            }
        )

    });
}