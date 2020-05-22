'use strict';
content.directive('campaignMapper', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/mapper/view.html',
            scope: {
                campaign: '='
            },
            controller: function ($scope) {
                $scope.$watch("campaign", function (val) {
                    if (typeof val !== 'undefined') {
                        $("#campaign-mapper").modal("show");
                    }
                });

                $scope.hasMappings = function () {
                    if (typeof $scope.campaign !== 'undefined') {
                        return ($scope.campaign.mappings.length > 0);
                    } else {
                        return false;
                    }
                };
                
                $scope.done = function () {
                    $("#campaign-mapper").modal("hide");
                };


                $scope.addNewMapping = function () {
                    $scope.newMapping.campaign_id = $scope.campaign.id;
                    digitalMediaAPI.mappings.add($scope.newMapping, function (data) {
                        $scope.campaign.mappings.push(data);
                        $scope.newMapping = {};
                        $scope.$apply();
                    }, function (data) {
                        console.log(data);
                    });
                };
                $scope.removeMapping = function (mapping) {
                    if (confirm("Are you sure you want to remove this mapping?")) {
                        digitalMediaAPI.mappings.remove(mapping, function (data) {
                            var index = $scope.campaign.mappings.indexOf(mapping);
                            $scope.campaign.mappings.splice(index, 1);
                            $scope.$apply();
                        }, function (data) {
                            console.log(data);
                        });
                    }
                };
            }
        };
    }]);