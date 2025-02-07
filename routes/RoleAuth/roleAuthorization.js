exports.Roles = {
    Admin: 'admin',
    SE: 'se',
    ASM: 'asm',
    TSI: 'tsi',
    Dist: 'dist',
}

exports.checkAuthorization = (...roles) => {

    return (req, res, next) => {
        console.log("roles", roles);
        console.log("req.decoded.role", req.decoded.role);
        if (!roles.includes(req.decoded.role)) {
            return res.status(403).json({
                code: 403,
                message: "You are not authorized for this functionality"
            })
        } else {
            next();
        }
    }

}