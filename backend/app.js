const express = require('express');
const http = require('http');
const expressEjsLayout = require('express-ejs-layouts');
const path = require('path');
const fileRouter = require('./routes/file');
const upload = require('express-fileupload');
require('dotenv').config()

var app = express();
var server = http.createServer(app);
const port = process.env.PORT;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", `*`); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(upload());

app.use(expressEjsLayout);
// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Hello World");
});

const dbRoutes = require('./src/routes/dbRoutes');
const studentRoutes = require('./src/routes/userRoutes');

app.use('/files', fileRouter);
app.use('/api', dbRoutes);
app.use('/users', studentRoutes);

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

module.exports = app;