'use strict';
support.controller('ticketController', ["$rootScope", "$scope", "$stateParams", "digitalMediaAPI", "appService", function ($rootScope, $scope, $stateParams, digitalMediaAPI, appService) {
        $rootScope.title = "Support Ticket";
        var ticketId = $stateParams.id;


        $scope.isDisplayKnown = function () {
            return (typeof $scope.ticket.display !== 'undefined');
        };
        $scope.getTakenAction = function () {
            return ($scope.ticket.actions === "") ? "No action taken" : $scope.ticket.actions;
        };

        $scope.getCurrentStatusClass = function () {
            var status = '';
            switch ($scope.ticket.status) {
                case 0:
                    status = "label-important";
                    break;
                case 1:
                    status = "label-info";
                    break;
                case 2:
                    status = "label-success";
                    break;
            }

            return status;
        };
        $scope.getCurrentStatus = function () {
            var status = '';
            switch ($scope.ticket.status) {
                case 0:
                    status = "Pending";
                    break;
                case 1:
                    status = "In Process";
                    break;
                case 2:
                    status = "Solved";
                    break;
            }

            return status;
        };
        
        $scope.print = function(){
            appService.callPrint("printable");
        };


        var initGallery = function () {
            appService.initGallery(".gallery", ".gallery-item", function (_gallery) {

            });
        };

        var loadProfile = function () {
            digitalMediaAPI.displayIssues.getProfile(ticketId, function (data) {
                $scope.ticket = data;
                //initGallery();
                console.log(data);
            }, function () {

            });
        };
        var init = function () {
            loadProfile();
            $scope.ticket = {status: 0};
        };
        init();
    }]);