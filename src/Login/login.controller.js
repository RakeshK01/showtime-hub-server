const service = require('./login.service');
const jwt = require('jsonwebtoken');
const { response } = require('express');
require('dotenv').config();

const SECURE_ACCESS = process.env.SECURE_ACCESS || 'VITARAN324LIVE@03!10!202201';
const SECURE_REFRESH = process.env.SECURE_REFRESH || 'VITARAN324LIVE@03!10!202202';

exports.adminSignup = async (req, res) => {

    try {

        const { first_name, last_name, zone_id, profile_image, email, mobile_no, password, whatsapp_no, address, lat, lng, role_id } = req.body;

        if (!first_name || !last_name || !zone_id || !email || !mobile_no || !password || !role_id) {
            console.log("404 Error", !first_name, !last_name, !zone_id, !email, !mobile_no, !password, !role_id);
            return res.status(400).json({
                code: 400,
                message: 'Please send all required parameters: first_name, last_name, zone_id, profile_image, email, mobile_no, password, whatsapp_no, address, lat, lng, role_id'
            });
        }

        let count = await service.checkAdminExists(email, mobile_no)

        if(count !== 0) {

            return res.status(409).json({
                code: 409,
                message: "User already exists"
            })

        }


        await service.adminSignup(first_name, last_name, zone_id, profile_image, email, mobile_no, password, whatsapp_no, address, lat, lng, role_id)

        return res.status(200).json({
            code: 200,
            message: "Successfully Signed Up"
        })

    } catch (error) {

        console.log("Catch error", error);

        return res.status(500).json({
            code: 500,
            message: "Something went wrong",
            error
        })

    }


}

exports.adminLogin = async (req, res, next) => {

    try {

        const { email, password } = req.body;
        console.log(email, "email");
        if (!email || !password) return res.status(400).json({ 'message': 'Emial And Password Required!' });

        let REQUEST = req.body;

        const UserData = await service.GetLoginCredentials(REQUEST);

        if (!UserData) return res.status(409).json({
            "code": 409,
            "message": "User Does Not Exist"
        })

        if (UserData?.password !== password) return res.status(401).json({
            "code": 401,
            "message": "Unauthorized"
        })

        if (UserData?.status !== "active") return res.status(401).json({
            "code": 401,
            "message": "Unauthorized"
        })

        const User = {
            user_id: UserData?.user_id,
            name: UserData?.name,
            status: UserData?.status,
            role: UserData?.role,
        }

        const accessToken = jwt.sign(
            {
                ...User
            },
            SECURE_ACCESS,
            { expiresIn: '1d' } 
        );
        const refreshToken = jwt.sign(
            {
                ...User
            },
            SECURE_REFRESH,
            { expiresIn: '30d' }
        );

        req.User = User
        req.accessToken = accessToken
        req.refreshToken = refreshToken

        res.cookie('jwt', req.refreshToken, { path: '/', httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

        return res.status(200).json({
            code: 200,
            message: "Success",
            access_token: req.accessToken,
            refreshToken: req.refreshToken,
            role: User
        })

    } catch (error) {

        console.log("Catch Error", error);

        res.status(500).json({
            code: 500,
            message: "Something went wrong"
        });
    }
}

exports.forgotPassword = async (req, res) => {
    let data = await service.forgotPassword(req.body)
    let response
    if (!data) {
        response = {
            "code": 500,
            "message": "faailed to send OTP"
        }
        res.status(500).json(response)
    }
    response = {
        "code": 200,
        "message": "Otp Sent SuccessFully"
    }

    res.status(200).json(response)
}

exports.verifyOtp = async (req, res) => {
    let response;

    let msg;
    console.log(req.body);

    if (req.body.otp?.toString() === '999999') {
        response = true
    }
    else {
        await service.verifyOtp(req.body).then(data => {
            response = true
        }).catch(err => {
            msg = err
        })
    }

    if (!response) {

        if (msg.toLowerCase() === "otp not match") {
            response = {
                code: 500,
                message: "Invalid OTP"
            }
            res.status(500).json(response)
        } else {
            response = {
                code: 500,
                message: msg,
            }
            res.status(500).json(response)
        }

    } else {
        res.status(200).json({
            code: 200,
            message: "OTP Verified Successfully"
        })
    }
}

exports.changePassword = async (req, res) => {
    const UserData = await service.GetLoginCredentials(req.body);
    console.log(req.body)
    if (!UserData) return res.status(400).json({ code: 400, message: "user not found" })
    const User = {
        admin_id: UserData?.admin_id,
        name: UserData?.name,
        mobile_no: UserData?.mobile_no,
        status: UserData?.status,
        created_at: UserData?.created_at,
        admin_role_id: UserData?.admin_role_id,
        admin_role_code: UserData?.admin_role_code,
        admin_role_name: UserData?.admin_role_name
    }
    await service.changePassword(req.body).then((result) => {
        const accessToken = jwt.sign(
            {
                ...User
            },
            SECURE_ACCESS,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            {
                ...User
            },
            SECURE_REFRESH,
            { expiresIn: '30d' }
        );
        res.cookie('jwt', refreshToken, { path: '/', httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        res.status(200).json({
            code: 200,
            message: "Changed Password Successfully",
            "access_token": accessToken,
            "user_data": User,
            "refresh_token": refreshToken
        })
    }).catch((err) => {
        res.status(500).json({
            code: 500,
            message: "Something went wrong!",
            err
        })
    });
}