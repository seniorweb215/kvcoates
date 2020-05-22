'use strict';
content.directive('touchCampaignViewer', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/viewer/touch-campaign/view.html',
            scope: {
                contents: '='
            },
            controller: function ($scope) {
                var player, currentlyPlaying = 0;


                $scope.$on("stopPreview", function (evnt, args) {
                    player[0].pause();
                });
                $scope.$watch("contents", function(val){
                    if(val.length > 0){
                        initPlayer();
                    }
                });


                var initPlayer = function () {
                    player = $("#campaign-video-player");
                    player.on("ended", function () {
                        currentlyPlaying++;
                        if (currentlyPlaying === $scope.contents.length) {
                            currentlyPlaying = 0;
                        }
                        playContent($scope.contents[currentlyPlaying]);
                    });

                    playContent($scope.contents[currentlyPlaying]);
                };

                var playContent = function (content) {
                    player.attr("src", appService.getURL(content.media.url));
                };


            }
        };
    }]);