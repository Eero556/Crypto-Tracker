const jwt = require('jsonwebtoken')
const { APIError } = require('../error/apiError')
const { StatusCodes } = require('http-status-codes');



// Authenticate users with jwt
const authUser = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return res.status(StatusCodes.FORBIDDEN).json({status: "No Token!"})
    }
    try{
        const user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next()
    }catch(err){
        throw new APIError("Not authorized!",StatusCodes.UNAUTHORIZED)
    }
    
}






// Authorize permissions. Give admin more power etc
const authPerms = (...roles) => {
    return (req, res, next) => {
        // wont allow persons without allowed group
        if (!roles.includes(req.user.role)) {
            throw new APIError('Unauthorized to access this route', StatusCodes.FORBIDDEN)
        }
        next()
    }
}

module.exports = { authUser, authPerms }
