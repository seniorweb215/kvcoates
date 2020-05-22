'use strict';
content.directive('campaignDuplicator', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/duplicator/view.html',
            scope: {
                createFn: '&'
            },
            controller: function ($scope) {
                $scope.campaign = {};
                $scope.brands = [];
                $scope.campaign_types = [];
                $scope.countries = [];
                $scope.locations = [];
                
                $scope.$on("duplicateCampaign", function(event, args){
                    $("#campaign-duplicator").modal("show");
                    $('#daterangepicker').val('');
                    $scope.campaign = args.campaign;
                    $scope.locations = $scope.campaign.locations;
                });

                $scope.go = function () {
                    $scope.campaign.status = 0;
                    $scope.createFn({campaign: $scope.campaign});
                    $("#campaign-duplicator").modal("hide");
                    $scope.campaign = {};
                };

                
                var initDateRangePicker = function () {
                    $('#duplicate-daterangepicker').daterangepicker({
                        timePicker: true,
                        timePickerIncrement: 15,
                        format: 'DD/MM/YYYY h:mm A'
                    }, function (start, end, label) {
                        $scope.campaign.start = start.format('YYYY-MM-DD HH:mm:ss');
                        $scope.campaign.end = end.format('YYYY-MM-DD HH:mm:ss');
                    });
                };
                var init = function () {
                    initDateRangePicker();
                };
                init();
            }
        };
    }]);