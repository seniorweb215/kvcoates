'use strict';
displays.directive('campaignHistory', ["digitalMediaAPI", "calendarService", function (digitalMediaAPI,  calendarService) {
        return {
            templateUrl: 'ng/components/displays/display/directives/campaign-history/view.html',
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
                var loadHistory = function () {
                    digitalMediaAPI.displays.history($scope.display.id, function (data) {
                        calendarService.init("#calendar_month", data);
                    }, function () {
                        console.log("error");
                    });
                };
            }
        };
    }]);