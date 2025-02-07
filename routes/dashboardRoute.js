var express = require("express");
var router = express.Router();
const Dashboard = require("../src/dashboard/dashboard.controller");
const JWT = require("./jwtAuth/jwtAuth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
    "/country-list",
    JWT.VerifyToken,
    Dashboard.getCountryList,
);

router.post(
    "/movie-list",
    JWT.VerifyToken,
    Dashboard.getMovieList,
);

router.post(
    "/showtime-list",
    JWT.VerifyToken,
    Dashboard.getMovieShowtimes,
);

router.post(
    "/upload-movie-image",
    JWT.VerifyToken,
    upload.single("file"),
    Dashboard.uploadMovieImage,
);

module.exports = router;