'use strict';
angular.module('digitalMedia.dashboard', [])
        .controller("dashboardViewController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
                $rootScope.title = "Dashboard";
                $scope.data = {};

                var init = function () {
                    $("#embedded-map").attr("src", server + "dashboard");
                    digitalMediaAPI.stats.dashboard(function (data) {
                        $scope.data = data;
                    }, function (data) {

                    });
                };
                init();
            }]);