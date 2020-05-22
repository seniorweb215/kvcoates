'use strict';
admin.directive('deployedDisplayTr', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/admin/locations/location/directives/deployed-display-tr/view.html',
            scope: {
                display: '=',
                location: '=',
                undeployDisplay : '&'
            },
            controller: function ($scope) {
                $scope.upcomingCampaign = {};
                $scope.statusMessage = function () {
                    return ($scope.display.verified === 1) ? "Verified" : "Not Verified";
                };

                $scope.isVerified = function () {
                    return ($scope.display.verified === 1);
                };

                
                
                $scope.getStatusClass = function () {
                    var className = "label-important";
                    if ($scope.isVerified()) {
                        var now = moment();
                        var diff = now.diff(moment($scope.display.last_login), 'hours');
                        if (diff < 12) {
                            className = "label-success";
                        } else if (diff >= 12 && diff <= 24) {
                            className = "label-warning";
                        }
                    }

                    if ($scope.display.network === "Independent") {
                        className = "label-info";
                    }
                    return className;
                };
                $scope.getStatus = function () {
                    var status = "PENDING";
                    if ($scope.isVerified()) {
                        var now = moment();
                        var diff = now.diff(moment($scope.display.last_login), 'hours');
                        if (diff < 12) {
                            status = "ONLINE";
                        } else{
                            status = "OFFLINE";
                        }
                    }
                    if ($scope.display.network === "Independent") {
                        status = "INDEPENDENT";
                    }
                    return status;
                };

                $scope.getUpcomingCampaignTypeName = function () {
                    var name = '';
                    if ($scope.upcomingCampaign.type_id === 1) {
                        name = 'Videos';
                    } else if ($scope.upcomingCampaign.type_id === 2) {
                        name = 'Lift N Learn';
                    } else if ($scope.upcomingCampaign.type_id === 3) {
                        name = 'Touch';
                    } else if ($scope.upcomingCampaign.type_id === 4) {
                        name = 'VR';
                    }
                    return " / " + name;
                };
                
                var getUpcomingCampaign = function () {
                    $scope.upcomingCampaign = {name: "Default", type_id: 0};
                    if ($scope.display.scheduled_playbacks !== null) {
                        if ($scope.display.scheduled_playbacks.length > 0) {
                            $scope.upcomingCampaign = $scope.display.scheduled_playbacks[0].campaign;
                        }
                    }
                };

                getUpcomingCampaign();
                
            }
        };
    }]);