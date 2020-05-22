'use strict';
admin.controller("organisationsController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
        $rootScope.title = "Organisations";
        $scope.newOrganisation = {};
        $scope.organisations = [];
        $scope.editingOrganisation = {};
        $scope.editingOrganisation1 = {};
        $scope.countries = [];

        $scope.addNewOrganisation = function () {
            digitalMediaAPI.organisations.add($scope.newOrganisation, function (data) {
                $("#modalFillIn").modal("hide");
				loadOrganisations();
            }, function (data) {
            });
        };

        $scope.edit = function (organisation) {
            $scope.editingOrganisation = organisation;
			$("#editingModal").modal("show");
        };

        $scope.removeOrganisation = function (organisation) {
            if (confirm("Are you sure you want to remove this organisation?")) {
                digitalMediaAPI.organisations.remove(organisation, function (data) {
                    var index = $scope.organisations.indexOf(organisation);
                    $scope.organisations.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };

        $scope.save = function () {
			console.log($scope.editingOrganisation);
			$scope.editingOrganisation1.id = $scope.editingOrganisation.id;
			$scope.editingOrganisation1.name = $scope.editingOrganisation.name;
            $scope.editingOrganisation1.country_id = $scope.editingOrganisation.country_id;
            digitalMediaAPI.organisations.update($scope.editingOrganisation1, function (data) {
			$scope.$apply();
			$scope.cancel();
			loadOrganisations();
			console.log(data);
            }, function (data) {
                console.log(data);
            });
        };

        $scope.cancel = function () {
            $("#editingModal").modal("hide");
        };
        
        
        $scope.countDisplays = function(organisation){
            var total = 0;
            organisation.locations.forEach(function(location){
                total += location.deployments.length;
            });
            return total;
        };

        var loadCountries = function () {
            digitalMediaAPI.organisations.getAllCountries(function (data) {
                $scope.countries = data;
                $('#country-select').select2();
                $('#country-select').on('change', function (evt) {
                    $scope.newOrganisation.country_id = parseInt(evt.val);
                });
                $('#editcountry-select').select2();
                $('#editcountry-select').on('change', function (evt) {
                    $scope.editingOrganisation.country_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var loadOrganisations = function(){
            digitalMediaAPI.organisations.getAll(function (data) {
				console.log(data);
                $scope.organisations = data;
            }, function (data) {

            });
        };

		var init = function () {
			loadOrganisations();
            loadCountries();
        };
        init();
    }]);