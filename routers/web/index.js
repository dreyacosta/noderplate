exports.init = function(noderplate) {
  var web = {};

  web.users = require('./web-users').init(noderplate);

  return web;
};