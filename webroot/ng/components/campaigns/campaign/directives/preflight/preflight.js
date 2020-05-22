'use strict';
content.directive('preflightResults', ["appService", "digitalMediaAPI", function (appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/campaign/directives/preflight/view.html',
            scope: {
                results: '='
            },
            controller: function ($scope) {
                
                $scope.$watch('results', function(val){
                    if(val.length > 0){
                        $scope.results = val;
                        $("#preflight-results").modal("show");
                    }
                });
                
                $scope.go = function(){
                    $scope.results = [];
                    $("#preflight-results").modal("hide");
                };
            }
        };
    }]);