'use strict';

module.exports = function(grunt) {
    var path = require('path');

    if (!grunt.option('no-time')) {
        require('time-grunt')(grunt);
    }

    require('load-grunt-config')(grunt, {
        configPath: [
            path.join(process.cwd(), 'node_modules/qmg-angular/grunt')
        ],
        overridePath: [
            path.join(process.cwd(), 'grunt')
        ],
        jitGrunt: {
            staticMappings: {
                sprite: 'grunt-spritesmith',
                ngtemplates: 'grunt-angular-templates',
                protractor: 'grunt-protractor-runner',
                instrument: 'grunt-istanbul',
                makeReport: 'grunt-istanbul',
                mocha: 'grunt-mocha-phantom-istanbul'
            }
        }
    });

    grunt.loadNpmTasks('grunt-notify');
};
