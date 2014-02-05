exports.init = function (noderplate) {
  var users  = {},
      bcrypt = noderplate.imports.bcrypt,
      model  = noderplate.app.model;

  users.register = function(options, cb) {
    var username = options.username,
        email    = options.email,
        pass     = options.pass;

    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(pass, salt, function(err, hash) {
        var user = new model.User();

        user.username = username;
        user.email = email;
        user.pass = hash;
        user.salt = salt;

        user.save();

        cb(user);
      });
    });
  };

  users.login = function(options, cb) {
    var username = options.username,
        pass     = options.pass;

    model.User.findOne({username: username}, function(err, user) {
      if (err) { throw err; }

      if (user) {
        bcrypt.compare(pass, user.pass, function(err, response) {
          if (err) { throw err; }

          if (response === true) {
            cb(user);
          } else {
            cb('check your password');
          }
        });
      } else {
        cb('not user found');
      }
    });
  };

  users.all = function(options, cb) {
    model.User.find({}, function(err, users) {
      if (err) { throw err; }

      cb(users);
    });
  };

  return users;
};