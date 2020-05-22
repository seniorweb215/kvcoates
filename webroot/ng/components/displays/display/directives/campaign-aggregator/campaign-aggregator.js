'use strict';
displays.directive('campaignAggregator', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/displays/display/directives/campaign-aggregator/view.html',
            scope: {
                display: '=',
                callbackFn: '&'
            },
            controller: function ($scope) {
                var campaign_id = 0;
                $scope.campaigns = [];

                $scope.$on("add-display-to-campaign", function (evt, args) {
                    $("#campaign-aggregator").modal("show");
                });

                $scope.save = function () {
                    digitalMediaAPI.campaigns.attachDisplay(campaign_id, $scope.display.id, {resolution: 0}, function (data) {
                        $scope.callbackFn();
                        $("#campaign-aggregator").modal("close");
                    }, function (data) {
                        console.log(data);
                        $scope.preflight = data;
                        $scope.$apply();
                    });
                };
                $scope.canSave = function () {
                    return (campaign_id !== 0);
                };

                var loadCampaigns = function () {
                    digitalMediaAPI.campaigns.all(0, function (data) {
                        $scope.campaigns = data.filter(function(c){return c.status === 1});
                        campaign_id = ($scope.campaigns.length > 1) ? 0 : data[0].id;
                        $("#campaign-select").select2();
                        $('#campaign-select').on('change', function (evt) {
                            campaign_id = parseInt(evt.val);
                            $scope.$apply();
                        });
                    }, function (data) {

                    });
                };
                loadCampaigns();
            }
        };
    }]);