exports.init = function(noderplate) {
  var core = {};

  core.data = require('./core-data').init(core);
  core.users = require('./core-users').init(noderplate);
  core.sendmail = require('./core-sendmail').init(noderplate);

  return core;
};