'use strict';
admin.directive('displayManufacturer', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/admin/display-make/directives/manufacturer/view.html',
            scope: {
                callbackFn: '&'
            },
            controller: function ($scope) {
                $scope.data = [];
                $scope.manufacturer = {};
                $scope.$on('create-new-manufacturer', function (event, args) {
                    show();
                });
                $scope.$on('edit-manufacturer', function (event, args) {
                    $scope.manufacturer = args.manufacturer;
                    initEditing();
                    show();
                });
                $scope.hasSetRequiredFields = function(){
                    return (isSet($scope.manufacturer.manufacturer_brand_id) && isSet($scope.manufacturer.tech_specs.size) && isSet($scope.manufacturer.tech_specs.resolution) && isSet($scope.manufacturer.tech_specs.os) && isSet($scope.manufacturer.tech_specs.version));
                };
                $scope.save = function () {
                    digitalMediaAPI.manufacturers.add($scope.manufacturer, function (data) {
                        close();
                    }, function () {

                    });
                };
                $scope.close = function () {
                    close();
                };
                var isSet = function(property){
                    return (typeof property !== 'undefined' && property !== 0);
                };

                var show = function () {
                    $("#manufacturer-management-modal").modal({backdrop: 'static', show:true});
                };
                var close = function () {
                    resetSwitches();
                    initInstance();
                    $("#manufacturer-management-modal").modal("hide");
                    $scope.callbackFn();
                };


                var onSuccess = function (file, response) {

                };

                var onSending = function (file, xhr, formData) {
                    formData.append("display_issue_id", $scope.issue.id);
                };


                var onModuleToggle = function (e) {
                    var el = $(e.target);
                    //callbacks.onLanguageStatusChange(, el.is(':checked'));
                    switch (el.data("module")) {
                        case "facial":
                            $scope.manufacturer.tech_specs.facial_analytics = !$scope.manufacturer.facial_analytics;
                            break;
                        case "touch":
                            $scope.manufacturer.tech_specs.touch = !$scope.manufacturer.tech_specs.touch;
                            break;
                        case "liftlearn":
                            $scope.manufacturer.tech_specs.lift_n_learn = !$scope.manufacturer.tech_specs.lift_n_learn;
                            break;
                        case "nfc":
                            $scope.manufacturer.tech_specs.nfc = !$scope.manufacturer.tech_specs.nfc;
                            break;
                        case "camera":
                            $scope.manufacturer.tech_specs.camera = !$scope.manufacturer.tech_specs.camera;
                            break;
                        case "vr":
                            $scope.manufacturer.tech_specs.vr = !$scope.manufacturer.tech_specs.vr;
                            break;
                        case "usb":
                            $scope.manufacturer.tech_specs.usb = !$scope.manufacturer.tech_specs.usb;
                            break;
                        case "hdmi":
                            $scope.manufacturer.tech_specs.hdmi_out = !$scope.manufacturer.tech_specs.hdmi_out;
                            break;
                        case "poe":
                            $scope.manufacturer.tech_specs.poe = !$scope.manufacturer.tech_specs.poe;
                            break;
                        case "rooted":
                            $scope.manufacturer.tech_specs.rooted = !$scope.manufacturer.tech_specs.rooted;
                            break;
                        case "compatible":
                            $scope.manufacturer.tech_specs.app_compatible = !$scope.manufacturer.tech_specs.app_compatible;
                            break;
                        case "bootonmains":
                            $scope.manufacturer.tech_specs.boot_on_mains = !$scope.manufacturer.tech_specs.boot_on_mains;
                            break;
                        case "menubar":
                            $scope.manufacturer.tech_specs.menubar_hide = !$scope.manufacturer.tech_specs.menubar_hide;
                            break;
                            
                        case "threeg":
                            $scope.manufacturer.network.threeg = !$scope.manufacturer.network.threeg;
                            break;
                        case "fourg":
                            $scope.manufacturer.network.fourg = !$scope.manufacturer.network.fourg;
                            break;
                        case "wifi25g":
                            $scope.manufacturer.network.wifi25g = !$scope.manufacturer.network.wifi25g;
                            break;
                        case "wifi5g":
                            $scope.manufacturer.network.wifi5g = !$scope.manufacturer.network.wifi5g;
                            break;
                        case "bluetooth":
                            $scope.manufacturer.network.bluetooth = !$scope.manufacturer.network.bluetooth;
                            break;
                        case "lan":
                            $scope.manufacturer.network.lan = !$scope.manufacturer.network.lan;
                            break;
                        case "battery":
                            $scope.manufacturer.tech_specs.battery = !$scope.manufacturer.tech_specs.battery;
                            break;
                    }
                };

                var initEditing = function () {
                    $('#manufacturer-select').select2("val", $scope.manufacturer.manufacturer_brand_id);
                    $('#size-select').select2("val", $scope.manufacturer.tech_specs.size);
                    $('#resolution-select').select2("val", $scope.manufacturer.tech_specs.resolution);
                    $('#os-select').select2("val", $scope.manufacturer.tech_specs.os);
                    $('#version-select').select2("val", $scope.manufacturer.tech_specs.version);
                    switches.forEach(function(s){
                        switch($(s.element).data("module")){
                            case "facial":
                                s.setPosition($scope.manufacturer.tech_specs.facial_analytics);
                                break;
                            case "liftlearn":
                                s.setPosition($scope.manufacturer.tech_specs.lift_n_learn);
                                break;
                            case "touch":
                                s.setPosition($scope.manufacturer.tech_specs.touch);
                                break;
                            case "nfc":
                                s.setPosition($scope.manufacturer.tech_specs.nfc);
                                break;
                            case "camera":
                                s.setPosition($scope.manufacturer.tech_specs.camera);
                                break;
                            case "vr":
                                s.setPosition($scope.manufacturer.tech_specs.vr);
                                break;
                            case "usb":
                                s.setPosition($scope.manufacturer.tech_specs.usb);
                                break;
                            case "hdmi":
                                s.setPosition($scope.manufacturer.tech_specs.hdmi_out);
                                break;
                            case "poe":
                                s.setPosition($scope.manufacturer.tech_specs.poe);
                                break;
                            case "rooted":
                                s.setPosition($scope.manufacturer.tech_specs.rooted);
                                break;
                            case "bootonmains":
                                s.setPosition($scope.manufacturer.tech_specs.boot_on_mains);
                                break;
                            case "menubar":
                                s.setPosition($scope.manufacturer.tech_specs.menubar_hide);
                                break;
                            case "compatible":
                                s.setPosition($scope.manufacturer.tech_specs.app_compatible);
                                break;
                                
                            case "threeg":
                                s.setPosition($scope.manufacturer.network.threeg);
                                break;
                            case "fourg":
                                s.setPosition($scope.manufacturer.network.fourg);
                                break;
                            case "wifi25g":
                                s.setPosition($scope.manufacturer.network.wifi25g);
                                break;
                            case "wifi5g":
                                s.setPosition($scope.manufacturer.network.wifi5g);
                                break;
                            case "bluetooth":
                                s.setPosition($scope.manufacturer.network.bluetooth);
                                break;
                            case "lan":
                                s.setPosition($scope.manufacturer.network.lan);
                                break;
                            case "battery":
                                s.setPosition($scope.manufacturer.tech_specs.battery);
                                break;
                        }
                    });
                };
                var initInstance = function () {
                    $('#manufacturer-select').select2("val", "");
                    $('#size-select').select2("val", "");
                    $('#resolution-select').select2("val", "");
                    $('#os-select').select2("val", "");
                    $('#version-select').select2("val", "");
                    $scope.manufacturer = {};
                    $scope.manufacturer.tech_specs = initTechSpecs();
                    $scope.manufacturer.network = initNetwork();
                };
                
                var initTechSpecs = function(){
                    return {
                        size: 0,
                        resolution: 0,
                        os: 0,
                        version: 0,
                        facial_analytics: false,
                        lift_n_learn: false,
                        touch: false,
                        nfc: false,
                        camera: false,
                        vr: false,
                        usb: false,
                        hdmi_out: false,
                        poe: false,
                        rooted: false,
                        boot_on_mains: false,
                        battery: false,
                        menubar_hide : false,
                        power: "5V USB",
                        app_compatible : false
                    };
                };
                var initNetwork = function(){
                    return {
                       threeg: false,
                       fourg: false,
                       wifi25g: false,
                       wifi5g: false,
                       bluetooth: false,
                       lan: false
                    };
                };
                var initUI = function () {
                    initSelectors();
                    initInstance();
                    initSwitches();

                };
                var initSelectors = function () {
                    $('#manufacturer-select').select2();
                    $('#size-select').select2();
                    $('#resolution-select').select2();
                    $('#os-select').select2();
                    $('#version-select').select2();

                    $('#manufacturer-select').on('change', function (evt) {
                        $scope.manufacturer.manufacturer_brand_id = evt.val;
                        $scope.$apply();
                    });
                    $('#size-select').on('change', function (evt) {
                        $scope.manufacturer.tech_specs.size = parseInt(evt.val);
                        $scope.$apply();
                    });
                    $('#resolution-select').on('change', function (evt) {
                        $scope.manufacturer.tech_specs.resolution = parseInt(evt.val);
                        $scope.$apply();
                    });
                    $('#os-select').on('change', function (evt) {
                        $scope.manufacturer.tech_specs.os = parseInt(evt.val);
                        $scope.$apply();
                    });
                    $('#version-select').on('change', function (evt) {
                        $scope.manufacturer.tech_specs.version = evt.val;
                        $scope.$apply();
                    });
                };
                var initSwitches = function () {
                    var elems = Array.prototype.slice.call(document.querySelectorAll('.module-toggle'));
                    elems.forEach(function (html) {
                        switches.push(new Switchery(html, {size: 'default', color: '#00b19d'}));
                    });
                    $('.module-toggle').change(onModuleToggle);
                };
                var resetSwitches = function(){
                    switches.forEach(function(s){
                        s.setPosition(false);
                    });
                };
                var initDropZone = function () {
                    var dropzone1 = new Dropzone("#attachments-uploader", {
                        url: digitalMediaAPI.displayIssues.attachmentEndpoint(),
                        acceptedFiles: 'image/jpg,image/png'
                    });
                    dropzone1.on("sending", onSending);
                    dropzone1.on("success", onSuccess);
                    var dropzone2 = new Dropzone("#attachments-uploader-1", {
                        url: digitalMediaAPI.displayIssues.attachmentEndpoint(),
                        acceptedFiles: 'image/jpg,image/png'
                    });
                    dropzone2.on("sending", onSending);
                    dropzone2.on("success", onSuccess);
                };

                var loadFormData = function () {
                    digitalMediaAPI.manufacturers.getFormData(function (data) {
                        $scope.data = data;
                        initUI();
                    }, function () {

                    });
                };

                var init = function () {
                    loadFormData();
                    //initDropZone();
                };
                init();
                var dropzone = null;
                var switches = [];
            }
        };
    }]);