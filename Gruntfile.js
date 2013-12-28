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
        'api/**/*.js',
        'config/**/*.js',
        'core/**/*.js',
        'model/**/*.js',
        'views/**/*.js'
      ]
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: 'assets/',
          mainConfigFile: 'assets/config.js',
          out: 'public/app.js',
          name: 'app',
          preserveLicenseComments: false,
          done: function(done, output) {
            var duplicates = require('rjs-build-analysis').duplicates(output);

            if (duplicates.length > 0) {
              grunt.log.subhead('Duplicates found in requirejs build:');
              grunt.log.warn(duplicates);
              done(new Error('r.js built duplicate modules, please check the excludes option.'));
            }

            done();
          }
        }
      }
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
          'api/**/*.js',
          'config/**/*.js',
          'core/**/*.js'
        ]
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jade');

  grunt.registerTask('build', ['clean', 'jshint', 'jade', 'stylus', 'copy:public', 'requirejs']);
  grunt.registerTask('default', ['clean', 'jshint', 'jade', 'stylus', 'copy:public']);

};