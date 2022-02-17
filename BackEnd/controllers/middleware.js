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

const log = (req, res, next) =>{
    let date = new Date();

    console.log(`IP:${req.ip}, REQ-METHOD:${req.route.stack[0].method}, PATH:${req.path}, TIME:${date.getFullYear()}-${date.getMonth()}-${date.getDate()}:${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}, X-Access-Token:${req.headers["x-access-token"]}`);

    next();
}

module.exports = {verifyToken, createToken, log}