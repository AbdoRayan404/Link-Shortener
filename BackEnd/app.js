//V1.1.0 TODO
//TODO: login/register page --done--
//INFO: using EJS
//TODO: user page --done--
//INFO: using EJS
//TODO: register api --done--
//INFO: requires: username 5-16 chars, password 8-16 chars
//TODO: login api --done--
//INFO: requires: username/password
//TODO: POST api (Create) --done--
//INFO: requires: Token
//TODO: GET api (Read) --done--
//INFO: requires: Token
//TODO: DELETE api (Delete) --done--
//INFO: requires: Token/LinkName
//V1.2.0 TODO
//TODO: PATCH api (Update) --done--
//INFO: requires: Token/LinkName/newLinkdata(Object)
//TODO: change user page to show user his shorten-links --done--
//TODO: JWT verify middleware --done--
//TODO: JWT creation middleware --done--
//TODO: modify everything to work as the back-end design --done--
//INFO: look in the github repo...
//TODO: split the project to Back-End and Front-End --done--
//TODO: use CORS --done--

const express = require('express');
const route = require('./controllers/route');
const api = require('./controllers/api');
const cors = require('cors');
const app = express();

//configuration data
const port = process.env.PORT || 5000;

//configuration
app.use(express.json());
app.use(cors());

//route
app.get('/:name', route);

//api
app.post('/api/users/register', api); //CREATE-ACCOUNT
app.post('/api/users/login', api); //AUTH-ACCOUNT

//CRUD operations//
app.get('/api/users/', api); //READ-USER-DATA
app.post('/api/users/links', api); //CREATE-LINK
app.delete('/api/users/links', api); //DELETE-LINK
app.patch('/api/users/links', api) //UPDATE-LINK


app.listen(port, () => console.log(`App is running on port:${port}`));