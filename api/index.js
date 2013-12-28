exports.init = function(noderplate) {
  var api = {};

  api.articles = require('./api-articles').init(api);
  api.articles = require('./api-users').init(noderplate);

  return api;
};