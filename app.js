const express = require('express');
const path = require('path');
const route = require('./controllers/route');
const api = require('./controllers/api');
const app = express();

//configuration data
const port = process.env.PORT || 5000;
const viewsDir = './src';
const publicDir = './public';

//configuration
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, viewsDir));
app.use(express.static(publicDir));
app.use(express.json());

//route
app.get('/', route);
app.get('/shorten/:name', route);

//api
app.all('/api/query', api);


app.listen(port, () => console.log(`App is running on port:${port}`));