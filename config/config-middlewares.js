exports.init = function(config) {
  config.middlewares = {};

  config.middlewares.requireLogin = function(req, res, next) {
    if (req.session.authenticated !== true) {
      req.session.message = {
        type: 'error',
        description: "You're not logged"
      };
      res.redirect('/');
    }
    next();
  };

  return config.middlewares;
};