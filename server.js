var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//var session = require('express-session');
var fs = require('fs');

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//views path 설정
app.set('views', __dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//server creation, server is listening on port 8080.
var server = app.listen(port, function(){
    console.log("Server is listening on port 8080");
});

//static file in public directory.
app.use(express.static('public'));

var Vision = require('@google-cloud/vision');

var visionClient = Vision({
    projectId: 'hazel-phoenix-150108',
    keyFilename: __dirname+'/apikey/Tutorial Project-b63b0ae4ec5b.json'
});

var Food = require('./models/food');

var router = require('./routes')(app, fs, Food, visionClient); // import main.js as a moudle (we already exported main.js as a new module.)

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("connected to mongoDB server");
});

mongoose.Promise = global.Promise;


//create connection!
mongoose.connect('mongodb://localhost/test');
//mongoose.connect('mongodb://username:password@host:port/databse?options...');
