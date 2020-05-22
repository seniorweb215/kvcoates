'use strict';
admin.controller("locationController", ["$rootScope", "$stateParams", "$scope", "digitalMediaAPI", function ($rootScope, $stateParams, $scope, digitalMediaAPI) {
        $scope.isEditingAddress = function () {
            return (editing === 'address');
        };

        $scope.isEditingOpenings = function () {
            return (editing === 'openings');
        };

        $scope.edit = function (section) {
            editing = section;
            switch (section) {
                case "timezone":
                    $("#timezonesModal").modal("show");
                    break;
                case "details":
                    $("#editingModal").modal("show");
                    break;
            }
        };

        $scope.editingDone = function () {
            editing = '';
            //$scope.location.zone_id = zoneId;
            console.log("Save", $scope.location);
            digitalMediaAPI.locations.update($scope.location, function (data) {
                console.log(data);
                $("#timezonesModal").modal("hide");
            }, function (data) {
                console.log(data);
            });
        };
        $scope.cancelEditing = function () {
            editing = '';

        };

        $scope.hasDeployedDisplays = function () {
            return ($scope.deployments.length > 0);
        };

        $scope.deployDisplay = function () {
            digitalMediaAPI.displays.deploy(displayId, $scope.location.id, function (data) {
                loadProfile();
                loadAvailableDisplays();
                $("#modalFillIn").modal("hide");
            }, function (data) {

            });
        };

        $scope.undeployDisplay = function (display) {
            if (confirm("Are you sure you want to remove this display from this location?")) {
                digitalMediaAPI.displays.undeploy(display.id, function (data) {
                    loadProfile();
                    loadAvailableDisplays();
                }, function (data) {

                });
            }

        };

        var loadAvailableZones = function () {
            digitalMediaAPI.zones.getAll(function (data) {
                $scope.zones = data;
                $('#zones-select').select2();
                $('#zones-select').on('change', function (evt) {
                    $scope.location.timezone_id = parseInt(evt.val);
                    $scope.location.timezone = $scope.zones.find(function(obj){return obj.id === $scope.location.timezone_id});
                });
            }, function (data) {

            });
        };

        var loadAvailableDisplays = function () {
            digitalMediaAPI.displays.undeployed(function (data) {
                $scope.displays = data;
                $('#displays-select').select2();
                $('#displays-select').on('change', function (evt) {
                    displayId = parseInt(evt.val);
                });
            }, function (data) {

            });
        };
        var loadProfile = function () {
            digitalMediaAPI.locations.profile($stateParams.id, function (data) {
                $scope.location = data.location;
                $scope.deployments = data.deployments;
                $rootScope.title = $scope.location.name;
                if ($scope.location.latitude === 0) {
                    $scope.edit("address");
                }
                $('#zones-select').select2('val', $scope.location.timezone_id);

                //$scope.$apply();
                setTimeout(function () {
                    //$('[data-toggle="tooltip"]').tooltip();
                    initTableWithSearch();
                }, 100);
            }, function (data) {

            });
        };

        var initTableWithSearch = function () {
            var table = $('.displays-table');

            var settings = {
                "sDom": "<'table-responsive't><'row'<p i>>",
                "destroy": true,
                "scrollCollapse": true,
                "oLanguage": {
                    "sLengthMenu": "_MENU_ ",
                    "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
                },
                "iDisplayLength": 10
            };

            table.dataTable(settings);

            // search box for table
            $('#search-table').keyup(function () {
                table.fnFilter($(this).val());
            });
        };

        var loadOrganisations = function () {
            digitalMediaAPI.organisations.getAll(function (data) {
                $scope.organisations = data;
                $('#organisation-select').select2();
                $('#organisation-select').on('change', function (evt) {
                    $scope.location.organisation_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };
        var loadCountries = function () {
            digitalMediaAPI.locations.getAllCountries(function (data) {
                $scope.countries = data;
                $('#country-select').select2();
                $('#country-select').on('change', function (evt) {
                    $scope.location.country_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        $scope.save = function () {
            console.log("Save", $scope.location);
            digitalMediaAPI.locations.update($scope.location, function (data) {
                $scope.$apply();
                $scope.cancel();
            }, function (data) {
                console.log(data);
            });
        };

        $scope.cancel = function () {
            $("#editingModal").modal("hide");
        };

        var init = function () {
            loadProfile();
            loadAvailableDisplays();
            loadAvailableZones();
            loadCountries();
            loadOrganisations();
            setTimeout(function(){
                 $('[data-toggle="tooltip"]').tooltip();
            }, 1000);
        };

        $scope.displays = [];
        $scope.selectedDisplayId = '';
        $scope.selectedZoneId = '';
        $scope.location = null;
        $scope.deployments = [];
        var editing = '';
        var displayId;
        var zoneId;
        init();
    }]);