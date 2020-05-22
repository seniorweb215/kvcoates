'use strict';
displays.directive('displaysTableView', ["$state", "digitalMediaAPI", "appService", "mapService", function ($state, digitalMediaAPI, appService, mapService) {
        return {
            templateUrl: 'ng/components/displays/dashboard/directives/table-view/view.html',
            scope: {
                displays: "=",
                removeFn: '&',
                exportFn: '&'
            },
            controller: function ($scope) {
                var sent = 0;
                var errors = 0;
                $scope.sending = false;
                $scope.removeDisplay = function(display){
                    $scope.removeFn({display: display});
                };
                
                $scope.checkForCampaigns = function () {
                    sent = 0;
                    errors = 0;
                    $scope.sending = true;
                    $scope.displays.forEach(function(display){
                        digitalMediaAPI.notifications.push(display.id, 1, pushSuccess, pushError);
                    });
                };

                $scope.syncStats = function () {
                    sent = 0;
                    errors = 0;
                    $scope.sending = true;
                    $scope.displays.forEach(function(display){
                        digitalMediaAPI.notifications.push(display.id, 2, pushSuccess, pushError);
                    });
                };
                
                
                var checkForCompletion = function(){
                    if(sent === $scope.displays.length){
                        var a = sent - errors;
                        var string = a + " devices were notified";
                        string = (errors === 0) ? string : string + ", the remaining " + errors + " had no valid token!";
                        alert(string);
                        $scope.sending = false;
                        $scope.$apply();
                    }
                };
                var pushSuccess = function (data) {
                    sent++;
                    checkForCompletion();
                };
                var pushError = function (data) {
                    sent++;
                    errors++;
                    checkForCompletion();
                };
            }
        };
    }]);