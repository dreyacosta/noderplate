exports.init = function(api) {
  api.articles = {};

  api.articles.all = function(req, res) {
    req.core.data.test();
  };

  return api.articles;
};