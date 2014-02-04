exports.init = function(noderplate) {
  var app        = noderplate.app,
      path       = noderplate.imports.path,
      express    = noderplate.imports.express,
      MongoStore = noderplate.app.MongoStore,
      rootPath   = path.normalize(__dirname + '/..');

  app.env = process.argv[2] || 'prod';

  app.use(function(req, res, next) {
    req.core = app.core;
    next();
  });

  app.set('port', process.env.PORT || 3000);
  app.set('views', rootPath + '/views/templates');
  app.set('view engine', 'jade');
  app.use(express.favicon());

  if (app.env === 'dev') {
    app.use(express.logger('dev'));
  }

  if (app.env === 'prod') {
    app.use(express.logger());
  }

  app.use(express.bodyParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(express.cookieParser());

  app.use(express.session({
    store: new MongoStore({
      url: 'mongodb://localhost/test'
    }),
    cookie: {maxAge: 60000},
    secret: '1234567890QWERTY'
  }));

  app.use(app.router);

  app.use(express.compress({
    filter: function(req, res) {
      return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(rootPath + '/public'));

  if ('dev' === app.env) {
    app.use(express.errorHandler());
  }
};