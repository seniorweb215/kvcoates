'use strict';
angular.module('digitalMedia.reports', [])
        .controller('reportsController', ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
                $rootScope.title = "Reports";
                var params = {org_id:0, type: 1};
                $scope.generate = function () {
                    params.start = moment($('#datepicker-start-date').datepicker("getDate")).format('YYYY-MM-DD HH:mm:ss');
                    params.end = moment($('#datepicker-end-date').datepicker("getDate")).format('YYYY-MM-DD HH:mm:ss');
                    digitalMediaAPI.displays.report(params.type, params.org_id, params.start, params.end);
                };

                var loadOrganisations = function () {
                    digitalMediaAPI.organisations.getAll(function (data) {
                        data.unshift({id: 0, name: "All"});
                        $scope.retailers = data;
                        params.org_id = 0;
                        $('#retailer-select').select2();
                         $('#type-select').select2();
                        $('#retailer-select').on('change', function (evt) {
                            params.org_id = parseInt(evt.val);
                        });
                        $('#type-select').on('change', function (evt) {
                            params.type = parseInt(evt.val);
                        });
                    }, function (data) {

                    });
                };

                var init = function () {
                    $('#datepicker-start-date').datepicker();
                    $('#datepicker-end-date').datepicker();
                    $('#datepicker-start-date').datepicker("setDate", moment(new Date()).startOf("month").toDate());
                    $('#datepicker-end-date').datepicker("setDate", moment().toDate());


                    $scope.types = [
                        {
                            id: 1, name: "Display Activity Report"
                        },
                        {
                            id: 2, name: "Display Install Report"
                        }
                    ];
                    loadOrganisations();

                };
                init();
            }]);