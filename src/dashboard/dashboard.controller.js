const service = require('./dashboard.service');

exports.getCountryList = async (req, res) => {

    try {

        let json = {
            code: 200,
            message: "Success",
            country_list: [],
        }

        json.country_list = await service.getCountryList();

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

        let json = {
            code: 200,
            message: "Success",
            movie_list: [],
        }

        json.movie_list = await service.getMovieList();

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