(function () {
    'use strict';

    angular
        .module('sapeLabs.core')
        .directive('errSrc', errSrc);

    function errSrc() {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src !== attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                });
            }
        };
    }
})();
