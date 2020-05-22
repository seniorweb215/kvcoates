'use strict';
support.directive('ticketTr', [function () {
        return {
            templateUrl: 'ng/components/support/directives/ticket-tr/view.html',
            scope: {
                issue: '=',
                editFn: '&'
            },
            controller: function ($scope) {

                $scope.isDisplayKnown = function(){
                    return (typeof $scope.issue.display !== 'undefined');
                };
                $scope.getTakenAction = function () {
                    return ($scope.issue.actions === "") ? "No action taken" : $scope.issue.actions;
                };

                $scope.getCurrentStatusClass = function () {
                    var status = '';
                    switch ($scope.issue.status) {
                        case 0:
                            status = "label-important";
                            break;
                        case 1:
                            status = "label-info";
                            break;
                        case 2:
                            status = "label-success";
                            break;
                    }

                    return status;
                };
                $scope.getCurrentStatus = function () {
                    var status = '';
                    switch ($scope.issue.status) {
                        case 0:
                            status = "Pending";
                            break;
                        case 1:
                            status = "In Process";
                            break;
                        case 2:
                            status = "Solved";
                            break;
                    }

                    return status;
                };
            }
        };
    }]);