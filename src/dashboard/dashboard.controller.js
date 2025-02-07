const service = require('./dashboard.service');

const AWS = require('aws-sdk');

var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_KEY;

const s3Client = new AWS.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'ap-south-1'
});

const uploadParams = {
    Bucket: process.env.BUCKET,
    Key: secretAccessKey, // pass key
    Body: null, // pass file body
    ACL: 'public-read'
};

exports.getCountryList = async (req, res) => {

    try {
        
        let { limit, offset } = req.body

        let json = {
            code: 200,
            message: "Success",
            country_list: [],
        }

        json.country_list = await service.getCountryList(limit, offset);

        return res.status(200).json(json)

    } catch (error) {

        console.log("Catch error", error);

        return res.status(500).json({
            code: 500,
            message: "Something went wrong",
            error
        })

    }

}

exports.getMovieList = async (req, res) => {

    try {

        let { limit, offset } = req.body
      
        let json = {
            code: 200,
            message: "Success",
            movie_list: [],
        }

        json.movie_list = await service.getMovieList(limit, offset);

        return res.status(200).json(json)

    } catch (error) {

        console.log("Catch error", error);

        return res.status(500).json({
            code: 500,
            message: "Something went wrong",
            error
        })

    }

}

exports.getMovieShowtimes = async (req, res) => {
   
    try {

        let { movie_id, country_id, limit, offset } = req.body
        console.log(req.body, "Movie");
        let json = {
            code: 200,
            message: "Success",
            showtime_list: [],
        }

        json.showtime_list = await service.showtimeList(movie_id, country_id, limit, offset);

        return res.status(200).json(json)

    } catch (error) {

        console.log("Catch error", error);

        return res.status(500).json({
            code: 500,
            message: "Something went wrong",
            error
        })

    }

}

exports.uploadMovieImage = async (req, res) => {

    console.log("image upload start");

    let path = `showtime-hub-${process.env.ENVIRONMENT}/movies/`;
    let basePath = `https://echno-tek.s3.ap-south-1.amazonaws.com/showtime-hub-${process.env.ENVIRONMENT}/movies/`

    try {

        AWS.config.setPromisesDependency();
        AWS.config.update({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            region: 'ap-south-1'
        })


        const params = uploadParams;
        var random = Math.floor(Math.random() * 10000);
        const filename = Date.now() + "-" + random + ".jpg"


        let uploadPath = '';
        uploadPath = path + filename;


        console.log("UPLOAD PATH", uploadPath);


        uploadParams.Key = uploadPath;
        console.log("req.file", req.file.buffer);
        console.log("req.body", req.body.movie_id);
        uploadParams.Body = req.file.buffer;


        s3Client.upload(params, async (err, data) => {
            if (err) {
                console.log("ERR", err);
                res.status(200).send({ code: 500, message: "Movie image not updated", error: "Error -> " + err });
            } else {

                await service.updateMovieURL(basePath + filename, req.body.movie_id)

                res.json({
                    code: 200,
                    message: 'Image uploaded successfully',
                    name: filename,
                    'path': basePath,
                    'full_path': basePath + filename
                });
            }
        });


    } catch (e) {
        console.log("SE ERROR", e);
    }


}