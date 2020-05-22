'use strict';
angular.module('digitalMedia.help', [])
        .controller("helpController", ["$rootScope", "$scope", "$sce", "digitalMediaAPI", function ($rootScope, $scope, $sce, digitalMediaAPI) {
                $rootScope.title = "Help";
                $scope.text = "";
                var loadSettings = function () {
                    digitalMediaAPI.organisations.getSettings(function (data) {
                        $scope.text = $sce.trustAsHtml(data.help);
                    }, function () {

                    });
                };

                var init = function () {
                    loadSettings();
                };
                init();
                
            }]);