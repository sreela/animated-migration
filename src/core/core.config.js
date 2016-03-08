(function () {
    'use strict';

    angular
        .module('sapeLabs.core')
        .config(configureApp);

    configureApp.$inject = [];


    function configureApp() {
        // ngClipProvider.setPath("bower_components/zeroclipboard/dist/ZeroClipboard.swf");
        //ngClipProvider.setPath('images/ZeroClipboard.swf');
        //cfpLoadingBarProvider.includeSpinner = false;
        //
        //function httpHeaders() {
        //    //initialize get if not there
        //    if (!$httpProvider.defaults.headers.get) {
        //        $httpProvider.defaults.headers.get = {};
        //    }
        //
        //    // Answer edited to include suggestions from comments
        //    // because previous version of code introduced browser-related errors
        //
        //    //disable IE ajax request caching
        //    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        //    // extra
        //    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        //    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
        //}
        //
        //httpHeaders();
    }


})();