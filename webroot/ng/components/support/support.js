'use strict';
support.controller('supportController', ["$rootScope", "$scope", "digitalMediaAPI", "appService", function ($rootScope, $scope, digitalMediaAPI, appService) {
        $rootScope.title = "Support";
        var displays = [];
        var locations = [];

        var loadDisplays = function () {
            digitalMediaAPI.displays.getAll(function (data) {
                displays = data;
            }, function (data) {

            });
        };
        
        var loadStats = function () {
            digitalMediaAPI.stats.support(function (data) {
                $scope.data = data;
            }, function () {

            });
        };

        var loadLocations = function() {
            var uid = appService.getLoggedUserId();
            var oid = appService.getLoggedUserOrganisationId();
            digitalMediaAPI.locations.getAll(uid, oid, function (data) {
                locations = data;
            }, function (data) {

            });
        }
        
        var loadTickets = function () {
            digitalMediaAPI.displayIssues.all(function (data) {
                $scope.issues = data;
                loadDisplays();
                loadLocations();
            }, function () {

            });
        };

        $scope.displaysLoaded = function () {
            return (displays.length > 0);
        };
        $scope.createNewTicket = function () {
            $scope.$broadcast('create-new-ticket-from-displays-list', {displays: displays, locations: locations});
        };
        $scope.editTicket = function (issue) {
            $scope.$broadcast('edit-ticket-from-display', {issue: issue, display: issue.display});
        };
        $scope.reloadTickets = function () {
            loadTickets();
        };
        $scope.exportToXLS = function(){
            digitalMediaAPI.displayIssues.exportToXLS();
        };


        var init = function () {
            loadStats();
            loadTickets();
        };
        init();
    }]);