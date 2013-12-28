exports.init = function(core) {
  core.data = {};

  core.data.test = function() {
    console.log('My core data test');
  };

  return core.data;
};