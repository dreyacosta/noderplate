module.exports = function(grunt) {

  grunt.initConfig({
    clean: ['public'],

    copy: {
      public: {
        expand: true,
        cwd: 'assets/',
        src: [
          'images/**',
          'javascript/**',
          '*.js',
          'vendors/**'
        ],
        dest: 'public'
      },
      build: {
        expand: true,
        cwd: 'assets/',
        src: [
          'images/**'
        ],
        dest: 'public'
      }
    },

    jade: {
      amd: {
        files: {
          'assets/javascript/templates/': ['assets/templates/**/*.jade']
        },
        options: {
          basePath: 'assets/templates',
          wrap: {
            wrap: true,
            amd: true,
            node: false,
            dependencies: 'jade'
          },
          runtime: false
        }
      }
    },

    jshint: {
      options: {
        boss: true,
        curly: true,
        eqeqeq: true,
        eqnull: true,
        immed: true,
        indent: 2,
        latedef: true,
        laxcomma: true,
        newcap: true,
        noarg: true,
        node: true,
        sub: true,
        undef: true,
        globals: {
          window: true,
          document: true,
          define: true
        },
        ignores: ['assets/javascript/templates/**']
      },
      all: [
        'Gruntfile.js',
        'assets/javascript/**/*.js',
        'config/**/*.js',
        'controllers/**/*.js',
        'core/**/*.js',
        'model/**/*.js',
        'routers/**/*.js',
        'views/**/*.js'
      ]
    },

    stylus: {
      options: {
        compress: true,
        'include css': true
      },
      compile: {
        files: {
          'public/css/xpressio.min.css': ['assets/stylesheets/xpressio.styl']
        }
      }
    },

    watch: {
      options: {
        event: ['added', 'changed']
      },
      jade: {
        files: ['assets/templates/**/*.jade'],
        tasks: ['jade', 'copy:public']
      },
      jshint: {
        files: [
          'Gruntfile.js',
          'assets/javascript/**/*.js',
          'config/**/*.js',
          'controllers/**/*.js',
          'core/**/*.js',
          'model/**/*.js',
          'routers/**/*.js',
          'views/**/*.js'
        ],
        tasks: ['jshint']
      },
      stylus: {
        files: ['assets/stylesheets/**/*.styl'],
        tasks: ['stylus']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jade');

  grunt.registerTask('build', ['clean', 'jshint', 'jade', 'copy:public']);
  grunt.registerTask('default', ['clean', 'jshint', 'jade', 'copy:public']);

};