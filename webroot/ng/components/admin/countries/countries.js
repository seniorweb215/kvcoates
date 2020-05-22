'use strict';
admin.controller("countriesController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
        $rootScope.title = "Countries";
        $scope.newCountry = {};
        $scope.countries = [];

        $scope.newCarrier = {};
        $scope.editingCountry = {};
        $scope.hasCarriers = function (country) {
            return (typeof country !== 'undefined' && typeof country.mobile_carriers !== 'undefined' && country.mobile_carriers.length > 0);
        };
        $scope.edit = function (country) {
            $scope.editingCountry = country;
            $("#modalFillIn").modal("show");
        };
        $scope.addNewCarrier = function () {
            $scope.newCarrier.country_id = $scope.editingCountry.id;
            digitalMediaAPI.countries.addMobileCarrier($scope.newCarrier, function (data) {
                $scope.editingCountry.mobile_carriers.push(data);
                $scope.newCarrier = {};
                $scope.$apply();
            }, function (data) {
                console.log(data);
            });
        };

        $scope.updateCarrier = function (carrier) {
            digitalMediaAPI.countries.updateMobileCarrier(carrier, function (data) {
                
            }, function (data) {
                console.log(data);
            });
        };
        $scope.removeCarrier = function (carrier) {
            if (confirm("Are you sure you want to remove this mobile carrier?")) {
                digitalMediaAPI.countries.removeMobileCarrier(carrier, function (data) {
                    var index = $scope.editingCountry.mobile_carriers.indexOf(carrier);
                    $scope.editingCountry.mobile_carriers.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }

        };

        $scope.removeCountry = function (country) {
            if (confirm("Are you sure you want to remove this country?")) {
                digitalMediaAPI.countries.remove(country, function (data) {
                    var index = $scope.countries.indexOf(country);
                    $scope.countries.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };

        $scope.save = function () {
            digitalMediaAPI.countries.add($scope.editingCountry, function (data) {
                $scope.$apply();
                $scope.cancel();
            }, function (data) {
                console.log(data);
            });
        };

        $scope.cancel = function () {
            $("#modalFillIn").modal("hide");
        };

        var loadCountries = function () {
            digitalMediaAPI.countries.getAll(function (data) {
                $scope.countries = data;
                setTimeout(initTableWithSearch, 100);
            }, function (data) {

            });
        };


        var initTableWithSearch = function () {
            var table = $('#tableWithSearch');
            var settings = {
                "sDom": "<'table-responsive't><'row'<p i>>",
                "destroy": true,
                "scrollCollapse": true,
                "oLanguage": {
                    "sLengthMenu": "_MENU_ ",
                    "sInfo": "Showing <b>_START_ to _END_</b> of _TOTAL_ entries"
                },
                "iDisplayLength": 15
            };

            table.dataTable(settings);

            $('#search-table').keyup(function () {
                table.fnFilter($(this).val());
            });
        };

        var init = function () {
            loadCountries();
        };
        init();
    }]);