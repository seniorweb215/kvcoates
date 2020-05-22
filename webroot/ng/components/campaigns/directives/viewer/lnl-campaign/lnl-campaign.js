'use strict';
content.directive('lnlCampaignViewer', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/viewer/lnl-campaign/view.html',
            scope: {
                contents: '='
            },
            controller: function ($scope) {
                var player;
                var defaultContent;
                var slots;
                $scope.slots = [];

                $scope.$on("stopPreview", function (evnt, args) {
                    player[0].pause();
                });
                $scope.$watch("contents", function(val){
                    if(val.length > 0){
                        initPlayer();
                    }
                });

                $scope.hasContentInSlot = function(index){
                    return (typeof slots[index] !== 'undefined');
                };
                
                $scope.playContent = function(content){
                    if(typeof content !== 'undefined'){
                        playContent(content);
                    }
                };
                
                var initPlayer = function () {
                    player = $("#campaign-video-player");
                    defaultContent = $scope.contents.find(function(content){return (content.position === 0);});
                    initSlots();
                    player.on("ended", function () {
                        playContent(defaultContent);
                    });

                    playContent(defaultContent);
                };
                var initSlots = function(){
                    slots = [];
                    for(var i = 0; i < 20; i++){
                        slots[i] = $scope.contents.find(function(content){return (content.position === (i + 1));})
                    }
                    $scope.slots = slots;
                };

                var playContent = function (content) {
                    player.attr("src", appService.getURL(content.media.url));
                };


            }
        };
    }]);