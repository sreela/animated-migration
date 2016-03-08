(function () {
    'use strict';
    angular.module('sapeLabs.core').directive('confirmOnExit', [function () {
        return {
            link: function ($scope, elem, attrs) {
                window.onbeforeunload = function () {
                    //if ($scope.registerForm.$dirty || $scope.editForm.$dirty) {
                    //    return "You have unsaved details in this form.";
                    //}

                    if ($scope.registerForm) {
                        if ($scope.registerForm.$dirty) {
                            return "You have unsaved details in this form.";
                        }
                    }
                    else if ($scope.editForm) {
                        if ($scope.editForm.$dirty) {
                            return "You have unsaved details in this form.";
                        }
                    }
                };
                $scope.$on('$stateChangeStart', function (event, next, current) {
                    if ($scope.registerForm) {
                        if ($scope.registerForm.$dirty) {
                            if (!confirm("You have unsaved details in this form. Are you sure you want to leave this page?")) {
                                event.preventDefault();
                            }
                        }
                    }
                    else if ($scope.editForm) {
                        if ($scope.editForm.$dirty) {
                            if (!confirm("You have unsaved details in this form. Are you sure you want to leave this page?")) {
                                event.preventDefault();
                            }
                        }
                    }
                    //if ($scope.registerForm.$dirty || $scope.editForm.$dirty) {
                    //    if(!confirm("You have unsaved details in this form. Are you sure you want to leave this page?")) {
                    //        event.preventDefault();
                    //    }
                    //}
                });
            }
        };
    }]);

})();