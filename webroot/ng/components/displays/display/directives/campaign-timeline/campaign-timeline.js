'use strict';
displays.directive('campaignTimeline', ["digitalMediaAPI", function (digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/displays/display/directives/campaign-timeline/view.html',
            scope: {
                display: '='
            },
            controller: function ($scope) {
                $scope.campaign = null;
                $scope.$watch("display", function (val) {
                    if (val !== null) {
                        loadHistory();
                    }
                });
                
                $scope.$on('reload-timeline', function(evt){
                    loadHistory();
                });
                
                $scope.addToCampaign = function(){
                    $scope.$emit("add-to-campaign");
                };
                
                $scope.getCampaignTypeIcon = function (campaign) {
                    var css = '';
                    if (campaign.type_id === 1) {
                        css = 'fa-file-video-o';
                    } else if (campaign.type_id === 2) {
                        css = 'fa-gamepad';
                    } else if (campaign.type_id === 3) {
                        css = 'fa-hand-pointer-o';
                    } else if (campaign.type_id === 4) {
                        css = 'fa-simplybuilt';
                    }
                    return css;
                };
                $scope.getCampaignTypeName = function (campaign) {
                    var name = '';
                    if (campaign.type_id === 1) {
                        name = 'Videos';
                    } else if (campaign.type_id === 2) {
                        name = 'LnL';
                    } else if (campaign.type_id === 3) {
                        name = 'Touch';
                    } else if (campaign.type_id === 4) {
                        name = 'VR';
                    }
                    return name;
                };
                
                var loadHistory = function () {
                    digitalMediaAPI.displays.history($scope.display.id, function (data) {
                        $scope.data = data;
                    }, function () {
                        console.log("error");
                    });
                };
            }
        };
    }]);