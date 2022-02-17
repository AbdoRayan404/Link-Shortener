const express = require('express');
const {links,users} = require('./data');
const router = express.Router();
const {log} = require('./middleware');

//configuration
router.use(express.json());

//JWT middleware/function
const {verifyToken, createToken} = require('./middleware');

//POST API (Create account)
//requires: String 5-16, String 5-16
router.post('/api/users/register', log, (req,res) =>{
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
    users[`${req.body.username}`] = {
        "password": req.body.password,
        "links": {

        }
    }

    ///create new JWT token///
    const user = {username: req.body.username, password: req.body.password}
    const token = createToken(user)

    ///response///
    res.status(200).send({"Authorization": `Bearer ${token}`})
})

//POST API (AUTH-account)
//requires: username/password
router.post('/api/users/login', log, (req,res) =>{
    ///input-check///
    if (inputCheck(req.body.username, req.body.password)){
        res.status(400).send('Wrong credentials.')
        return
    }

    ///data-check///
    if (CredCheck(req.body.username, req.body.password) == false){
        res.status(400).send('password/username is wrong')
        return 
    }

    ///create new JWT token///
    const user = {username: req.body.username, password: req.body.password}
    const token = createToken(user)

    ///response///
    res.status(200).send({"Authorization": `Bearer ${token}`})
})

////CRUD operatoins////

//GET API (Read-account data)
//requires: token
router.get('/api/users/', verifyToken, log, (req,res) =>{
    ///data-check///
    if (CredCheck(req.user.username, req.user.password) == false){
        res.status(400).send('password/username is wrong')
        return 
    }


    //response
    res.status(200).send(
        {"username": req.user.username,
        "links": users[req.user.username]["links"]}
        )
})

//POST API (Create-Link)
//requires: token/linkName/link
router.post('/api/users/links', verifyToken, log, (req,res) =>{
    //input-check//
    if (!req.body.hasOwnProperty("link")){
        res.status(400).send("you must provide link")
        return
    }

    ///data-check///
    if (CredCheck(req.user.username,req.user.password) == false){
        res.status(400).send('password/username is wrong')
        return 
    }
    if (linkCheck(req.body.linkName) == true){ 
        res.status(400).send('this link name already used.')
        return
    }

    //response
    links[req.body.linkName] = {"link": req.body.link, "clicks": 0, "owner": req.user.username};
    users[req.user.username]["links"][req.body.linkName] = {"link": req.body.link, "clicks": 0};
    res.status(200).send(users[req.user.username]["links"])
})

//DELETE api (Delete)
//requires: token/linkName
router.delete('/api/users/links', verifyToken, log, (req,res) =>{

    ///data-check///
    if (CredCheck(req.user.username,req.user.password) == false){
        res.status(400).send('password/username is wrong')
        return
    }
    if (linkCheck(req.body.linkName) == false){
        console.log(links)
        res.status(400).send('link Name doesn\'t exist.')
        return
    }
    if (!users[req.user.username]["links"].hasOwnProperty(req.body.linkName)){
        res.status(400).send('this link doesn\'t belong to you')
        return
    }

    ///response///
    delete links[req.body.linkName]
    delete users[req.user.username]["links"][req.body.linkName]
    res.status(200).send(users[req.user.username]["links"])
})

//PATCH api (update)
//requires: token/LinkName/newLinkData(Object)
router.patch('/api/users/links', verifyToken, log, (req,res) =>{
    let username = req.user.username
    let password = req.user.password
    let oldLink = req.body.linkName
    let newObj = req.body.linkObj

    //input-check
    if(typeof newObj != "object"){
        res.status(400).send('there must be link object.')
        return
    }
    if(!newObj.hasOwnProperty('linkName')){
        res.status(400).send('link object should have linkName')
        return
    }
    if(newObj.linkName.length < 1){
        res.status(400).send('new link name should be 1 or greater characters')
        return
    }
    if(!newObj.hasOwnProperty('link')){
        res.status(400).send('link object should have link')
        return
    }
    //input-check//


    //data-check
    if(CredCheck(username, password) == false){
        res.status(400).send('Wrong credentials.')
        return
    }
    if(linkCheck(oldLink) == false){
        res.status(400).send('This link name doesn\'t exist.')
        return
    }
    if (!users[username]["links"].hasOwnProperty(oldLink)){
        res.status(400).send('this link doesn\'t belong to you')
        return
    }

    //response
    let clicks = links[oldLink]["clicks"];
    delete links[oldLink]
    links[newObj.linkName] = {"link": newObj.link, "clicks" : clicks, "owner": username};

    delete users[req.user.username]["links"][oldLink]
    users[req.user.username]["links"][newObj.linkName] = {"link": newObj.link, "clicks": clicks}
    res.status(200).send(users[req.user.username]["links"])
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


const CredCheck = (username,password) =>{
    if(!users.hasOwnProperty(username)){
        return false
    }
    if(users[username]["password"] != password){
        return false
    }

    return true
}

const linkCheck = (linkName) =>{
    if(links.hasOwnProperty(linkName)){
        return true
    }else{
        return false
    }
}


module.exports = router;