exports.init = function(noderplate) {
  var api = {};

  api.users = require('./api-users').init(noderplate);

  return api;
};