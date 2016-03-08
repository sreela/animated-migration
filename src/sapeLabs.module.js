(function () {
    'use strict';

    angular.module('sapeLabs', [
        // Common (everybody has access to these)
        'sapeLabs.templates',
        'sapeLabs.core',

        // Features
        'sapeLabs.main',
        'sapeLabs.common',
        'sapeLabs.home'
    ]);

})();
