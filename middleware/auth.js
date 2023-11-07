const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){

    // get the token from the header
    const token = req.header('x-auth-token');
    //check if no token
    if(!token){
        res.status(401).json({msg:'No token, authorization is denied'})
    }
    // verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user; // we are setting the user to the request object once jwt verified successfully
        next();
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'});
    }
}