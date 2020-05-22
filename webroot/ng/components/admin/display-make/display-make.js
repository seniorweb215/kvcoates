'use strict';
admin.controller("displayMakeController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
        $rootScope.title = "Manufacturers";



        $scope.create = function () {
            $scope.$broadcast('create-new-manufacturer');
        };

        $scope.edit = function (manufacturer) {
            $scope.$broadcast('edit-manufacturer', {manufacturer: manufacturer});
        };
        
        $scope.remove = function (manufacturer) {
            digitalMediaAPI.manufacturers.remove(manufacturer, function (data) {
                loadManufacturers();
            }, function () {

            });
        };
        
        $scope.reloadManufacturers = function(){
            loadManufacturers();
        };


        var loadManufacturers = function () {
            digitalMediaAPI.manufacturers.all(function (data) {
                $scope.manufacturers = data;
            }, function () {

            });
        };

        var init = function () {
            loadManufacturers();
        };
        init();

    }]);