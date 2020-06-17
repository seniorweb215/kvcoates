'use strict';
admin.controller("locationsController", ["$rootScope", "$scope", "digitalMediaAPI", "appService", "mapService", function ($rootScope, $scope, digitalMediaAPI, appService, mapService) {
        $rootScope.title = "Locations";
        $scope.newLocation = {};
        $scope.locations = [];
        $scope.countries = [];
        $scope.organisations = [];
        $scope.owners = [];
        $scope.sizes = [];
        $scope.dropzone1 = {};
        $scope.newLocationId = 0;

        $scope.addNewLocation = function () {
            $scope.newLocation.zone_id = 0;
            digitalMediaAPI.locations.add($scope.newLocation, function (data) {
                $("#modalFillIn").modal("hide");
                $scope.newLocationId = data.id;
                $scope.dropzone1.processQueue();
                loadLocations();
            }, function (data) {

            });
        };
        $scope.removeLocation = function (location) {

            if (location.deployments.length === 0) {
                if (confirm("Are you sure you want to remove this location?")) {
                    digitalMediaAPI.locations.remove(location, function (data) {
                        var index = $scope.locations.indexOf(location);
                        $scope.locations.splice(index, 1);
                        $scope.$apply();
                    }, function (data) {

                    });
                }
            }else{
                alert("There are displays that were deployed to this location, undeploy them prior deleting this location.");
            }


        };

        $scope.exportLocations = function () {
            digitalMediaAPI.locations.exportToXLS();
        };

        var loadOrganisations = function () {
            digitalMediaAPI.organisations.getAll(function (data) {
                $scope.organisations = data;
                $('#organisation-select').select2();
                $('#organisation-select').on('change', function (evt) {
                    $scope.newLocation.organisation_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };
        var loadCountries = function () {
            digitalMediaAPI.locations.getAllCountries(function (data) {
                $scope.countries = data;
                $('#country-select').select2();
                $('#country-select').on('change', function (evt) {
                    $scope.newLocation.country_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var loadOwners = function () {
            digitalMediaAPI.locations.getAllOwners(function (data) {
                $scope.owners = data;
                $('#owner-select').select2();
                $('#owner-select').on('change', function (evt) {
                    $scope.newLocation.owner_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var loadSizes = function () {
            digitalMediaAPI.locations.getAllSizes(function (data) {
                $scope.sizes = data;
                $('#size-select').select2();
                $('#size-select').on('change', function (evt) {
                    $scope.newLocation.size_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var initDropZone = function () {
            $scope.dropzone1 = new Dropzone("#attachments-uploader", {
                url: digitalMediaAPI.locations.attachmentEndpoint(),
                autoProcessQueue: false,
                acceptedFiles: '.jpg,.jpeg,.png'
            });
            $scope.dropzone1.on("sending", onSending);
            $scope.dropzone1.on("success", onSuccess);
        };

        var onSuccess = function (file, response) {
            
        };

        var onSending = function (file, xhr, formData) {
            formData.append("location_id", $scope.newLocationId);
        };

        var initDatePicker = function() {
            $("#datepicker").datepicker({
                autoclose: true
            }).on('change', function() {
                $scope.newLocation.install_date = $(this).val();
            });
        };

        var loadLocations = function () {
            var uid = appService.getLoggedUserId();
            var oid = appService.getLoggedUserOrganisationId();
            digitalMediaAPI.locations.getAll(uid, oid, function (data) {
                $scope.locations = data;
                $scope.$apply();
            }, function (data) {

            });
        };

        var initAutoComplete = function () {
            mapService.autoComplete('retailer-address', function (data) {
                $scope.newLocation.address = data.formatted_address;
                $scope.newLocation.latitude = data.geometry.location.lat();
                $scope.newLocation.longitude = data.geometry.location.lng();
            });
        };
        var init = function () {

            loadLocations();
            loadCountries();
            loadSizes();
            loadOwners();
            initDropZone();
            initDatePicker();
            loadOrganisations();
            setTimeout(initAutoComplete, 1000);
        };
        init();
    }]);