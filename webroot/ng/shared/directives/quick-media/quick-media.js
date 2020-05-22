'use strict';
shared.directive('quickMedia', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/shared/directives/quick-media/view.html',
            scope: {
                selectFn: '&'
            },
            controller: function ($scope) {
                $scope.media = [];

                $scope.getURL = function (url) {
                    return appService.getURL(url);
                };

                $scope.select = function (node) {
                    $scope.selectFn({node: node});
                };

                var resetGallery = function () {
                    appService.resetGallery(gallery);
                    initGallery();
                };

                var initGallery = function () {
                    appService.initGallery(".gallery", ".gallery-item", function (_gallery) {
                        console.log(gallery);
                        gallery = _gallery;
                    });
                };

                var load = function () {
                    digitalMediaAPI.media.me(appService.getLoggedUserOrganisationId(), function (data) {
                        $scope.media = data;
                        setTimeout(initGallery, 100);
                    }, function () {
                        console.log("error Loading Org Media");
                    });
                };

                var init = function () {
                    load();
                };

                var gallery = {};
                init();
            }
        };
    }]);