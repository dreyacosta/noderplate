var noderplate = {
  imports: {},
  app: {}
};

noderplate.imports = {
  express    : require('express'),
  http       : require('http'),
  path       : require('path'),
  bcrypt     : require('bcrypt'),
  mongoose   : require('mongoose'),
  MongoStore : require('connect-mongo')
};

var express                    = noderplate.imports.express,
    http                       = noderplate.imports.http;
    noderplate.app             = express(),
    server                     = http.createServer(noderplate.app),
    noderplate.app.MongoStore  = noderplate.imports.MongoStore(express);

// Set up App modules
noderplate.app.config = require('./config').init(noderplate);
noderplate.app.model  = require('./model').init(noderplate);
noderplate.app.core   = require('./core').init(noderplate);
noderplate.app.views  = require('./views').init(noderplate);
noderplate.app.api    = require('./api').init(noderplate);

server.listen(noderplate.app.get('port'), function(){
  console.log('Express server listening on port ' + noderplate.app.get('port'));
});