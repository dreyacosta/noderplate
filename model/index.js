exports.init = function(noderplate) {
  var model = {};

  noderplate.modules.mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) { throw err; }
  });

  model.User = require('./model-user').init(noderplate);

  return model;
};