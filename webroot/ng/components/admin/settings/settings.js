'use strict';
admin.controller("settingsController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
        $rootScope.title = "Settings";
        $scope.settings = {};
        $scope.dropzonePIN = '';
        $scope.dropzoneLogo = '';

        $scope.save = function () {
            $("#save-button").toggleClass("disabled");
            $("#save-button").text("In Progress");
            digitalMediaAPI.organisations.saveSettings($scope.settings, function (data) {
                $("#save-button").toggleClass("disabled");
                $("#save-button").text("Save");
            }, function () {
                $("#save-button").text("There has been an error!");
            });
        };

        $scope.savePIN = function() {
            $scope.dropzonePIN.processQueue();
            $("#pin-editing-modal").modal("hide");
        };

        $scope.saveLogo = function() {
            $scope.dropzoneLogo.processQueue();
            $("#logo-editing-modal").modal("hide");
        };

        $scope.getCampaignTypeIcon = function (campaign_type) {
            var css = '';
            if (campaign_type.id === 1) {
                css = 'fa-file-video-o';
            } else if (campaign_type.id === 2) {
                css = 'fa-gamepad';
            } else if (campaign_type.id === 3) {
                css = 'fa-hand-pointer-o';
            } else if (campaign_type.id === 4) {
                css = 'fa-simplybuilt';
            } else if (campaign_type.id === 6) {
                css = 'fa-user-circle';
            } else if (campaign_type.id === 7) {
                css = 'fa-id-card-o';
            }

            return css;
        };

        $scope.editPin = function (pin) {
            $scope.selectedPin = pin;
            $("#pin-editing-modal").modal("show");
        };

        $scope.editLogo = function (logo) {
            $scope.selectedLogo = logo;
            $("#logo-editing-modal").modal("show");
        };



        var initDropZone = function () {
            var requiredWidth = 48, requiredHeight = 48;
            var dropzone = new Dropzone("#pins-uploader", {
                url: digitalMediaAPI.organisations.pinEndpoint(),
                autoProcessQueue: false,
                acceptedFiles: 'image/png',
                accept: function (file, done) {
                    file.acceptDimensions = done;
                    file.rejectDimensions = function () {
                        done("Dimensions do not match (48x48).");
                    };
                }
            });
            dropzone.on("sending", function (file, xhr, formData) {
                formData.append("uri", $scope.selectedPin.uri);
            });
            dropzone.on("success", function (file, response) {

            });
            dropzone.on("thumbnail", function (file, response) {
                if (file.width !== requiredWidth && file.height !== requiredHeight) {
                    file.rejectDimensions();
                } else {
                    file.acceptDimensions();
                }
            });
            $scope.dropzonePIN = dropzone;
        };

        var initLogoDropZone = function () {
            var dropzone = new Dropzone("#logo-uploader", {
                url: digitalMediaAPI.organisations.logoEndpoint(),
                autoProcessQueue: false,
                acceptedFiles: 'image/png'
            });
            dropzone.on("sending", function (file, xhr, formData) {
                formData.append("uri", $scope.selectedLogo.uri);
            });
            dropzone.on("success", function (file, response) {

            });
            $scope.dropzoneLogo = dropzone;
        };







        var parseData = function (data) {
            console.log(data);
            for (var property in data.backup) {
                if (data.backup.hasOwnProperty(property)) {
                    data.backup[property] = (data.backup[property] == 'true');
                }
            }
            data.maintenance.on = (data.maintenance.on === 'true');
            data.notification.on = (data.notification.on === 'true');
            data.map.clustered = (data.map.clustered === 'true');
            data.map.unverified = (data.map.unverified === 'true');
            data.map.minions = (data.map.minions === 'true');
            data.campaign.has_facial_analytics = (data.campaign.has_facial_analytics === 'true');
            data.campaign.tod = (data.campaign.tod === 'true');
            data.campaign.default = (data.campaign.default === 'true');
            return data;
        };

        var loadSettings = function () {
            digitalMediaAPI.organisations.getSettings(function (data) {


                $scope.resolutions = data.resolutions;
                $scope.map_styles = data.map_styles;



                $('#screensize-select').select2();
                $('#mapstyle-select').select2();

                $scope.settings = parseData(data);



                setTimeout(initSwitches, 100);
            }, function () {

            });
        };

        var onFeatureToggle = function (e) {
            var el = $(e.target);
            switch (el.data("id")) {
                case "fa":
                    $scope.settings.campaign.has_facial_analytics = !$scope.settings.campaign.has_facial_analytics;
                    break;
                case "tod":
                    $scope.settings.campaign.tod = !$scope.settings.campaign.tod;
                    break;
                case "default":
                    $scope.settings.campaign.default = !$scope.settings.campaign.default;
                    break;
                case "eta":
                    $scope.settings.maintenance.on = !$scope.settings.maintenance.on;
                    break;
                case "notification":
                    $scope.settings.notification.on = !$scope.settings.notification.on;
                    break;
                case "clustered-map":
                    $scope.settings.map.clustered = !$scope.settings.map.clustered;
                    break;
                case "unverified-map":
                    $scope.settings.map.unverified = !$scope.settings.map.unverified;
                    break;
                case "minions-map":
                    $scope.settings.map.minions = !$scope.settings.map.minions;
                    break;
            }

            $scope.save();
        };

        var onCampaignTypeToggle = function (e) {
            var el = $(e.target);

            digitalMediaAPI.organisations.toggleCampaignType(el.data("id"), function (data) {

            }, function () {

            });
        };

        var initSwitches = function () {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.campaign-type-toggle'));
            elems.forEach(function (html) {
                new Switchery(html, {size: 'default', color: '#00b19d'});
            });
            $('.campaign-type-toggle').change(onCampaignTypeToggle);

            var elems = Array.prototype.slice.call(document.querySelectorAll('.feature-toggle'));
            elems.forEach(function (html) {
                new Switchery(html, {size: 'default', color: '#00b19d'});
            });
            $('.feature-toggle').change(onFeatureToggle);





            $('#mapstyle-select').select2('val', $scope.settings.map.style);
            $('#mapstyle-select').on('change', function (evt) {
                $scope.settings.map.style = parseInt(evt.val);
                 $scope.save();
            });

        };

        var initTimePicker = function () {
            $('#timepicker').timepicker().on('show.timepicker', function (e) {
                var widget = $('.bootstrap-timepicker-widget');
                widget.find('.glyphicon-chevron-up').removeClass().addClass('pg-arrow_maximize');
                widget.find('.glyphicon-chevron-down').removeClass().addClass('pg-arrow_minimize');
            });
        };

        var initDatePicker = function () {
            $('#datepicker-component').datepicker();
        };

        var init = function () {
            initTimePicker();
            initDatePicker();
            initDropZone();
            initLogoDropZone();
            loadSettings();
        };
        init();

    }]);