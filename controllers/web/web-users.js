exports.init = function(noderplate) {
  var users = {};

  users.register = function(req, res) {
    var options = {
      username : req.param('username'),
      pass     : req.param('pass'),
      email    : req.param('email')
    };

    req.core.users.register(options, function(user) {
      if (user) {
        res.redirect('/');
      }
    });
  };

  users.login = function(req, res) {
    var options = {
      username : req.param('username'),
      pass     : req.param('pass')
    };

    req.core.users.login(options, function(user) {
      req.session.authenticated = true;
      req.session.user = {
        username: user.username,
        email: user.email,
        registerDate: user.registerDate
      };
      res.redirect('/');
    });
  };

  users.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
  };

  return users;
};