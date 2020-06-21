'use strict';
content.directive('campaignPreview', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/campaign/view.html',
            scope: {
                campaign: '=',
                deleteFn: '&',
                duplicateFn: '&',
                mappingsFn: '&',
                editFn: '&',
                reportFn: '&',
                downloadFn: '&',
                stopFn: '&',
                previewFn: '&'
            },
            controller: function ($scope) {


                $scope.getCurrentStatusClass = function () {
                    var className = "";
                    var now = moment();
                    var diff = now.diff(moment($scope.campaign.start), 'hours');

                    if (diff < 0) {
                        className = "label-info";
                    } else {
                        var end = moment();
                        var enddiff = end.diff(moment($scope.campaign.end), 'hours');
                        if (enddiff > 0) {
                            className = "label-important";
                        }else{
                            className = "label-success";
                        }
                    }
                    
                    if($scope.campaign.status === 0){
                        className = "label-warning";
                    }else if($scope.campaign.status === 2){
                        className = "label-important";
                    }
                    return className;
                };
                $scope.getCurrentStatus = function () {
                    var className = "";
                    var now = moment();
                    var diff = now.diff(moment($scope.campaign.start), 'hours');

                    if (diff < 0) {
                        className = "UPCOMING";
                    } else {
                        var end = moment();
                        var enddiff = end.diff(moment($scope.campaign.end), 'hours');
                        if (enddiff > 0) {
                            className = "EXPIRED";
                        }else{
                            className = "LIVE";
                        }
                    }
                    
                    if($scope.campaign.status === 0){
                        className = "PENDING";
                    }else if($scope.campaign.status === 2){
                        className = "TERMINATED";
                    }
                    return className;
                };



                $scope.getStatus = function () {
                    var status = '';
                    if ($scope.campaign !== null) {
                        switch ($scope.campaign.status) {
                            case 0:
                                status = "Unpublished";
                                break;
                            case 1:
                                status = "Published";
                                break;
                            case 2:
                                status = "Stopped";
                                break;
                        }
                    }
                    return status;
                };


                $scope.countDisplays = function () {
                    var displays = [];
                    var display;
                    $scope.campaign.campaign_locations.forEach(function (clocation) {
                        var deployments = clocation.location.deployments;
                        deployments.forEach(function (deployment) {
                            display = deployment.display;
                            displays.push(display.name);
                        });
                    });
                    return displays.length;
                };
                $scope.countLocations = function () {
                    var locations = [];
                    $scope.campaign.campaign_locations.forEach(function (clocation) {
                        locations.push(clocation.location.name);
                    });
                    return locations.length;
                };

                $scope.getDisplays = function () {
                    var displays = [];
                    $scope.campaign.campaign_locations.forEach(function (clocation) {
                        var deployments = clocation.location.deployments;
                        deployments.forEach(function (deployment) {
                            displays.push(deployment.display.name);
                        });
                    });
                    return displays.join(",");
                };

                $scope.getLocations = function () {
                    var locations = [];
                    $scope.campaign.campaign_locations.forEach(function (clocation) {
                        locations.push(clocation.location.name);
                    });
                    return locations.join(",");
                };

                $scope.getCampaignTypeIcon = function () {
                    var css = '';
                    if ($scope.campaign.type_id === 1) {
                        css = 'fa-file-video-o';
                    } else if ($scope.campaign.type_id === 2) {
                        css = 'fa-gamepad';
                    } else if ($scope.campaign.type_id === 3) {
                        css = 'fa-hand-pointer-o';
                    } else if ($scope.campaign.type_id === 4) {
                        css = 'fa-simplybuilt';
                    }
                    return css;
                };
                $scope.getCampaignTypeName = function () {
                    var name = '';
                    if ($scope.campaign.type_id === 1) {
                        name = 'Videos';
                    } else if ($scope.campaign.type_id === 2) {
                        name = 'LnL';
                    } else if ($scope.campaign.type_id === 3) {
                        name = 'Touch';
                    } else if ($scope.campaign.type_id === 4) {
                        name = 'VR';
                    }
                    return name;
                };
            }
        };
    }]);