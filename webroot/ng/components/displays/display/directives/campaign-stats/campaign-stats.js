'use strict';
displays.directive('campaignStats', ["digitalMediaAPI", "appService", "nvd3Service", function (digitalMediaAPI, appService, nvd3Service) {
        return {
            templateUrl: 'ng/components/displays/display/directives/campaign-stats/view.html',
            scope: {
                campaigns: '='
            },
            controller: function ($scope) {
                $scope.campaign = null;
                $scope.$watch("campaigns", function(val){
                    if(val.length > 0){
                        nvd3Service.renderLineChart1();
                        $scope.campaign = $scope.campaigns[0];
                    }
                });
                $scope.hasCampaigns = function(){
                    return ($scope.campaigns.length > 0);
                };
                var init = function(){
                    if($scope.hasCampaigns()){
                        $scope.campaign = $scope.campaigns[0];
                    }
                };
                init();
            }
        };
    }]);