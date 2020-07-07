'use strict';
displays.controller("displayController", ["$rootScope", "$scope", "$state", "$stateParams", "digitalMediaAPI", "calendarService", "appService", function ($rootScope, $scope, $state, $stateParams, digitalMediaAPI, calendarService, appService) {
        $rootScope.title = "Displays";
        var displayId = $stateParams.id;
        $scope.display = null;
        var locations = [];

        $scope.statusMessage = function () {
            return ($scope.display !== null && $scope.display.verified === 1) ? "This unit is already verified" : "This unit has not been verified";
        };
        $scope.isVerified = function () {
            return ($scope.display !== null && $scope.display.verified === 1);
        };
        $scope.hasBeenDeployed = function () {
            return ($scope.display !== null && $scope.display.deployment !== null);
        };
        $scope.getOrganisationName = function () {
            return ($scope.display !== null && $scope.display.deployment !== null) ? $scope.display.deployment.location.organisation.name : "";
        };
        $scope.getLocationName = function () {
            return ($scope.display !== null && $scope.display.deployment !== null) ? $scope.display.deployment.location.name : "";
        };
        $scope.getLocationAddress = function () {
            return ($scope.display !== null && $scope.display.deployment !== null) ? $scope.display.deployment.location.address : "";
        };
        $scope.deploymentMessage = function () {
            var message = "";
            if ($scope.display !== null && $scope.display.deployment !== null) {
                message = "This unit was deployed to:";
            } else {
                message = "Not deployed to any to location";
            }
            return message;
        };
        $scope.hasScheduledPlaybacks = function () {
            return ($scope.display !== null && $scope.display.scheduled_playbacks !== null);
        };

        $scope.reloadIssues = function () {
            $scope.$broadcast('reload-issues');
        };
        $scope.reloadTimeline = function () {
            $scope.$broadcast('reload-timeline');
        };
        

        $scope.createNewTicket = function () {
            $scope.$broadcast('create-new-ticket', {locations: locations});
        };

        $scope.editTicket = function (issue) {
            $scope.$broadcast('edit-ticket', {issue: issue});
        };


        $scope.$on("add-to-campaign", function(evt, args){
            $scope.$broadcast('add-display-to-campaign');
        });
        
        $scope.edit = function (display) {
            $('#screensize-select').val(display.screensize).change();
            // $('#resolution-select').val(display.resolution).change();
            $('#orientation-select').val(display.orientation).change();
            // $('#os-select').val(display.os).change();
            // $('#network-select').val(display.network).change();
            // $('#brand-select').val(display.brand_id).change();
            $('#band-select').val(display.band_id).change();
            $('#type-select').val(display.type_id).change();

            $("#modalFillIn").modal("show");
        };

        $scope.save = function () {
            digitalMediaAPI.displays.update($scope.display, function (data) {
                $("#modalFillIn").modal("hide");
            }, function () {
                console.log("error");
            });
        };


        var loadBrands = function () {
            digitalMediaAPI.brands.getAll(function (data) {
                $scope.data.brands = data;
                console.log($scope.data);
                $('#brand-select').on('change', function (evt) {
                    $scope.display.brand = evt.val;
                });
            }, function (data) {
            });
        };

        var loadBands = function () {
            digitalMediaAPI.bands.getAll(function (data) {
                $scope.data.bands = data;
                $('#band-select').on('change', function (evt) {
                    $scope.display.band = evt.val;
                });
            }, function (data) {
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

        var loadFormData = function () {
            digitalMediaAPI.displays.getFormData(function (data) {
                $scope.data = data;
                // $('#resolution-select').select2();
                $('#orientation-select').select2();
                // $('#os-select').select2();
                // $('#network-select').select2();
                // $('#brand-select').select2();
                $('#band-select').select2();
                $('#type-select').select2();
                $('#screensize-select').select2();
                // $('#resolution-select').on('change', function (evt) {
                //     $scope.display.resolution_id = evt.val;
                // });
                $('#orientation-select').on('change', function (evt) {
                    $scope.display.orientation = evt.val;
                });
                // $('#os-select').on('change', function (evt) {
                //     $scope.display.os = evt.val;
                // });
                // $('#network-select').on('change', function (evt) {
                //     $scope.display.network = evt.val;
                // });
                $('#screensize-select').on('change', function (evt) {
                    $scope.display.screensize = evt.val;
                });

                // $('#brand-select').on('change', function (evt) {
                //     $scope.display.brand_id = evt.val;
                // });
                $('#band-select').on('change', function (evt) {
                    $scope.display.band_id = evt.val;
                });
                $('#type-select').on('change', function (evt) {
                    $scope.display.type_id = evt.val;
                });
                loadBands();
                loadLocations();
            }, function (data) {

            });
        };








        var init = function () {
            if (displayId !== null) {
                digitalMediaAPI.displays.profile(displayId, function (data) {
                    $scope.display = data.display;
                    $scope.display.modules = JSON.parse($scope.display.modules);
                    loadFormData();
                }, function () {
                    console.log("error");
                });
            }
        };
        init();
    }]);