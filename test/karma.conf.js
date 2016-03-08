// Karma configuration
// Generated on Mon Aug 11 2014 15:49:39 GMT-0400 (EDT)
'use strict';

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
            'bower_components/ng-file-upload/ng-file-upload.min.js',
            'bower_components/zeroclipboard/dist/ZeroClipboard.js',
            'bower_components/ng-clip/src/ngClip.js',
            'bower_components/video.js/dist/video-js/video.js',
            'bower_components/angular-ui-grid/ui-grid.js',
            'bower_components/Chart.js/Chart.js',
            'bower_components/angular-chart.js/dist/angular-chart.js',
            'bower_components/angular-sanitize/angular-sanitize.min.js',
            'bower_components/angular-ui-select/dist/select.js',
            'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
            'bower_components/angular-loading-bar/build/loading-bar.min.js',
            'src/framework/router/router.module.js',
            'src/framework/**/*.js',
            'src/framework/router/router-helper.provider.js',
            // 'bower_components/**/*.js',
            'src/sapeLabs.module.js',
            '.tmp/templates.js',
            'src/core/core.module.js',
            'src/components/main/main.module.js',
            'src/components/common/common.module.js',
            'src/components/registerApp/registerApp.module.js',
            'src/components/appDetails/appDetails.module.js',
            'src/components/dashboard/dashboard.module.js',
            'src/components/home/home.module.js',
            'src/sapeLabs.controller.js',
            'src/**/*.js',
            'test/unit/**/*.js'

        ],


        // list of files to exclude
        exclude: [],

        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        // web server port
        port: 9001,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true
    });
};
