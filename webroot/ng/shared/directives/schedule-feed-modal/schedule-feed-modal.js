'use strict';
shared.directive('scheduleFeedModal', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/shared/directives/schedule-feed-modal/view.html',
            scope: {
                successFn: '&',
                display: '=',
                available: '='
            },
            controller: function ($scope) {
                var playback = {};
                $scope.selectedFeed = null;
                $scope.$watch("available", function (val) {
                    $('#feedSelect').select2();
                    $('#feedSelect').on('change', function (evt) {
                        playback.feed_id = parseInt(evt.val);
                    });
                });

                $scope.submit = function () {
                    playback.display_id = $scope.display.id;
                    digitalMediaAPI.displays.playback(playback, function(data){
                        console.log("Newly scheduled content:", data);
                        $("#scheduleFeedModal").modal("hide");
                        $scope.successFn({feed:data});
                    }, function(){
                        console.log("error");
                    });
                };

                var applyDateRange = function (start, end, label) {
                    playback.start = start.format('YYYY-MM-DD HH:mm:ss');
                    playback.end = end.format('YYYY-MM-DD HH:mm:ss');
                };

                var init = function () {
                    $('#daterangepicker').daterangepicker({
                        timePicker: true,
                        timePickerIncrement: 15,
                        format: 'MM/DD/YYYY h:mm A'
                    }, applyDateRange);
                    


                };
                init();
            }
        };
    }]);