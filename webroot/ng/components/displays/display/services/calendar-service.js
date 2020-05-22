displays.factory("calendarService", ['digitalMediaAPI', function (digitalMediaAPI) {
        var instance = {};

        var parseEvents = function (history) {
            var events = [];

            history.forEach(function (playback) {

                var end = moment(playback.end);
                var diff = end.diff(moment(playback.start), 'days');
                console.log(diff);
                for (var i = 0; i <= diff; i++) {
                    events.push({
                        title: playback.campaign.name,
                        class: 'bg-success-lighter',
                        start: moment(playback.start).add(i + 1, 'day').format(),
                        end: moment(playback.start).add(i + 2, 'day').format(),
                        readOnly: true,
                        other: {}
                    });
                }



            });
            return events;
        };
        instance.init = function (selector, history) {
            $(selector).pagescalendar({
                ui: {
                    year: {
                        visible: false,
                        format: 'YYYY',
                        startYear: '2000',
                        endYear: moment().add(10, 'year').format('YYYY'),
                        eventBubble: true
                    },
                    month: {
                        visible: true,
                        format: 'MMM',
                        eventBubble: true
                    },
                    date: {
                        format: 'MMMM YYYY, D dddd'
                    },
                    week: {
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
                events: parseEvents(history),
                eventOverlap: true,
                view: "month"
            });
        };
        return instance;
    }]);








