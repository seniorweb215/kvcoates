'use strict';
content.controller("campaignStatsController", ["$rootScope", "$scope", "$stateParams", "highchartsService", "digitalMediaAPI", function ($rootScope, $scope, $stateParams, highchartsService, digitalMediaAPI) {
        $rootScope.title = "Campaign Stats";
        $scope.campaign = {};

        $scope.getCampaignTypeIcon = function () {
            var css = '';
            if ($scope.campaign !== null) {
                if ($scope.campaign.type_id === 1) {
                    css = 'fa-file-video-o';
                } else if ($scope.campaign.type_id === 2) {
                    css = 'fa-gamepad';
                } else if ($scope.campaign.type_id === 3) {
                    css = 'fa-hand-pointer-o';
                }
            }

            return css;
        };
        $scope.getCampaignTypeName = function () {
            var name = '';
            if ($scope.campaign !== null) {
                if ($scope.campaign.type_id === 1) {
                    name = 'Videos';
                } else if ($scope.campaign.type_id === 2) {
                    name = 'Lift N Learn';
                } else if ($scope.campaign.type_id === 3) {
                    name = 'Touch';
                }
            }

            return name;
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
                        status = "Expired";
                        break;
                }
            }
            return status;
        };


        var renderCharts = function () {
            switch ($scope.campaign.type_id) {
                case 2:
                    renderLnLOverall();
                    break;
                case 3:
                    renderTouchOverall();
                    break;
            }
            renderInteractionOverall();
            
        };
        
        var renderInteractionOverall = function(){
            var overall = $scope.stats.overall;
            highchartsService.lineChart("#overall-interaction .widget-content", "Interaction", highchartsService.getLineDataSeries(overall.interaction, "Lifts"));
        };
        
        var renderLnLOverall = function () {
            var mappings = $scope.stats.mappings;
            var overall = $scope.stats.overall;
            var pie = [{
                    name: 'Lifts',
                    colorByPoint: true,
                    innerSize: '80%',
                    data: highchartsService.getDataSeries(overall.lifts, mappings, 'pie')
                }];
            highchartsService.pieChart("#lnl-overall-piechart .widget-content", "LnL", pie);
            highchartsService.barChart("#lnl-overall-barchart .widget-content", "LnL", highchartsService.getDataSeries(overall.lifts, mappings, 'bar'));
            $scope.overall = highchartsService.getOrganisedDataSeries(overall.lifts, mappings);
        };
        var renderTouchOverall = function () {
            var mappings = $scope.stats.mappings;
            var overall = $scope.stats.overall;
            var touch = [{
                    name: 'Touch',
                    colorByPoint: true,
                    innerSize: '80%',
                    data: highchartsService.getDataSeries(overall.touch, mappings, 'pie')
                }];
            var scan = [{
                    name: 'Scan',
                    colorByPoint: true,
                    innerSize: '80%',
                    data: highchartsService.getDataSeries(overall.scan, mappings, 'pie')
                }];
            highchartsService.pieChart(".touch-stats .widget-content", "Touch", touch);
            highchartsService.pieChart(".scan-stats .widget-content", "Scan", scan);
        };
        var loadStats = function () {
            digitalMediaAPI.stats.campaign($stateParams.id, function (data) {
                $scope.stats = data;
                renderCharts();
            }, function (data) {
            });
        };
        var init = function () {
            digitalMediaAPI.campaigns.profile($stateParams.id, function (data) {
                $scope.campaign = data;
                loadStats();
            }, function (data) {
            });
        };
        init();
    }]);