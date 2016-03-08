(function () {
    'use strict';

    angular
        .module('sapeLabs.main')
        .run(appRun);

    appRun.$inject = ['routerHelper', '$rootScope', '$state', '$timeout', '$httpBackend'];

    function appRun(routerHelper, $rootScope, $state, $timeout, $httpBackend) {

        routerHelper.configureStates(getStates(), '/home');
        //$locationProvider.html5Mode(true);

        //$urlRouterProvider.otherwise('/');

    }

    function getStates() {
        return [
            {
                state: 'main',
                config: {
                    url: '/home',
                    templateUrl: 'components/main/main.html',
                    controller: 'MainController',
                    controllerAs: 'main',
                    title: 'Main',
                    'abstract': true,
                    data: {
                        permissions: {
                            admin: false
                        }
                    },
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-login"></i> main'
                    }
                }
            }
        ];
    }


})();