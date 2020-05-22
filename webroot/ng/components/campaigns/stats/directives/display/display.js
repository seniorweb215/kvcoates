'use strict';
content.directive('displayStats', ["$rootScope", "$state", "highchartsService", "digitalMediaAPI", function ($rootScope, $state, highchartsService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/stats/directives/display/view.html',
            scope: {
                campaign: '=',
                mappings: '=',
                display: '='
            },
            controller: function ($scope) {
                var renderCharts = function () {
                    switch ($scope.campaign.type_id) {
                        case 2:
                            renderLnL();
                            break;
                        case 3:
                            renderTouch();
                            break;
                    }
                };
                var renderLnL = function () {
                    var mappings = $scope.mappings;
                    var data = $scope.display.stats;
                    var pie = [{
                            name: 'Lifts',
                            colorByPoint: true,
                            innerSize: '80%',
                            data: highchartsService.getDataSeries(data, mappings, 'pie')
                        }];
                    highchartsService.pieChart("#lnl-display-piechart-" + $scope.display.id + " .widget-content", "LnL", pie);
                    highchartsService.barChart("#lnl-display-barchart-" + $scope.display.id + " .widget-content", "LnL", highchartsService.getDataSeries(data, mappings, 'bar'));
                };
                var renderTouch = function () {
                    var mappings = $scope.mappings;
                    var data = $scope.display.stats;
                    var touch = [{
                            name: 'Touch',
                            colorByPoint: true,
                            innerSize: '80%',
                            data: highchartsService.getDataSeries(data, mappings, 'pie')
                        }];
                    var scan = [{
                            name: 'Scan',
                            colorByPoint: true,
                            innerSize: '80%',
                            data: highchartsService.getDataSeries(data, mappings, 'pie')
                        }];
                    highchartsService.pieChart("#touch-display-piechart-" + $scope.display.id + " .widget-content", "Touch", touch);
                    highchartsService.pieChart("#scan-display-piechart-" + $scope.display.id + " .widget-content", "Scan", scan);
                };
                
                setTimeout(renderCharts, 100);
            }
        };
    }]);