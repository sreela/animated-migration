(function () {
    'use strict';
    angular.module('sapeLabs.core')
        .filter('trimText', trimText);

    function trimText() {
        return function (data, trimLength) {
            data = data || '';
            trimLength = trimLength || 10;
            return data.length <= trimLength ? data : data.substr(0, trimLength) + '...';
        };
    }

})();

