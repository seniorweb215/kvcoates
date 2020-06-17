'use strict';
support.directive('ticketWizard', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/support/directives/ticket-wizard/view.html',
            scope: {
                display: '=',
                callbackFn:'&'
            },
            controller: function ($scope) {
                var creating, step;
                $scope.data = [];
                $scope.issue = {};
                $scope.$on('create-new-ticket', function (event, args) {
                    $scope.data.locations = args.locations;
                    $scope.location = {};
                    creating = true;
                    step = 1;

                    $('#locations-select').select2();
                    $scope.location.id = parseInt($scope.data.locations[0].id);
                    $('#locations-select').on('change', function (evt) {
                        $scope.location.id = parseInt(evt.val);
                    });

                    $("#issue-management-modal").modal("show");
                });

                $scope.$on('create-new-ticket-from-displays-list', function (event, args) {
                    $scope.data.displays = args.displays;
                    $scope.display = {};
                    $scope.data.locations = args.locations;
                    $scope.location = {};
                    creating = true;
                    step = 1;
                    
                    
                    $('#displays-select').select2();
                    $scope.display.id = 0;
                    $('#displays-select').on('change', function (evt) {
                        $scope.display.id = parseInt(evt.val);
                    });

                    $('#locations-select').select2();
                    $scope.location.id = parseInt($scope.data.locations[0].id);
                    $('#locations-select').on('change', function (evt) {
                        $scope.location.id = parseInt(evt.val);
                    });

                    $("#issue-management-modal").modal("show");
                });
                
                
                $scope.$on('edit-ticket', function (event, args) {
                    $scope.issue = args.issue;
                    creating = false;
                    initDatePicker();
                    $("#issue-management-modal").modal("show");
                    $('#status-select').select2("val", $scope.issue.status);
                    //$('#resolution-select').select2("val", "");
                });
                
                $scope.$on('edit-ticket-from-display', function (event, args) {
                    $scope.issue = args.issue;
                    $scope.display = args.display;
                    creating = false;
                    initDatePicker();
                    $("#issue-management-modal").modal("show");
                    $('#status-select').select2("val", $scope.issue.status);
                    //$('#resolution-select').select2("val", "");
                });

                var initDatePicker = function() {
                    $("#datepicker").datepicker({
                        autoclose: true
                    }).on('change', function() {
                        $scope.issue.repair_date = $(this).val();
                    });
                }


                $scope.isCreating = function () {
                    return creating;
                };
                $scope.isStep = function (testStep) {
                    return (step === testStep);
                };
                $scope.hasSelectedIssueType = function () {
                    return (typeof $scope.issue.display_issue_type_id !== 'undefined');
                };
                $scope.hasDisplays = function () {
                    return (typeof $scope.data.displays !== 'undefined');
                };

                $scope.save = function () {
                    if (creating) {
                        switch (step) {
                            case 1:
                                $scope.issue.status = 0;
                                $scope.issue.display_id = $scope.display.id;
                                $scope.issue.location_id = $scope.location.id;
                                $scope.issue.raised_by = appService.getLoggedUserId();
                                $scope.issue.fixed_by = 0;
                                digitalMediaAPI.displayIssues.add($scope.issue, function (data) {
                                    step = 2;
                                    $scope.issue = data;
                                    $scope.$apply();
                                }, function () {

                                });
                                break;
                            case 2:
                                $scope.issue = {};
                                $('#new-issue-type-select').select2("val", "");
                                close();
                                break;
                        }
                    } else {
                        $scope.issue.fixed_by = appService.getLoggedUserId();
                        // console.log($scope.issue);return;
                        digitalMediaAPI.displayIssues.add($scope.issue, function (data) {
                            $scope.issue = data;
                            close();
                        }, function () {

                        });
                    }

                };

                var close = function(){
                    $("#issue-management-modal").modal("hide");
                    $scope.callbackFn();
                };

                var onSuccess = function (file, response) {

                };

                var onSending = function (file, xhr, formData) {
                    formData.append("display_issue_id", $scope.issue.id);
                };


                var initSelectors = function () {
                    $('#new-issue-type-select').select2();
                    $('#new-issue-type-select').on('change', function (evt) {
                        $scope.issue.display_issue_type_id = parseInt(evt.val);
                        $scope.$apply();
                    });
                    $('#status-select').select2();
                    $('#status-select').on('change', function (evt) {
                        $scope.issue.status = parseInt(evt.val);
                    });
                };
                var initDropZone = function () {
                    var dropzone1 = new Dropzone("#attachments-uploader", {
                        url: digitalMediaAPI.displayIssues.attachmentEndpoint(),
                        acceptedFiles: '.jpg,.jpeg,.png'
                    });
                    dropzone1.on("sending", onSending);
                    dropzone1.on("success", onSuccess);
                    var dropzone2 = new Dropzone("#attachments-uploader-1", {
                        url: digitalMediaAPI.displayIssues.attachmentEndpoint(),
                        acceptedFiles: '.jpg,.jpeg,.png'
                    });
                    dropzone2.on("sending", onSending);
                    dropzone2.on("success", onSuccess);
                };

                var loadFormData = function () {
                    digitalMediaAPI.displayIssues.getFormData(function (data) {
                        console.log("form", data);
                        $scope.data = data;
                        initSelectors();
                    }, function () {

                    });
                };

                var init = function () {
                    loadFormData();
                    initDropZone();
                };
                init();
                var dropzone = null;
            }
        };
    }]);