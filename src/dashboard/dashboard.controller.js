const service = require('./dashboard.service');

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