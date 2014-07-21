var express = require('express'),
    app = express(),
    load = require('express-load'),
    server = require('http').createServer(app),
    fs = require('fs'),
    io = require('socket.io').listen(server),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    moment = require('moment');
    
  
/*

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

*/

io.set('transports', ['xhr-polling']);

//set port
var port = Number(process.env.PORT || 8080);
server.listen(port, function() {
  console.log("Listening on " + port);
});

//set diretorio de view
app.set('views', __dirname + '/views');

//seta statica publica
app.use(express.static(__dirname + '/public'));

//seta o tipo de view
app.set('view engine', 'ejs');

//set cookie and parse post request
app.use(cookieParser());
app.use(session({keys: ["painel-mercadopago"]}));
app.use(bodyParser());

//use moment in app
app.moment = moment

//save socket in app  
app.io = io;

//init mp
var MP = require ("mercadopago");
app.mp = new MP ("3100176199951133", "PHtTUr4gzvOheDtZsAWTqvOMIQ0kOKA8");

load('models')
    .then('controllers')
    .then('routes')
    .into(app);
    
    
