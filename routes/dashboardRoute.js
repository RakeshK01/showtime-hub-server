var express = require("express");
var router = express.Router();
const Dashboard = require("../src/dashboard/dashboard.controller");
const JWT = require("./jwtAuth/jwtAuth");

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

module.exports = router;