'use strict';
angular.module('digitalMedia.privacy', [])
        .controller("privacyController", ["$rootScope", "$scope", '$sce', "digitalMediaAPI", function ($rootScope, $scope, $sce, digitalMediaAPI) {
                $rootScope.title = "Privacy";
                $scope.text = "";

                var loadSettings = function () {
                    digitalMediaAPI.organisations.getSettings(function (data) {
                        $scope.text = $sce.trustAsHtml(data.privacy);
                    }, function () {

                    });
                };

                var init = function () {
                    loadSettings();
                };
                init();

            }]);