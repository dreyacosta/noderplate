exports.init = function(noderplate) {
  var routers = {};

  routers.api = require('./api').init(noderplate);
  routers.web = require('./web').init(noderplate);

  return routers;
};