(function () {
    'use strict';

    angular.module('sapeLabs.core')
        .constant('baseUrl', '');

    angular.module('sapeLabs.core')
        .factory('backendUrls', backendUrlsProvider);

    backendUrlsProvider.$inject = ['baseUrl'];


    function backendUrlsProvider(baseUrl) {
        return {

        };
    }
})();
