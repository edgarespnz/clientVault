const jwt = require('jsonwebtoken');

function generateAccessToken(email){
    return {
        success: true,
        message: 'Token generated successfully',
        token: jwt.sign({email}, process.env.TOKEN_SECRET, {expiresIn: '40s'}) //todo: change expiresIn to 30minutes
    }
}

function verifyToken(token){
    return jwt.verify(token, process.env.TOKEN_SECRET);
}  

module.exports = {
    generateAccessToken,
    verifyToken
}