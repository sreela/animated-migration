(function () {
    'use strict';

    describe('clientController', function () {
        var $rootScope,
            $location,
            mainControllerScope,
            eventService,
            $cookies,
            customiseClientGroupsService,
            $http,
            $state,
            MainController;
        beforeEach(function () {
            module('sapeLabs');
            module('sapeLabs.main');
            inject(function (_$rootScope_,_$state_,_$controller_) {
                $rootScope = _$rootScope_;
                $state = _$state_;
                mainControllerScope = $rootScope.$new();
                MainController = _$controller_('MainController', {
                    $scope: mainControllerScope,
                    $state: $state
                });
            });
        });
        describe('Controller definition', function () {
            it('should be defined', function () {
                expect(MainController).toBeDefined();
            });
        });
        describe('Controller functionality', function () {
            it('should set state',function(){
               expect($rootScope.globalStates.state).toBe('');
            });
        });
    });
}());
