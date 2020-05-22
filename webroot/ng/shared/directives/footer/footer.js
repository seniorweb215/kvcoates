'use strict';
shared.directive('footer', [function () {
        return {
            templateUrl: 'ng/shared/directives/footer/view.html',
            scope: {
            },
            controller: function ($scope) {
                $scope.date = new Date();
                
                $scope.getSiteTitle = function(){
                    return siteTitle;
                };
            }
        };
    }]);