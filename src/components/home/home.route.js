(function () {
    'use strict';

    angular
        .module('sapeLabs.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'main.home',
                config: {
                    url: '',
                    templateUrl: 'components/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home',
                    title: 'Home',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-login"></i> home'
                    }
                }
            }
        ];
    }


})();