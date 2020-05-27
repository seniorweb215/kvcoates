'use strict';
angular.module('digitalMedia.dashboard', [])
        .controller("dashboardViewController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
                this.$onInit = function() {
                    $rootScope.title = "Dashboard";
                    $scope.data = {};
                    init();
                }

                var init = function () {
                    $("#embedded-map").attr("src", server + "dashboard");
                    digitalMediaAPI.stats.dashboard(function (data) {
                        console.log(data);
                        $scope.data = data;
                    }, function (data) {

                    });
                };
            }]);