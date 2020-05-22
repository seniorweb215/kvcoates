'use strict';
admin.controller("brandsController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
		$rootScope.title = "Brands";
		$scope.newBrand = {};
		$scope.brands = [];
		
		$scope.addNewBrand = function(){
			digitalMediaAPI.brands.add($scope.newBrand, function(data){
				$("#modalFillIn").modal("hide");
				$scope.brands.push(data);
				$scope.$apply();
			}, function(data){
				
			});
		};

        $scope.removeBrand = function (brand) {
            if (confirm("Are you sure you want to remove this brand?")) {
                digitalMediaAPI.brands.remove(brand, function (data) {
                    var index = $scope.brands.indexOf(brand);
                    $scope.brands.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };

		var init = function () {
			digitalMediaAPI.brands.getAll(function (data) {
				$scope.brands = data;
			}, function (data) {
			});
		};

        $scope.edit = function (brand) {
            $scope.editingBrand = brand;
            $("#editingModal").modal("show");
        };

        $scope.save = function () {
            digitalMediaAPI.brands.add($scope.editingBrand, function (data) {
                $scope.$apply();
                $scope.cancel();
            }, function (data) {
                console.log(data);
            });
        };

        $scope.cancel = function () {
            $("#editingModal").modal("hide");
        };

		init();
	}]);