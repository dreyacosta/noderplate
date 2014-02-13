exports.init = function (noderplate) {
  var users  = {},
      bcrypt = noderplate.imports.bcrypt,
      model  = noderplate.app.model;

  var generateSalt = function(password, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(password, salt, function(err, hash) {
        var resp = {
          salt: salt,
          hash: hash
        };

        return cb(resp);
      });
    });
  };

  var compareHash = function(password, hash, cb) {
    bcrypt.compare(password, hash, function(err, response) {
      if (err) { throw err; }

      if (response === true) {
        return cb(true);
      } else {
        return cb('check your password');
      }
    });
  };

  users.register = function(options, cb) {
    var username = options.username,
        email    = options.email,
        pass     = options.pass;

    generateSalt(pass, function(resp) {
      var user = new model.User();

      user.username = username;
      user.email = email;
      user.pass = resp.hash;
      user.salt = resp.salt;

      user.save();

      return cb(user);
    });
  };

  users.login = function(options, cb) {
    var username = options.username,
        pass     = options.pass;

    model.User.findOne({username: username}, function(err, user) {
      if (err) { throw err; }

      if (user) {
        compareHash(pass, user.pass, function(res) {
          if (res) { return cb(user); }
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