'use strict';
admin.controller("ownersController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
		$rootScope.title = "Owners";
		$scope.newOwner = {};
		$scope.owners = [];
		
		$scope.addNewOwner = function(){
			digitalMediaAPI.owners.add($scope.newOwner, function(data){
				$("#modalFillIn").modal("hide");
				$scope.owners.push(data);
				$scope.$apply();
			}, function(data){
				
			});
		};

        $scope.removeOwner = function (owner) {
            if (confirm("Are you sure you want to remove this owner?")) {
                digitalMediaAPI.owners.remove(owner, function (data) {
                    var index = $scope.owners.indexOf(owner);
                    $scope.owners.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };

		var init = function () {
			digitalMediaAPI.owners.getAll(function (data) {
				$scope.owners = data;
			}, function (data) {
			});
		};

        $scope.edit = function (owner) {
            $scope.editingOwner = owner;
            $("#editingModal").modal("show");
        };

        $scope.save = function () {
            digitalMediaAPI.owners.add($scope.editingOwner, function (data) {
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