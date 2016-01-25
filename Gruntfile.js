/* eslint-env node */

'use strict';

module.exports = require('./gruntfile-utils');

module.exports = function(grunt) {
    require('./gruntfile-utils')(grunt);

    grunt.config.merge({
        browserify: {
            dist: {
                src: ['angular-modules/**/*.js'],
                dest: './dist/js/app.js',
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [ 'babelify' ]
                }
            }
        }
    });

    grunt.registerTask('testThis', [ 'clean:output', 'template', 'copy:dist', 'concat:dependencies', 'ngtemplates', 'browserify:dist', 'unit', 'clean:release' ]);
};
