exports.init = function(noderplate) {
  var requireLogin = noderplate.app.config.middlewares.requireLogin;
  
  noderplate.app.post('/', noderplate.app.core.users.register);

  noderplate.app.post('/login', noderplate.app.core.users.login);

  noderplate.app.get('/logout', noderplate.app.core.users.logout);

  noderplate.app.get('/api/users', requireLogin, noderplate.app.core.users.all);
};