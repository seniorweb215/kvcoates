'use strict';
admin.controller("sizesController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
		$rootScope.title = "Sizes";
		$scope.newSize = {};
		$scope.sizes = [];
		
		$scope.addNewSize = function(){
			digitalMediaAPI.sizes.add($scope.newSize, function(data){
				$("#modalFillIn").modal("hide");
				$scope.sizes.push(data);
				$scope.$apply();
			}, function(data){
				
			});
		};

        $scope.removeSize = function (size) {
            if (confirm("Are you sure you want to remove this size?")) {
                digitalMediaAPI.sizes.remove(size, function (data) {
                    var index = $scope.sizes.indexOf(size);
                    $scope.sizes.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };

		var init = function () {
			digitalMediaAPI.sizes.getAll(function (data) {
				$scope.sizes = data;
			}, function (data) {
			});
		};

        $scope.edit = function (size) {
            $scope.editingSize = size;
            $("#editingModal").modal("show");
        };

        $scope.save = function () {
            digitalMediaAPI.sizes.add($scope.editingSize, function (data) {
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