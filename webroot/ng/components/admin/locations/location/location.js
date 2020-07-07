'use strict';
admin.controller("locationController", ["$rootScope", "$stateParams", "$scope", "digitalMediaAPI", function ($rootScope, $stateParams, $scope, digitalMediaAPI) {
        $scope.isEditingAddress = function () {
            return (editing === 'address');
        };

        $scope.isEditingOpenings = function () {
            return (editing === 'openings');
        };

        $scope.ownerEditingDone = function() {
            $scope.owner.location_id = $stateParams.id;
            if(!$scope.owner.id) {
                $scope.owner.id = 0;
            }
            digitalMediaAPI.locations.updateLocationContact($scope.owner, function (data) {
                console.log(data);
                $("#contactModal").modal("hide");
            }, function (data) {
                console.log(data);
            });
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

                case "attachments":
                    // $scope.dropzone1.removeAllFiles(true);
                    // $scope.dropzone1.destroy();
                    // loadAttachments();
                    $("#attachmentsModal").modal("show");

                case "contact":
                    $("#contactModal").modal("show");
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
                $scope.owner = data.location.location_contact;
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

        var loadAttachments = function () {
            digitalMediaAPI.locations.getAttachments($stateParams.id, function (data) {
                if(data.length > 0) {
                    $scope.attachments = data;
                } else {
                    $scope.attachments[0] = {'url': ''};
                }
                initDropZone();
            }, function (data) {
                if(data.length > 0) {
                    $scope.attachments = data;
                } else {
                    $scope.attachments[0] = {'url': ''};
                }       
                initDropZone();
            });
        };

        $scope.attachEditingDone = function() {
            $scope.dropzone1.processQueue();
            $("#attachmentsModal").modal('hide');
            // $scope.dropzone1.removeAllFiles(true);
            // $scope.dropzone1.destroy();
            // loadAttachments();
        }

        var initDropZone = function () {
            if($("#location-attachments-uploader").length) {
                $scope.removedItems = [];
                $scope.dropzone1 = new Dropzone("#location-attachments-uploader", {
                    url: digitalMediaAPI.locations.attachmentEndpoint(),
                    autoProcessQueue: false,
                    acceptedFiles: '.jpg,.jpeg,.png',
                    addRemoveLinks: true
                });
                $scope.dropzone1.on("sending", onSending);
                $scope.dropzone1.on("success", onSuccess);

                $scope.dropzone1.on("removedfile", function(file){
                    if(file.id !== undefined) {
                        $scope.removedItems.push(file.id);
                    }
                });
    
                $scope.attachments.forEach(function (item) {
                    if(item.id) {
                        var mockFile = {id: item.id, name: item.id, size: 12345 };
                        $scope.dropzone1.emit("addedfile", mockFile);
                        $scope.dropzone1.emit("thumbnail", mockFile, item.url);
                    }
                });
            }
        };

        var onSuccess = function (file, response) {
            
        };

        var onSending = function (file, xhr, formData) {
            formData.append("location_id", $stateParams.id);
            formData.append("removed_items", $scope.removedItems);
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
            loadAttachments();
            setTimeout(function(){
                 $('[data-toggle="tooltip"]').tooltip();
            }, 1000);
        };

        $scope.displays = [];
        $scope.selectedDisplayId = '';
        $scope.selectedZoneId = '';
        $scope.location = null;
        $scope.deployments = [];
        $scope.attachments = [];
        $scope.dropzone1 = [];
        $scope.removedItems = [];
        var editing = '';
        var displayId;
        var zoneId;
        init();
    }]);