'use strict';
displays.controller("liftnlearnDeploymentController", ["$rootScope", "$scope", "$stateParams", "appService", "digitalMediaAPI", function ($rootScope, $scope, $stateParams, appService, digitalMediaAPI) {
        $rootScope.title = "Displays";
        var displayId = $stateParams.id;
        $scope.display = {};
        $scope.scheduled = [];
        $scope.availableFeeds = [];


        $scope.getCTATitle = function () {
            return ($scope.scheduled.length > 0) ? "Scheduled Lift N Learn Content" : "There's no scheduled content";
        };

        $scope.hasAvailableFeeds = function () {
            return ($scope.availableFeeds.length > 0);
        };
        
        $scope.onScheduleFeed = function(feed){
            loadHistory();
        };

        var loadAvailableFeeds = function () {
            digitalMediaAPI.feeds.liftnlearn(appService.getLoggedUserOrganisationId(), function (data) {
                console.log("Available Feeds: ", data);
                $scope.availableFeeds = data;
            }, function () {

            });
        };

        var loadHistory = function () {
            digitalMediaAPI.displays.liftnlearn(displayId, function (data) {
                $scope.scheduled = data;
                console.log("Schedules: ", data);
            }, function () {
                console.log("error");
            });
        };
        var init = function () {
            if (displayId !== null) {
                digitalMediaAPI.displays.profile(displayId, function (data) {
                    $scope.display = data.display;
                    loadHistory();
                    loadAvailableFeeds();
                }, function () {
                    console.log("error");
                });
            }
        };
        init();
    }]);