exports.init = function (noderplate) {
  var users = {};

  users.register = function(req, res) {
    var username = req.param('username');
    var pass = req.param('pass');
    var email = req.param('email');

    noderplate.modules.bcrypt.genSalt(10, function(err, salt) {
      noderplate.modules.bcrypt.hash(pass, salt, function(err, hash) {
        var user = new noderplate.app.model.User();

        user.username = username;
        user.email = email;
        user.pass = hash;
        user.salt = salt;

        user.save();

        res.redirect('/');
      });
    });
  };

  users.login = function(req, res) {
    var username = req.param('username');
    var pass = req.param('pass');

    noderplate.app.model.User.findOne({username: username}, function(err, user) {
      if (err) { throw err; }

      if (user) {
        noderplate.modules.bcrypt.compare(pass, user.pass, function(err, response) {
          if (err) { throw err; }

          if (response === true) {
            req.session.authenticated = true;
            req.session.user = {
              username: user.username,
              email: user.email,
              registerDate: user.registerDate
            };
          } else {
            req.session.message = {
              type: 'error',
              description: 'Check your password'
            };
          }
          res.redirect('/');
        });
      } else {
        req.session.message = {
          type: 'error',
          description: 'Not user found'
        };
        res.redirect('/');
      }
    });
  };

  users.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/');
  };

  users.all = function(req, res) {
    noderplate.app.model.User.find({}, function(err, users) {
      if (err) { throw err; }

      res.json(users);
    });
  };

  return users;
};