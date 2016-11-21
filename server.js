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

//server creation, server is listening on port 3000.
var server = app.listen(port, function(){
    console.log("Server is listening on port 3000");
});

//static file in public directory.
app.use(express.static('public'));

var Vision = require('./vision')(fs);
var Food = require('./models/food');

var router = require('./routes')(app, fs, Food); // import main.js as a moudle (we already exported main.js as a new module.)

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    console.log("connected to mongoDB server");
});

mongoose.Promise = global.Promise;


//create connection!
mongoose.connect('mongodb://localhost/mongodb_tutorial');
//mongoose.connect('mongodb://username:password@host:port/databse?options...');
