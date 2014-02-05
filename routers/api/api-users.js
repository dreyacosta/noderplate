exports.init = function(noderplate) {
  var app         = noderplate.app,
      middlewares = noderplate.app.config.middlewares,
      api         = noderplate.app.controllers.api;

  noderplate.app.get('/api/users', middlewares.requireLogin, api.users.all);
};