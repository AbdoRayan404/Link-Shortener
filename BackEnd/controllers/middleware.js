const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRETKEY

const verifyToken = (req, res, next) =>{
    const authHeader = req.headers["x-access-token"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) return res.sendStatus(403);

    jwt.verify(token, secretKey, (err,user)=>{
        if(err) return res.sendStatus(404);

        req.user = user

        next();
    })
}

const createToken = (user) =>{
    
    const accessToken = jwt.sign(user, secretKey)

    return accessToken
}

module.exports = {verifyToken, createToken}