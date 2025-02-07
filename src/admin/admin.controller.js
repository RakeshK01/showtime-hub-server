const service = require('./admin.service');

exports.getAdminList = async (req, res) => {

    try {

        console.log("Called getAdminLists");

        let result = await service.getAdminList();

        console.log("result", result);

        return res.status(200).json({
            code: 200,
            message: "Success",
            list: result
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