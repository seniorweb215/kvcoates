'use strict';
displays.controller("displaysDashboardController", ["$rootScope", "$scope", "digitalMediaAPI", "appService", function ($rootScope, $scope, digitalMediaAPI, appService) {
        $rootScope.title = "Displays";
        $scope.newDisplay = {};
        $scope.displays = [];
        $scope.locations = [];
        $scope.data = {};

        $scope.addNewDisplay = function () {
            digitalMediaAPI.displays.add($scope.newDisplay, function (data) {
                $("#modalFillIn").modal("hide");
                $('.displays-table').dataTable().fnDestroy();
                loadAll();
            }, function (data) {

            });
        };

        $scope.removeDisplay = function (display) {
            if (confirm("Are you sure you want to remove this display?")) {
                digitalMediaAPI.displays.remove(display, function (data) {
                    var index = $scope.displays.indexOf(display);
                    $scope.displays.splice(index, 1);
                    $('.displays-table').dataTable().fnDestroy();
                    $scope.$apply();
                    setTimeout(resetDataTable, 100);
                }, function (data) {

                });
            }
        };

        $scope.exportDisplays = function () {
            digitalMediaAPI.displays.exportToXLS();
        };


        $scope.view = function (view) {
            viewing = view;
        };
        $scope.isMapView = function () {
            return (viewing === 'map');
        };



        var resetDataTable = function () {

            $('[data-toggle="tooltip"]').tooltip();
            initTableWithSearch();
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


        var loadLocations = function () {
            digitalMediaAPI.locations.dashboard(function (data) {
                $scope.locations = data;
            }, function (data) {

            });
        };

        var loadAll = function () {
            loadLocations();
            digitalMediaAPI.displays.getAll(function (data) {
                $scope.displays = data;
                setTimeout(resetDataTable, 100);
            }, function (data) {

            });
        };

        var getOSName = function (id) {
            var os = $scope.data.operatingSystems.find(function (el) {
                return (el.id === id);
            });
            return os.name;
        };

        var getScreensizeName = function (id) {
            var ss = $scope.data.screensizes.find(function (el) {
                return (el.id === id);
            });
            return ss.name;
        };

        var loadFormData = function () {
            digitalMediaAPI.displays.getFormData(function (data) {
                $scope.data = data;
                // $('#manufacturer-select').select2();
                // $('#model-select').select2();
                // $('#resolution-select').select2();
                $('#orientation-select').select2();
                // $('#os-select').select2();
                // $('#network-select').select2();
                // $('#brand-select').select2();
                $('#band-select').select2();
                $('#screensize-select').select2();
                $('#type-select').select2();

                // $('#manufacturer-select').on('change', function (evt) {
                //     var id = parseInt(evt.val);
                //     $scope.selectedManufacturer = $scope.data.manufacturers.find(function (el) {
                //         return (el.id === id);
                //     });
                //     $scope.$apply();
                //     $('#model-select').select2();
                // });

                // $('#model-select').on('change', function (evt) {
                //     var id = parseInt(evt.val);
                //     var model = $scope.selectedManufacturer.display_manufacturers.find(function (el) {
                //         return (el.id === id);
                //     });
                //     $('#resolution-select').select2('val', model.tech_specs.resolution);
                //     $('#os-select').select2('val', model.tech_specs.os);
                //     $('#screensize-select').select2('val', model.tech_specs.size);
                //     $scope.newDisplay.resolution_id = model.tech_specs.resolution;
                //     $scope.newDisplay.os = getOSName(model.tech_specs.os);
                //     $scope.newDisplay.screensize = getScreensizeName(model.tech_specs.size);
                // });

                // $('#resolution-select').on('change', function (evt) {
                //     $scope.newDisplay.resolution_id = evt.val;
                // });
                $('#orientation-select').on('change', function (evt) {
                    $scope.newDisplay.orientation = evt.val;
                });
                // $('#os-select').on('change', function (evt) {
                //     $scope.newDisplay.os = getOSName(parseInt(evt.val));
                // });
                // $('#network-select').on('change', function (evt) {
                //     $scope.newDisplay.network = evt.val;
                // });
                $('#screensize-select').on('change', function (evt) {
                    $scope.newDisplay.screensize = getScreensizeName(parseInt(evt.val));
                });

                // $('#brand-select').on('change', function (evt) {
                //     $scope.newDisplay.brand_id = evt.val;
                // });
                $('#band-select').on('change', function (evt) {
                    $scope.newDisplay.band_id = evt.val;
                });
                $('#type-select').on('change', function (evt) {
                    $scope.newDisplay.type_id = evt.val;
                });
            }, function (data) {

            });
        };

        var init = function () {
            $scope.view('list');
            loadAll();
            loadFormData();
        };
        var viewing;
        init();
    }]);