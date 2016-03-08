//(function () {
//    'use strict';
//
//    describe('clientController', function () {
//        var $rootScope,
//            $location,
//            clientControllerScope,
//            eventService,
//            $cookies,
//            customiseClientGroupsService,
//            $http,
//            $timeout,
//            clientController;
//        beforeEach(function () {
//            module('main.appDetails');
//            inject(function ($injector) {
//                $rootScope = $injector.get('$rootScope');
//                $location = $injector.get('$location');
//                $http = $injector.get('$httpBackend');
//                $timeout = $injector.get('$timeout');
//                $cookies = $injector.get('$cookies');
//                Frost.mockServer.customiseClientGroupsServiceMock($http);
//                customiseClientGroupsService = $injector.get('customiseClientGroupsService');
//                eventService = $injector.get('eventService');
//                clientControllerScope = $rootScope.$new();
//                clientController = $injector.get('$controller')('clientController', {
//                    $scope: clientControllerScope,
//                    $location: $location,
//                    $timeout: $timeout,
//                    customiseClientGroupsService: customiseClientGroupsService,
//                    eventService: eventService,
//                    isAuthenticated: true,
//                    $cookies:$cookies
//                });
//            });
//        });
//        describe('Controller definition', function () {
//            it('should be defined', function () {
//                expect(clientController).toBeDefined();
//            });
//        });
//        describe('Controller functionality', function () {
//
//        });
//    });
//}());
