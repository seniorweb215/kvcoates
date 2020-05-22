'use strict';
admin.controller("bandsController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
		$rootScope.title = "Bands";
		$scope.newBand = {};
		$scope.bands = [];
		
		$scope.addNewBand = function(){
			digitalMediaAPI.bands.add($scope.newBand, function(data){
				$("#modalFillIn").modal("hide");
				$scope.bands.push(data);
				$scope.$apply();
			}, function(data){
				
			});
		};

        $scope.removeBand = function (band) {
            if (confirm("Are you sure you want to remove this band?")) {
                digitalMediaAPI.bands.remove(band, function (data) {
                    var index = $scope.bands.indexOf(band);
                    $scope.bands.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };

		var init = function () {
			digitalMediaAPI.bands.getAll(function (data) {
				$scope.bands = data;
			}, function (data) {
			});
		};

        $scope.edit = function (band) {
            $scope.editingBand = band;
            $("#editingModal").modal("show");
        };

        $scope.save = function () {
            digitalMediaAPI.bands.add($scope.editingBand, function (data) {
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