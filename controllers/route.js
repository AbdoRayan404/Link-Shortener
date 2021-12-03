const express = require('express');
const {data,links} = require('./data');
const router = express.Router();


router.get('/', (req,res) =>{
    res.render('index', data)
})

router.get('/logged', (req,res) =>{
    let dataSent = {
        username: req.query.username, 
        password: req.query.password
    }

    res.render('logged', dataSent)
})

router.get('/shorten/:name', (req,res) =>{
    //checks
    if(!links.hasOwnProperty(req.params.name)){
        res.status(404).send('this shorten link doesn\'t exist.')
        return
    }

    res.render('redirect', { "link": links[req.params.name]})
})

module.exports = router;