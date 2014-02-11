var app = {
  imports: {}
};

app.imports = {
 $        : require('browserify-zepto'),
 _        : require('underscore'),
 Backbone : require('backbone')
};

app.imports.Backbone.$ = app.imports.$;

console.log('Hello World!');