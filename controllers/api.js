//V1.1.0 TODO
//TODO: register api --done--
//INFO: requires: username 5-16 chars, password 8-16 chars 
//TODO: POST api (Create) --done--
//INFO: requires: username/password/linkName/link
//TODO: POST api (Read) --done--
//INFO: requires: username/password, response: all user links
//TODO: DELETE api (Delete) --done--
//INFO: requires: username/password/linkName

const express = require('express');
const {links,users} = require('./data');
const router = express.Router();

//configuration
router.use(express.json());

//POST API (Create account)
//requires: String 5-16, String 5-16
router.post('/api/users/register', (req,res) =>{
    ///input-check///
    if (inputCheck(req.body.username, req.body.password)){
        res.status(400).send('Wrong credentials.')
        return
    }
    ///data-check///
    if(users.hasOwnProperty(req.body.username)){
        res.status(400).send('this username already exist.')
        return
    }

    ///create new user object///
    users[req.body.username] = {
        "password": req.body.username,
        "links": {

        }
    }

    ///response///
    res.status(200).send(users[req.body.username])
})

//POST API (Read-account links)
//requires: username/password
router.post('/api/users/', (req,res) =>{
    ///input-check///
    if (inputCheck(req.body.username, req.body.password)){
        res.status(400).send('Wrong credentials.')
        return
    }

    ///data-check///
    if (dataCheck(req.body.username,req.body.password)){
        res.status(400).send('Wrong credentials.')
        return
    }


    //response
    res.status(200).send(users[req.body.username]["links"])
})

//POST API (Create-Link)
//requires: username/password/linkName/link
router.post('/api/users/links', (req,res) =>{
    ///input-check///
    if (inputCheck(req.body.username, req.body.password)){
        res.status(400).send('Wrong credentials.')
        return
    }

    ///data-check///
    if (dataCheck(req.body.username, req.body.password, req.body.linkName)){
        res.status(400).send('Wrong credentials.')
        return
    }

    //response
    links[req.body.linkName] = req.body.link;
    users[req.body.username]["links"][req.body.linkName] = req.body.link
    res.status(200).send('Created link successfuly.')
})

//DELETE api (Delete)
//requires: username/password/linkName
router.delete('/api/users/links', (req,res) =>{
    ///input-check///
    if (inputCheck(req.body.username, req.body.password)){
        res.status(400).send('Wrong credentials.')
        return
    }

    ///data-check///
    if (dataCheck(req.body.username,req.body.password,req.body.linkName,2)){
        res.status(400).send('Wrong credentials.')
        return
    }

    ///response///
    delete links[req.body.linkName]
    delete users[req.body.username]["links"][req.body.linkName]
    res.status(200).send('Deleted the link successfuly.')
})

const inputCheck = (username,password) =>{
    if(typeof username !== "string"){
        return 'Wrong credentials.'
    }
    if(username.length < 5 || username.length > 16){
        return 'Wrong credentials.'
    }
    if(password.length < 8 || password.length > 16){
        return 'Wrong credentials.'
    }

    return null
}

const dataCheck = (username,password,linkName, x = 1) =>{
    if(linkName && x == 1){
        if(!users.hasOwnProperty(username)){
            return ('Wrong credentials.1')
        }
        if(users[username]["password"] !== password){
            return ('Wrong credentials.2')
        }
        if(links.hasOwnProperty(linkName)){
            return ('this link does exist')
        }
    }else if(linkName && x != 1){
        if(!users.hasOwnProperty(username)){
            return ('Wrong credentials.1')
        }
        if(users[username]["password"] !== password){
            return ('Wrong credentials.2')
        }
        if(!links.hasOwnProperty(linkName)){
            return ('this link doesn\'t exist')
        }
    }
    else{
        if(!users.hasOwnProperty(username)){
            return ('Wrong credentials.')
        }
        if(users[username]["password"] !== password){
            return ('Wrong credentials.')
        }
    }

    return null
}


module.exports = router;