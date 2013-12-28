exports.init = function(noderplate) {
  var views = {};

  noderplate.app.get('/', function(req, res) {
    res.render('index', {
      title: 'Noderplate',
      authenticated: req.session.authenticaded,
      user: req.session.user,
      message: req.session.message,
      env: noderplate.app.env
    });
    req.session.message = '';
  });

  return views;
};