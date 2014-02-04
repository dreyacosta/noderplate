exports.init = function(noderplate) {
  var model    = {},
      mongoose = noderplate.imports.mongoose;

  mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) { throw err; }
  });

  model.User = require('./model-user').init(noderplate);

  return model;
};