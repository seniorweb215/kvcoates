'use strict';
displays.directive('siteInfo', ["appService", function (appService) {
        return {
            templateUrl: 'ng/components/displays/display/directives/site-info/view.html',
            scope: {
                display: '='
            },
            controller: function ($scope) {

                var initGallery = function () {
                    appService.initGallery(".gallery", ".gallery-item", function (_gallery) {
                        
                    });
                };
                setTimeout(initGallery, 1000);
            }
        };
    }]);