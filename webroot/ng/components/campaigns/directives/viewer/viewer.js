'use strict';
content.directive('campaignViewer', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/viewer/view.html',
            scope: {
            },
            controller: function ($scope) {
                var el;
                $scope.campaign = {};
                $scope.contents = [];
                $scope.$on("previewCampaign", function (evnt, args) {
                    $scope.campaign = args.campaign;
                    el.modal('show');
                    loadContents();
                });


                var loadContents = function () {
                    digitalMediaAPI.campaigns.preview($scope.campaign.id, function (data) {
                        $scope.contents = data.contents;
                    }, function () {

                    });
                };

                var init = function () {
                    el = $("#campaign-viewer");
                    el.on('hidden.bs.modal', function (e) {
                        $scope.$broadcast("stopPreview");
                    });
                };
                init();
            }
        };
    }]);