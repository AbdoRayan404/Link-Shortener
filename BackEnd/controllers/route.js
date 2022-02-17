const express = require('express');
const {links,users} = require('./data');
const router = express.Router();
const {log} = require('./middleware');


router.get('/:name', log, (req,res) =>{
    //checks
    if(!links.hasOwnProperty(req.params.name)){
        res.status(404).send('this shorten link doesn\'t exist.')
        return
    }

    res.redirect(links[req.params.name]["link"]);

    links[req.params.name]["clicks"] += 1;
    users[links[req.params.name]["owner"]]["links"][req.params.name]["clicks"] += 1;
})

module.exports = router;