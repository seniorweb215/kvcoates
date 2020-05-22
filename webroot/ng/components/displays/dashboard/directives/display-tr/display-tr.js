'use strict';
displays.directive('displayTr', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/displays/dashboard/directives/display-tr/view.html',
            scope: {
                display: '=',
                removeFn: '&'
            },
            controller: function ($scope) {

                $scope.upcomingCampaign = {};

                $scope.statusMessage = function () {
                    return ($scope.display.verified === 1) ? "V" : "NV";
                };

                $scope.isVerified = function () {
                    return ($scope.display.verified === 1);
                };

                $scope.isTouch = function () {
                    return ($scope.display.modules.touch);
                };

                $scope.touchMessage = function () {
                    return ($scope.display.modules.touch) ? "Yes" : "No";
                };

                $scope.hasBeenDeployed = function () {
                    return ($scope.display.deployment !== null && $scope.display.deployment.location !== null);
                };

                $scope.getOrganisationName = function () {
                    return ($scope.display.deployment !== null && $scope.display.deployment.location !== null) ? $scope.display.deployment.location.organisation.name : "";
                };
                $scope.getLocationName = function () {
                    return ($scope.display.deployment !== null && $scope.display.deployment.location !== null) ? $scope.display.deployment.location.name : "";
                };
                $scope.getLocationAddress = function () {
                    return ($scope.display.deployment !== null && $scope.display.deployment.location !== null) ? $scope.display.deployment.location.address : "";
                };
                $scope.deploymentMessage = function () {
                    var message = "";
                    if ($scope.display.deployment !== null && $scope.display.deployment.location !== null) {
                        message = "";
                    } else {
                        message = "Not deployed";
                    }
                    return message;
                };
                
                $scope.getOSIcon = function(){
                    var icon = "";
                    switch($scope.display.os){
                        case "Windows":
                            icon = "fa-windows";
                            break;
                        case "Android":
                            icon = "fa-android";
                            break;
                        case "Unix":
                            icon = "fa-linux";
                            break;
                        case "iOS":
                            icon = "fa-apple";
                            break;
                    }
                    return icon;
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

                $scope.getStatusClass = function () {
                    var className = "label-important";
                    if ($scope.isVerified()) {
                        var now = moment();
                        var diff = now.diff(moment($scope.display.last_login), 'hours');
                        if (diff < settings.offline_two) {
                            className = "label-success";
                        } else if (diff >= settings.offline_two && diff <= settings.offline_one) {
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
                        if (diff < settings.offline_one) {
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





                $scope.hasMotionDetection = function () {
                    return ($scope.display.modules.facial_detection);
                };
                $scope.hasLiftNLearn = function () {
                    return ($scope.display.modules.lift_n_learn);
                };

                $scope.hasWifi = function () {
                    return ($scope.display.network === "Wifi");
                };
                $scope.remove = function () {
                    $scope.removeFn({display: $scope.display});
                };
                $scope.networkImage = function () {
                    var image = "fa-wifi";
                    switch ($scope.display.network) {
                        case "Wifi":
                            image = "fa-wifi";
                            break;
                        case "3G":
                            image = "fa-mobile";
                            break;
                        case "Lan":
                            image = "fa-television";
                            break;
                        case "Independent":
                            image = "fa-television";
                            break;
                    }
                    return image;
                };



                $scope.checkForCampaigns = function () {
                    digitalMediaAPI.notifications.push($scope.display.id, 1, pushSuccess, pushError);
                };

                $scope.syncStats = function () {
                    digitalMediaAPI.notifications.push($scope.display.id, 2, pushSuccess, pushError);
                };

                var pushSuccess = function (data) {
                    alert("Notification Sent!");
                };
                var pushError = function (data) {
                    alert("Error: " + data);
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