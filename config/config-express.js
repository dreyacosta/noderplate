exports.init = function(noderplate) {
  noderplate.app.env = process.argv[2] || 'prod';

  var rootPath = noderplate.modules.path.normalize(__dirname + '/..');

  noderplate.app.use(function(req, res, next) {
    req.core = noderplate.app.core;
    next();
  });

  noderplate.app.set('port', process.env.PORT || 3000);
  noderplate.app.set('views', rootPath + '/views/templates');
  noderplate.app.set('view engine', 'jade');
  noderplate.app.use(noderplate.modules.express.favicon());

  if (noderplate.app.env === 'dev') {
    noderplate.app.use(noderplate.modules.express.logger('dev'));  
  }

  if (noderplate.app.env === 'prod') {
    noderplate.app.use(noderplate.modules.express.logger());  
  }

  noderplate.app.use(noderplate.modules.express.bodyParser());
  noderplate.app.use(noderplate.modules.express.methodOverride());
  noderplate.app.use(noderplate.modules.express.cookieParser());
  noderplate.app.use(noderplate.modules.express.session({
    store: new noderplate.modules.MongoStore({
      url: 'mongodb://localhost/test'
    }),
    cookie: {maxAge: 60000},
    secret: '1234567890QWERTY'
  }));
  noderplate.app.use(noderplate.app.router);

  noderplate.app.use(noderplate.modules.express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  noderplate.app.use(require('stylus').middleware(__dirname + '/public'));
  noderplate.app.use(noderplate.modules.express.static(rootPath + '/public'));

  if ('dev' === noderplate.app.env) {
    noderplate.app.use(noderplate.modules.express.errorHandler());
  }
};