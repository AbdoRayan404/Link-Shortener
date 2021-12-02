const express = require('express');
const {links} = require('./data');
const router = express.Router();

//configuration
router.use(express.json());

//GET QUERY API (create api)
router.get('/api/query', (req,res) =>{
    //checks
    if (req.query.linkName.length < 3) {
        res.status(400).send('Link name is shorter than 3 characters.') 
        return
    }
    if (links.hasOwnProperty(req.query.linkName)){
        res.status(400).send('Link name already exist.')
        return
    }

    links[req.query.linkName] = req.query.link;
    res.send(`succesfully created new shorten link: --/shorten/${req.query.linkName}`)

})

module.exports = router;