'use strict';
displays.directive('displaySupport', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/displays/display/directives/support/view.html',
            scope: {
               display:'=',
               createFn: '&',
               editFn: '&'
            },
            controller: function ($scope) {
                $scope.issues = [];
                $scope.$watch("display", function (val) {
                    if (val !== null) {
                        loadTickets();
                    }
                });
                
                
                $scope.$on('reload-issues', function(evt){
                    loadTickets();
                });

                var loadTickets = function(){
                    digitalMediaAPI.displayIssues.getAll($scope.display.id, function(data){
                        $scope.issues = data;
                    }, function(){
                        
                    });
                };
            }
        };
    }]);