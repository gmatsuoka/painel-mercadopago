var express = require('express'),
    app = express(),
    load = require('express-load'),
    server = require('http').createServer(app),
    fs = require('fs'),
    io = require('socket.io').listen(server),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    moment = require('moment'),
    MP = require ("mercadopago"),
    elasticsearch = require('elasticsearch');
  

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

//inicia variavel de notificacoes
app.notify_me = [];

//add elasticsearch
app.es = new elasticsearch.Client({
  host: 'https://o4fgzv2a:58ul4pc0p5x0w18r@ginkgo-4366083.us-east-1.bonsai.io:443',
  log: 'trace'
});


//add mp
//user de teste
//app.mp = new MP ("3100176199951133", "PHtTUr4gzvOheDtZsAWTqvOMIQ0kOKA8");
app.mp = new MP ("8026333412364244", "5PhQqCKuEEQ4jMSvtoz0FgHQmcfBXCx2");

load('models')
    .then('controllers')
    .then('routes')
    .into(app);
    
    
