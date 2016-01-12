'use strict';

var gutil = require('gulp-util');
var chalk = require('chalk');

module.exports = function(error, result, file) {
    var passed = true;
    var out;
    var stats;
    var color;

    if (result) {
        try {
            result.trim().split('\n').forEach(function(line) {
                if (line.indexOf('{') !== -1) {
                    out = JSON.parse(line.trim());

                    stats = out.stats;

                    color = stats.failures > 0 ? chalk.red : chalk.green;

                    gutil.log('Took ' + stats.duration + ' ms to run ' + chalk.blue(stats.tests) + ' tests. ' + color(stats.passes + ' passed, ' + stats.failures + ' failed.'));

                    if (out.failures) {
                        out.failures.forEach(function(item) {
                            gutil.log(chalk.red('Test failed') + ': ' + chalk.red(item.fullTitle) + ': \n' + item.error);
                        });
                    }
                }
            });
        } catch (e) {
            gutil.log(chalk.red(e));
        }
    }

    if (error) {
        gutil.log('gulp-qunit: ' + chalk.red('✖ ') + 'QUnit assertions failed in ' + chalk.blue(file.relative));
    } else {
        gutil.log('gulp-qunit: ' + chalk.green('✔ ') + 'QUnit assertions all passed in ' + chalk.blue(file.relative));
    }
};
