exports.init = function(noderplate) {
  var web = noderplate.app.controllers.web;

  noderplate.app.post('/', web.users.register);
  noderplate.app.post('/login', web.users.login);
  noderplate.app.get('/logout', web.users.logout);
};