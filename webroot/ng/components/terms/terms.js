'use strict';
angular.module('digitalMedia.terms', [])
        .controller("termsController", ["$rootScope", "$scope", "$sce", "digitalMediaAPI", function ($rootScope, $scope, $sce, digitalMediaAPI) {
                $rootScope.title = "Terms";

                $scope.text = "";

                var loadSettings = function () {
                    digitalMediaAPI.organisations.getSettings(function (data) {
                        $scope.text = $sce.trustAsHtml(data.terms);
                    }, function () {

                    });
                };

                var init = function () {
                    loadSettings();
                };
                init();

            }]);