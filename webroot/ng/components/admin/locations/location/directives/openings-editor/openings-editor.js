'use strict';
admin.directive('openingsEditor', [function () {
        return {
            templateUrl: 'ng/components/admin/locations/location/directives/openings-editor/view.html',
            scope: {
                location: '=',
                saveFn: '&',
                cancelFn: '&'
            },
            controller: function ($scope) {
                $scope.$watch("location", function (location) {
                    if (location !== null) {
                        initCalendar();
                    }
                });

                var getDayEvent = function (add, day) {
                    var opens = day.opens.split(":");
                    var closes = day.closes.split(":");
                    return {
                        title: 'Opening/Closing hours',
                        class: 'bg-success-lighter',
                        start: moment().startOf('week').add(add, 'days').add(parseInt(opens[0]), 'hours').add(parseInt(opens[1]), 'minutes').format(),
                        end: moment().startOf('week').add(add, 'days').add(parseInt(closes[0]), 'hours').add(parseInt(closes[1]), 'minutes').format(),
                        other: {
                            note: 'test'
                        }
                    };
                };
                var parseEvents = function () {
                    var events = [];
                    var schedule = $scope.location.location_schedule;
                    events.push(getDayEvent(0, schedule.sunday));
                    events.push(getDayEvent(1, schedule.monday));
                    events.push(getDayEvent(2, schedule.tuesday));
                    events.push(getDayEvent(3, schedule.wednesday));
                    events.push(getDayEvent(4, schedule.thursday));
                    events.push(getDayEvent(5, schedule.friday));
                    events.push(getDayEvent(6, schedule.saturday));
                    return events;
                };
                var updateDay = function(event){
                    var opens = moment(event.start);
                    var closes = moment(event.end);
                    switch(event.index){
                        case 0:
                            $scope.location.location_schedule.sunday.opens = getHoursString(opens);
                            $scope.location.location_schedule.sunday.closes = getHoursString(closes);
                            break;
                        case 1:
                            $scope.location.location_schedule.monday.opens = getHoursString(opens);
                            $scope.location.location_schedule.monday.closes = getHoursString(closes);
                            break;
                        case 2:
                            $scope.location.location_schedule.tuesday.opens = getHoursString(opens);
                            $scope.location.location_schedule.tuesday.closes = getHoursString(closes);
                            break;
                        case 3:
                            $scope.location.location_schedule.wednesday.opens = getHoursString(opens);
                            $scope.location.location_schedule.wednesday.closes = getHoursString(closes);
                            break;
                        case 4:
                            $scope.location.location_schedule.thursday.opens = getHoursString(opens);
                            $scope.location.location_schedule.thursday.closes = getHoursString(closes);
                            break;
                        case 5:
                            $scope.location.location_schedule.friday.opens = getHoursString(opens);
                            $scope.location.location_schedule.friday.closes = getHoursString(closes);
                            break;
                        case 6:
                            $scope.location.location_schedule.saturday.opens = getHoursString(opens);
                            $scope.location.location_schedule.saturday.closes = getHoursString(closes);
                            break;
                    }
                    console.log(event, $scope.location.location_schedule);
                };
                var getHoursString = function(momentDate){
                    var hours = momentDate.get('hours');
                    var minutes = momentDate.get('minutes');
                    var string = (hours === 0) ? "00" : hours.toString();
                    string += ":";
                    string +=  (minutes === 0) ? "00" : minutes.toString();
                    return string;
                };
                var setEventDetailsToForm = function (event) {
                    $('#eventIndex').val();
                    $('#txtEventName').val();
                    $('#txtEventCode').val();
                    $('#txtEventLocation').val();
                    //Show Event date
                    $('#event-date').html(moment(event.start).format('MMM, D dddd'));

                    $('#lblfromTime').html(moment(event.start).format('h:mm A'));
                    $('#lbltoTime').html(moment(event.end).format('H:mm A'));

                    //Load Event Data To Text Field
                    $('#eventIndex').val(event.index);
                    $('#txtEventName').val(event.title);
                    $('#txtEventCode').val(event.other.code);
                    $('#txtEventLocation').val(event.other.location);
                }
                var onViewRenderComplete = function () {
                    //You can Do a Simple AJAX here and update 
                };
                var onEventClick = function (event) {
                    //Open Pages Custom Quick View
                    if (!$('#calendar-event').hasClass('open'))
                        $('#calendar-event').addClass('open');
                    selectedEvent = event;
                    setEventDetailsToForm(selectedEvent);
                };
                var onEventDragComplete = function (event) {
                    updateDay(event);
                    selectedEvent = event;
                    setEventDetailsToForm(selectedEvent);
                };
                var onEventResizeComplete = function (event) {
                    updateDay(event);
                    selectedEvent = event;
                    setEventDetailsToForm(selectedEvent);
                };
                var onTimeSlotDblClick = function (timeSlot) {
                    $('#calendar-event').removeClass('open');
                    //Adding a new Event on Slot Double Click
                    var newEvent = {
                        title: 'my new event',
                        class: 'bg-success-lighter',
                        start: timeSlot.date,
                        end: moment(timeSlot.date).add(1, 'hour').format(),
                        allDay: false,
                        other: {
                            //You can have your custom list of attributes here
                            note: 'test'
                        }
                    };
                    selectedEvent = newEvent;
                    $('#myCalendar').pagescalendar('addEvent', newEvent);
                    setEventDetailsToForm(selectedEvent);
                };
                var initCalendar = function () {
                    $('#myCalendar').pagescalendar({
                        ui: {
                            year: {
                                visible: false,
                                format: 'YYYY',
                                startYear: '2000',
                                endYear: moment().add(10, 'year').format('YYYY'),
                                eventBubble: true
                            },
                            month: {
                                visible: false,
                                format: 'MMM',
                                eventBubble: true
                            },
                            date: {
                                format: 'MMMM YYYY, D dddd'
                            },
                            week: {
                                visible: true,
                                day: {
                                    format: 'D'
                                },
                                header: {
                                    format: 'dd'
                                },
                                eventBubble: true,
                                startOfTheWeek: '0',
                                endOfTheWeek: '6'
                            },
                            grid: {
                                dateFormat: 'D dddd',
                                timeFormat: 'h A',
                                eventBubble: true,
                                slotDuration: '30'
                            }
                        },
                        events: parseEvents(),
                        view: "week",
                        onViewRenderComplete: onViewRenderComplete,
                        /*onEventClick: onEventClick,*/
                        onEventDragComplete: onEventDragComplete,
                        onEventResizeComplete: onEventResizeComplete,
                        /*onTimeSlotDblClick: onTimeSlotDblClick*/
                    });
                    $('#eventSave').on('click', function () {
                        selectedEvent.title = $('#txtEventName').val();

                        //You can add Any thing inside "other" object and it will get save inside the plugin.
                        //Refer it back using the same name other.your_custom_attribute

                        selectedEvent.other.code = $('#txtEventCode').val();
                        selectedEvent.other.location = $('#txtEventLocation').val();

                        $('#myCalendar').pagescalendar('updateEvent', selectedEvent);

                        $('#calendar-event').removeClass('open');
                    });
                    $('#eventDelete').on('click', function () {
                        $('#myCalendar').pagescalendar('removeEvent', $('#eventIndex').val());
                        $('#calendar-event').removeClass('open');
                    });
                };
                
                var selectedEvent;
            }
        };
    }]);