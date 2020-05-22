'use strict';
admin.directive('hoursEditor', [function () {
        return {
            templateUrl: 'ng/components/admin/locations/location/directives/hours-editor/view.html',
            scope: {
                location: '=',
                saveFn: '&',
                cancelFn: '&'
            },
            controller: function ($scope) {


                var initTimePickers = function () {
                    var elements = $('.store-hour-timepicker');
                    console.log(elements);
                    for (var i = 0; i < elements.length; i++) {
                        initTimePicker($(elements[i]));
                    }

                };
                var initTimePicker = function (el) {
                    el.timepicker({
                        showMeridian: false,
                        defaultTime: el.data('time')
                    }).on('show.timepicker', function (e) {
                        var widget = $('.bootstrap-timepicker-widget');
                        widget.find('.glyphicon-chevron-up').removeClass().addClass('pg-arrow_maximize');
                        widget.find('.glyphicon-chevron-down').removeClass().addClass('pg-arrow_minimize');
                    }).on('changeTime.timepicker', function (e) {
                        updateTime($(e.target).data("day"), $(e.target).data("open"), e.time.value);
                    });
                    //el.timepicker('setTime', '00:00');
                    
                };

                var updateTime = function (day, open, time) {
                    switch (day) {
                        case 0:
                            if (open) {
                                $scope.location.location_schedule.monday.opens = time;
                            } else {
                                $scope.location.location_schedule.monday.closes = time;
                            }
                            break;
                        case 1:
                            if (open) {
                                $scope.location.location_schedule.tuesday.opens = time;
                            } else {
                                $scope.location.location_schedule.tuesday.closes = time;
                            }
                            break;
                        case 2:
                            if (open) {
                                $scope.location.location_schedule.wednesday.opens = time;
                            } else {
                                $scope.location.location_schedule.wednesday.closes = time;
                            }
                            break;
                        case 3:
                            if (open) {
                                $scope.location.location_schedule.thursday.opens = time;
                            } else {
                                $scope.location.location_schedule.thursday.closes = time;
                            }
                            break;
                        case 4:
                            if (open) {
                                $scope.location.location_schedule.friday.opens = time;
                            } else {
                                $scope.location.location_schedule.friday.closes = time;
                            }
                            break;
                        case 5:
                            if (open) {
                                $scope.location.location_schedule.saturday.opens = time;
                            } else {
                                $scope.location.location_schedule.saturday.closes = time;
                            }
                            break;
                        case 6:
                            if (open) {
                                $scope.location.location_schedule.sunday.opens = time;
                            } else {
                                $scope.location.location_schedule.sunday.closes = time;
                            }
                            break;
                    }
                    ;
                };

                var init = function () {
                    setTimeout(initTimePickers, 1000);
                };
                init();
            }
        };
    }]);