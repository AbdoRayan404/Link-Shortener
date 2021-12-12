const express = require('express');
const {data,links,users} = require('./data');
const router = express.Router();


router.get('/shorten/:name', (req,res) =>{
    //checks
    if(!links.hasOwnProperty(req.params.name)){
        res.status(404).send('this shorten link doesn\'t exist.')
        return
    }

    res.redirect(links[req.params.name])
})

module.exports = router;