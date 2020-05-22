'use strict';
shared.directive('header', ["$rootScope",  "$state", "appService", function ($rootScope, $state, appService) {
        return {
            templateUrl: 'ng/shared/directives/header/view.html',
            scope: {
            },
            controller: function ($scope) {
                $scope.user = appService.getLoggedUser();
                $scope.logout = function(){
                    appService.logout();
                    $state.go("login");
                };
            }
        };
    }]);