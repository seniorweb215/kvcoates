shared.factory("highchartsService", ['digitalMediaAPI', function (digitalMediaAPI) {
        var instance = {};

        var getMappingForTag = function (tag, mappings) {
            var value = tag;
            mappings.forEach(function (mapping) {
                if (mapping.tag.toLowerCase() === tag.toLowerCase()) {
                    value = mapping.value;
                }
            });
            return value;
        };


        instance.getDataSeries = function (histogram, mappings, type) {
            var data = [];
            var object = {};

            histogram.forEach(function (bin) {
                switch (type) {
                    case 'pie':
                        object = {name: getMappingForTag(bin.tag, mappings), y: bin.count};
                        break;
                    case 'bar':
                        object = {name: getMappingForTag(bin.tag, mappings), data: [bin.count]};
                        break;
                }
                data.push(object);
            });
            return data;
        };


        instance.getOrganisedDataSeries = function (histogram, mappings) {
            var data = [];
            var object = {}, id;


            histogram.forEach(function (bin) {
                id = bin.tag.replace(/[a-zA-Z]/g , "");
                object = {id: parseInt(id), tag: bin.tag, name: getMappingForTag(bin.tag, mappings), count: bin.count};
                data.push(object);
            });

            data.sort(function(a, b) {
                if (a.id < b.id)
                    return -1;
                if (a.id > b.id)
                    return 1;
                return 0;
            });
            return data;
        };

        instance.getLineDataSeries = function (histogram, name) {
            var data = [];
            var x = [];
            histogram.forEach(function (bin) {
                data.push(bin.count);
                x.push(moment(bin.log_date).format("DD/MM/YY, h:mm a"));
            });
            return {data: data, x: x, y: name};
        };



        instance.pieChart = function (el, title, series) {
            $(el).highcharts({
                chart: {
                    type: 'pie',
                    plotBackgroundColor: null,
                    plotBorderWidth: 0,
                    plotShadow: false
                },
                title: {
                    text: title
                },
                colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.1f}%'
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    layout: 'horizontal'
                },
                series: series
            });
        };


        instance.barChart = function (el, title, series) {
            $(el).highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: title
                },
                xAxis: {
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: null
                },
                colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} lifts</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    },
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}'
                        }
                    }
                },
                series: series
            });
        };



        instance.lineChart = function (el, title, series) {
            $(el).highcharts({
                chart: {
                    type: 'line'
                },
                title: {
                    text: title
                },
                xAxis: {
                    categories: series.x
                },
                yAxis: {
                    title: {
                        text: series.y
                    }
                },
                plotOptions: {
                },
                series: [{
                        name: series.y,
                        data: series.data
                    }]
            }
            );
        };

        return instance;
    }]);


