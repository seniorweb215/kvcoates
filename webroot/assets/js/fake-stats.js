var HRDashboard = {};
HRDashboard.ViewControllers = {};
HRDashboard.ViewControllers.Overview = function () {
    var init = function () {
        var miniCharts = $(".inline-donut");
        var donut;
        for (var i = 0; i < miniCharts.length; i++) {
            donut = $(miniCharts[i]);
            renderChart(donut, donut.data("percentage"));
        }
    };

    var renderChart = function (el, percentage) {
        var remaining = 100 - percentage;
        var colors = [];

        if (el.hasClass("flight-risk")) {
            colors = ['#DD6A25', '#C53E21'];
        } else if (el.hasClass("turnover")) {
            colors = ['#2F80CF', '#23303E'];
        } else if (el.hasClass("engagement")) {
            colors = ['#5BC697', '#3F9074'];
        }

        el.highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: ''
            },
            colors: colors,
            tooltip: {
                pointFormat: ''
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: false,
                        distance: -50,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '0px 1px 2px black'
                        }
                    }
                }
            },
            series: [{
                    type: 'pie',
                    innerSize: '50%',
                    data: [
                        ['', remaining],
                        ['', percentage]
                    ]
                }]
        });
    };
    init();
};
HRDashboard.ViewControllers.HeadcountOverTime = function () {
    var init = function () {
        $('.headcount-over-time .widget-content').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {// don't display the dummy year
                    month: '%e. %b',
                    year: '%b'
                },
                title: {
                    text: 'Date'
                }
            },
            yAxis: {
                title: {
                    text: ''
                },
                min: 0
            },
            tooltip: {
                headerFormat: '<b>Headcount</b><br>',
                pointFormat: '{point.x:%e. %b}: {point.y:.2f} heads'
            },
            plotOptions: {
                spline: {
                    marker: {
                        enabled: true
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                    // Define the data points. All series have a dummy year
                    // of 1970/71 in order to be compared on the same x axis. Note
                    // that in JavaScript, months start at 0 for January, 1 for February etc.
                    data: [
                        [Date.UTC(1970, 9, 21), 0],
                        [Date.UTC(1970, 10, 4), 0.28],
                        [Date.UTC(1970, 10, 9), 0.25],
                        [Date.UTC(1970, 10, 27), 0.2],
                        [Date.UTC(1970, 11, 2), 0.28],
                        [Date.UTC(1970, 11, 26), 0.28],
                        [Date.UTC(1970, 11, 29), 0.47],
                        [Date.UTC(1971, 0, 11), 0.79],
                        [Date.UTC(1971, 0, 26), 0.72],
                        [Date.UTC(1971, 1, 3), 1.02],
                        [Date.UTC(1971, 1, 11), 1.12],
                        [Date.UTC(1971, 1, 25), 1.2],
                        [Date.UTC(1971, 2, 11), 1.18],
                        [Date.UTC(1971, 3, 11), 1.19],
                        [Date.UTC(1971, 4, 1), 1.85],
                        [Date.UTC(1971, 4, 5), 2.22],
                        [Date.UTC(1971, 4, 19), 1.15],
                        [Date.UTC(1971, 5, 3), 0]
                    ]
                }]
        });
    };
    init();
};
HRDashboard.ViewControllers.HeadcountByOrgUnit = function () {
    var init = function () {
        $('.headcount-org-unit .widget-content').highcharts({
            chart: {
                type: 'pie',
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: ''
            },
            colors: ['#5BC697', '#3C97E0', '#A853DB', '#30465B', '#F17634',
                '#E03B3B', '#FDCA3F'],
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}%'
                    },
                    showInLegend: true
                }
            },
            legend: {
                layout: 'horizontal'
            },
            series: [{
                    name: 'Brands',
                    colorByPoint: true,
                    innerSize: '80%',
                    data: [{
                            name: 'Sales',
                            y: 56.33
                        }, {
                            name: 'Finance',
                            y: 24.03
                        }, {
                            name: 'Customer Support',
                            y: 10.38
                        }, {
                            name: 'R&D',
                            y: 4.77
                        }, {
                            name: 'Marketing',
                            y: 0.91
                        }, {
                            name: 'Logistics',
                            y: 0.9
                        }, {
                            name: 'Production',
                            y: 0.3
                        }]
                }]
        });
    };
    init();
};
HRDashboard.ViewControllers.Gender = function () {
    var init = function () {
        $('.gender .widget-content #gender-bar-chart').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return '';
                    }
                },
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return '';
                    }
                },
                gridLineColor: 'transparent'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        inside: false
                    }
                },
                series: {
                    stacking: 'normal'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                            'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                }
            },
            series: [{
                    name: 'Male',
                    data: [-612]
                }, {
                    name: 'Female',
                    data: [543]
                }]
        });
    };
    init();
};
HRDashboard.ViewControllers.GenderByAgeGroup = function () {
    var init = function () {
        $('.gender-age-group .widget-content #gender-by-age-group-chart').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['15-24', '25-34', '35-44', '45-54', '55-64', '65+']
            },
            yAxis: {
                title: {
                    text: null
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                    name: 'Men',
                    data: [1, 0, 4, 8, 6, 7]
                }, {
                    name: 'Women',
                    data: [5, 7, 3, 3, 2, 1]
                }]
        });
    };
    init();
};
HRDashboard.ViewControllers.TurnoverByOrgUnit = function () {

};
HRDashboard.ViewControllers.StaffMovements = function () {
    var init = function () {
        $('.staff-movements .widget-content').highcharts(waterfallChart());
    };


    var barChart = function () {
        return {
            chart: {
                type: 'column'
            },
            title: {
                text: null
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: 0,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: null
            },
            /*,*/
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: 'Staff Movements: <b>{point.y:.1f}</b>'
            },
            series: [{
                    name: 'Population',
                    data: [{
                            y: 800,
                            name: "Initial",
                            color: "#DD6A25"
                        }, {
                            y: 270,
                            name: "Hires",
                            color: "#5BC697"
                        }, {
                            y: 100,
                            name: "Terms",
                            color: "#E03B3B"
                        },
                        {
                            y: 240,
                            name: "Promotes",
                            color: "#A853DB"
                        },
                        {
                            y: 1100,
                            name: "Final",
                            color: "#409BC4"
                        }
                    ]
                }]
        };
    };
    var waterfallChart = function () {
        return {
            chart: {
                type: 'waterfall'
            },
            title: {
                text: 'Highcharts Waterfall'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'USD'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>${point.y:,.2f}</b> USD'
            },
            series: [{
                    upColor: Highcharts.getOptions().colors[2],
                    color: Highcharts.getOptions().colors[3],
                    data: [{
                            y: 800,
                            name: "Initial",
                            color: "#DD6A25"
                        }, {
                            y: 270,
                            name: "Hires",
                            color: "#5BC697"
                        }, /*{
                            name: 'Positive Balance',
                            isIntermediateSum: true,
                            color: Highcharts.getOptions().colors[1]
                        },*/ 
                        {
                            y: -100,
                            name: "Terms",
                            color: "#E03B3B"
                        }, {
                            y: 240,
                            name: "Promotes",
                            color: "#A853DB"
                        }, {
                            name: 'Balance',
                            isSum: true,
                            color: Highcharts.getOptions().colors[1]
                        }],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return Highcharts.numberFormat(this.y, 0, ',');
                        },
                        style: {
                            color: '#FFFFFF',
                            fontWeight: 'bold',
                            textShadow: '0px 0px 3px black'
                        }
                    },
                    pointPadding: 0
                }]
        };
    };
    init();
};
HRDashboard.ViewControllers.PerformanceByOrgUnit = function () {
    var init = function () {
        $('.perfomance-org-unit .widget-content').highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Sales', 'Finance', 'Customer Support', 'Marketing', 'Logistics', 'Production', 'R&D'],
                labels: {
                    
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                series: {
                    stacking: 'percent',
                    dataLabels: {
                        enabled: true,
                        inside: false,
                        format: '{point.y:.1f}%'
                    }
                }
            },
            series: [{
                    name: "",
                    data: [23, 19, 37, 38, 12, 23, 21],
                    color: "#D9D9D9",
                    dataLabels: {
                        enabled: false
                    }
                }, {
                    name: 'Achieved',
                    data: [{
                            y: 77,
                            name: "Sales",
                            color: "#5BC697"
                        }, {
                            y: 81,
                            name: "Finance",
                            color: "#3C97E0"
                        }, {
                            y: 63,
                            name: "Customer Support",
                            color: "#A853DB"
                        }, {
                            y: 62,
                            name: "Marketing",
                            color: "#F17634"
                        }, {
                            y: 88,
                            name: "Logistics",
                            color: "#E03B3B"
                        }, {
                            y: 77,
                            name: "Production",
                            color: "#FDCA3F"
                        }, {
                            y: 79,
                            name: "R&D",
                            color: "#30465B"
                        }]
                }]
        });
    };
    init();
};
HRDashboard.AppController = function () {
    var overview, headcountOvertime, headcountByOrgUnit, gender, genderByAgeGroup, turnoverByOrgUnit, staffMovements, performanceByOrgUnit;
    var init = function () {
        overview = new HRDashboard.ViewControllers.Overview();
        headcountOvertime = new HRDashboard.ViewControllers.HeadcountOverTime();
        headcountByOrgUnit = new HRDashboard.ViewControllers.HeadcountByOrgUnit();
        gender = new HRDashboard.ViewControllers.Gender();
        genderByAgeGroup = new HRDashboard.ViewControllers.GenderByAgeGroup();
        turnoverByOrgUnit = new HRDashboard.ViewControllers.TurnoverByOrgUnit();
        staffMovements = new HRDashboard.ViewControllers.StaffMovements();
        performanceByOrgUnit = new HRDashboard.ViewControllers.PerformanceByOrgUnit();
    };
    init();
};