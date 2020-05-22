'use strict';
angular.module('digitalMedia.login', [])
        .controller("loginController", ["$rootScope", "$scope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $scope, $state, appService, digitalMediaAPI) {
                $rootScope.title = "Sign In";
                $scope.username = '';
                $scope.password = '';
                $scope.feedback = "";
                $scope.login = function () {
                    digitalMediaAPI.users.login($scope.username, $scope.password, function (data) {
                        if (data.user.status) {
                            appService.login(data);
                            $rootScope.user = appService.getLoggedUser();
                            $state.go("dashboard");
                        } else {
                            $scope.feedback = "Your account is disabled";
                            $scope.$apply();
                        }
                    }, function (data) {
                        console.log("Error Logging in ", data);
                        $scope.feedback = "Wrong Credentials";
                        $scope.$apply();
                    });
                };

                $scope.getFooterMessage = function () {
                    return footerMessage;
                };
            }]);