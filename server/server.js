const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/database');
var http = require('http');


var todoapi= require('./routes/app');
// Connect To Database
mongoose.Promise = global.Promise;
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

var server = http.createServer(app);


// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


//it is for connecting to the app it's self for web browsers
// Set Static Folder
//app.use(express.static(path.join(__dirname, '../App/www')));

// Body Parser Middleware
app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));


//app.use('/', index);
app.use('/api',todoapi);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
