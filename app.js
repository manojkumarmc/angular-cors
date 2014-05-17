var express = require('express');
var http = require('http');
var path = require('path');
var cors = require('cors');

var app = express();
var clientDir = path.join(__dirname, 'client');

var enableCORS = function(req, res, next) {
    console.log('inside enableCORS');

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
 
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};


// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(enableCORS);
app.use(app.router);

app.use(express.static(clientDir));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req, res) {
  console.log('get / resource')
  res.sendfile(path.join(clientDir, 'index.html'))
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Server listening - http://localhost: ' + app.get('port'));
});
