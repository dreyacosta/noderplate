require.config({
  baseUrl: '',

  paths: {
    jquery     : 'vendors/jquery/jquery',
    underscore : 'vendors/underscore/underscore',
    backbone   : 'vendors/backbone/backbone',
    marionette : 'vendors/marionette/lib/backbone.marionette'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    marionette: {
      deps: ['backbone'],
      exports: 'Backbone.Marionette'
    }
  }
});