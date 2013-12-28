var noderplate = {
  modules: {},
  app: {}
};

noderplate.modules.express = require('express');
noderplate.modules.http = require('http');
noderplate.modules.path = require('path');
noderplate.modules.bcrypt = require('bcrypt');
noderplate.modules.mongoose = require('mongoose');
noderplate.modules.MongoStore = require('connect-mongo')(noderplate.modules.express);
noderplate.app = noderplate.modules.express();

noderplate.app.config = require('./config').init(noderplate);
noderplate.app.model = require('./model').init(noderplate);
noderplate.app.core = require('./core').init(noderplate);

require('./views').init(noderplate);
require('./api').init(noderplate);

noderplate.modules.http.createServer(noderplate.app).listen(noderplate.app.get('port'), function(){
  console.log('Express server listening on port ' + noderplate.app.get('port'));
});