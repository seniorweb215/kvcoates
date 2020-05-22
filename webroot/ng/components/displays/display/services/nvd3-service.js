displays.factory("nvd3Service", ['digitalMediaAPI', function (digitalMediaAPI) {
        var instance = {};

        var data = [];
        var stackedArea = function () {
            var chart = nv.models.stackedAreaChart()
                    // Gets color (rgba) value using Pages util function $.Pages.getColor()
                    .color([
                        $.Pages.getColor('success', .7),
                        $.Pages.getColor('info'),
                        $.Pages.getColor('primary', .87), //south america
                        $.Pages.getColor('warning'),
                        $.Pages.getColor('complete', .67), //europe
                        $.Pages.getColor('success-dark'),
                        $.Pages.getColor('menu', .2) //antarctica
                    ])
                    .margin({
                        left: 15
                    })
                    .x(function (d) {
                        return d[0]
                    }) //We can modify the data accessor functions...
                    .y(function (d) {
                        return d[1]
                    }) //...in case your data is formatted differently.
                    .useInteractiveGuideline(true) //Tooltips which show all data points. Very nice!
                    .rightAlignYAxis(true) //Let's move the y-axis to the right side.
                    .transitionDuration(500)
                    .showControls(true) //Allow user to choose 'Stacked', 'Stream', 'Expanded' mode.
                    .clipEdge(true);

            //Format x-axis labels with custom function.
            chart.xAxis
                    .tickFormat(function (d) {
                        return d3.time.format('%a')(new Date(d))
                    });

            chart.yAxis
                    .tickFormat(d3.format('d'));



            chart.legend.margin({
                top: 30
            });

            d3.select('#nvd3-area svg')
                    .datum(data.nvd3.stackedArea)
                    .call(chart);

            var xTicks = d3.select('.nv-y.nv-axis  g').selectAll('g');
            xTicks
                    .selectAll('text')
                    .attr('transform', function (d, i, j) {
                        return 'translate (8, 0)'
                    });

            var yTicks = d3.select('.nv-x.nv-axis  g').selectAll('g');
            yTicks
                    .selectAll('text')
                    .attr('transform', function (d, i, j) {
                        return 'translate (0, 10)'
                    });

            var minmax = d3.select('.nv-x.nv-axis g');
            minmax
                    .selectAll('text')
                    .attr('transform', function (d, i, j) {
                        return 'translate (0, 10)'
                    });


            var legend = d3.select('.nv-legendWrap .nv-legend');
            legend.attr('transform', function (d, i, j) {
                return 'translate (0, -20)'
            });


            nv.utils.windowResize(function () {

                chart.update();

                var xTicks = d3.select('.nv-y.nv-axis  g').selectAll('g');
                xTicks
                        .selectAll('text')
                        .attr('transform', function (d, i, j) {
                            return 'translate (10, 0)'
                        });

                var yTicks = d3.select('.nv-x.nv-axis  g').selectAll('g');
                yTicks
                        .selectAll('text')
                        .attr('transform', function (d, i, j) {
                            return 'translate (0, 10)'
                        });

                var minmax = d3.select('.nv-x.nv-axis g');
                minmax
                        .selectAll('text')
                        .attr('transform', function (d, i, j) {
                            return 'translate (0, 10)'
                        });


                var legend = d3.select('.nv-legendWrap .nv-legend');
                legend.attr('transform', function (d, i, j) {
                    return 'translate (0, -20)'
                });

            });

            $('#nvd3-area').data('chart', chart);

            return chart;
        };
        var lineChart1 = function () {
            var chart = nv.models.lineChart()
                    .x(function (d) {
                        return d[0]
                    })
                    .y(function (d) {
                        return d[1] / 100
                    })
                    .color([
                        $.Pages.getColor('success'),
                        $.Pages.getColor('danger'),
                        $.Pages.getColor('primary'), //south america

                        $.Pages.getColor('complete'), //europe

                    ])
                    .useInteractiveGuideline(true);

            chart.xAxis
                    .tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d))
                    });

            chart.yAxis.tickFormat(d3.format(',.2f'));

            d3.select('#nvd3-line svg')
                    .datum(data.nvd3.line)
                    .transition().duration(500)
                    .call(chart);

            nv.utils.windowResize(chart.update);

            $('#nvd3-line').data('chart', chart);

            return chart;
        };
        var lineChart2 = function () {
            var chart = nv.models.lineChart()
                    .x(function (d) {
                        return d[0]
                    })
                    .y(function (d) {
                        return d[1] / 100
                    })
                    .color([
                        $.Pages.getColor('success')
                    ])
                    .useInteractiveGuideline(true);

            chart.xAxis
                    .tickFormat(function (d) {
                        return d3.time.format('%x')(new Date(d))
                    });

            chart.yAxis.tickFormat(d3.format(',.2f'));

            d3.select('#nvd3-line2 svg')
                    .datum(data.nvd3.monthSales)
                    .transition().duration(500)
                    .call(chart);


            nv.utils.windowResize(function () {

                chart.update();
                setTimeout(function () {
                    d3.selectAll('#nvd3-line2 .nvd3 circle.nv-point').attr("r", "4");
                }, 300);
            });


            $('#nvd3-line2').data('chart', chart);

            return chart;
        };

        instance.renderStackedAreaChart = function () {
            d3.json('http://revox.io/json/charts.json', function (d) {
                data = d;
                nv.addGraph(stackedArea);
            });
        };
        instance.renderLineChart1 = function () {
            d3.json('http://revox.io/json/charts.json', function (d) {
                data = d;
                nv.addGraph(lineChart1);
            });
        };
        instance.renderLineChart2 = function () {
            d3.json('http://revox.io/json/charts.json', function (d) {
                data = d;
                nv.addGraph(lineChart2, function () {});
            });
        };

        return instance;
    }]);







