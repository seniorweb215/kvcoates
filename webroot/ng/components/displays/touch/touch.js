'use strict';
displays.controller("touchDeploymentController", ["$rootScope", "$scope", "$stateParams", "digitalMediaAPI", function ($rootScope, $scope, $stateParams, digitalMediaAPI) {
        $rootScope.title = "Displays";
        
        var displayId = $stateParams.id;
        $scope.display = {};
        $scope.scheduled = [];

        var loadHistory = function () {
            digitalMediaAPI.displays.touch(displayId, function (data) {
                $scope.scheduled = data;
                console.log(data);
            }, function () {
                console.log("error");
            });
        };
        var init = function () {
            if (displayId !== null) {
                digitalMediaAPI.displays.profile(displayId, function (data) {
                    $scope.display = data.display;
                    loadHistory();
                }, function () {
                    console.log("error");
                });
            }
        };
        init();
    }]);