'use strict';
admin.controller("blacklistController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
        $rootScope.title = "IP Blacklist";

        $scope.addToBlackList = function () {
            digitalMediaAPI.blacklistedClients.add($scope.newBlackList, function (data) {
                $("#modalFillIn").modal("hide");
                loadClients();
            }, function (data) {

            });
        };
        $scope.removeFromBlacklist = function (client) {
            if (confirm("Are you sure you want to remove this IP from the blacklist?")) {
                digitalMediaAPI.blacklistedClients.remove(client, function (data) {
                    var index = $scope.blacklist.indexOf(client);
                    $scope.blacklist.splice(index, 1);
                    $scope.$apply();
                }, function (data) {

                });
            }
        };


        var loadClients = function () {
            digitalMediaAPI.blacklistedClients.getAll(function (data) {
                $scope.blacklist = data;
            }, function (data) {

            });
        };
        var init = function () {
            loadClients();
        };
        init();
    }]);