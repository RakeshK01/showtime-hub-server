exports.RoleAuth =(req,res,roles,next)=>{
    try {
       let Data =  req.decoded;

       console.log(roles,"Data")
       next()
        
    } catch (error) {
         return res.status(500).json({
            "code":500,
            "message": "Internal server Error"
         })
    }
}