module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),

    concat: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
      },
      build: {
        src: ['src/taggedAutogrow.js'],
        dest: 'taggedAutogrow.js'
      },
    },

    coveralls: {
      options: {
        coverageDir: 'coverage/'
      }
    },

    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      test: {
        // Use defaults
      },
      dev: {
        singleRun: false
      },
      bdd: {
        reporters: ['story', 'coverage']
      },
      cobertura: {
        reporters: ['dots', 'coverage'],
        browsers: ['PhantomJS'],
        coverageReporter: {
          type : 'cobertura',
          dir : 'coverage/'
        }
      },
      travis: {
        singleRun: true,
        reporters: ['dots', 'coverage'],
        browsers: ['PhantomJS'],
        preprocessors: {
          'src/*.js': 'coverage'
        },
        coverageReporter: {
          type : 'lcov',
          dir : 'coverage/'
        }
      }
    },

    uglify: {
      build: {
        files: {
          'taggedAutogrow.min.js': ['taggedAutogrow.js']
        }
      }
    }
  });

  // Run tests, single pass
  grunt.registerTask('test', 'Run unit tests', ['karma:test']);

  // Run tests continously for development mode
  grunt.registerTask('dev', 'Run unit tests in watch mode', ['karma:dev']);

  // Generate a coverage report in Cobertura format
  grunt.registerTask('cobertura', 'Generate Cobertura coverage report', ['karma:cobertura']);

  // Build files for production
  grunt.registerTask('build', 'Builds files for production', ['concat:build', 'uglify:build']);

  // Travis CI task
  // Disabling coveralls for now until we change our github repo name in coveralls to "ifwe"
  grunt.registerTask('travis', 'Travis CI task', ['karma:travis'/*, 'coveralls'*/]);
};
