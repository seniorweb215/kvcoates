'use strict';
content.directive('campaignCreator', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/directives/creator/view.html',
            scope: {
                createFn: '&',
                updateFn: '&'
            },
            controller: function ($scope) {
                $scope.campaign = {};
                $scope.brands = [];
                $scope.campaign_types = [];
                $scope.countries = [];
                $scope.locations = [];
                $scope.totalDisplays = 0;
                var cid = 0, oid = 0;
                var brandid = 0, orientation = '';
                var locations = [];
                var isEditing = false;

                $scope.getModalTitle = function () {
                    return (isEditing) ? "Edit your" : "Create a new";
                };

                $scope.$on("editCampaign", function (event, args) {
                    isEditing = true;
                    $scope.campaign = args.campaign;
                    getCampaignSetup();
                    getTargetedDisplays();
                    setTimeout(showCampaignSetup, 200);
                });

                var getCampaignSetup = function () {
                    locations = [];
                    cid = $scope.campaign.country_id;
                    oid = $scope.campaign.organisation_id;
                    brandid = $scope.campaign.brand_id;
                    orientation = $scope.campaign.orientation;
                    
                    $scope.campaign.campaign_locations.forEach(function (clocation) {
                        locations.push(clocation.location_id);
                    });
                    $scope.campaign.locations = locations;

                };

                var showCampaignSetup = function () {
                    $('#resolution-select').select2("val", $scope.campaign.orientation);
                    $('#country-select').select2("val", $scope.campaign.country_id);
                    $('#brand-select').select2("val", $scope.campaign.brand_id);
                    $('#organisation-select').select2("val", $scope.campaign.organisation_id);
                    $('#type-select').select2("val", $scope.campaign.type_id);
                    $('#daterangepicker').val(moment($scope.campaign.start).format('YYYY-MM-DD HH:mm:ss') + " - " + moment($scope.campaign.end).format('YYYY-MM-DD HH:mm:ss'));

                    $("#campaign-creator").modal("show");
                };

                $scope.go = function () {
                    //$scope.campaign.organisation_id = appService.getLoggedUserOrganisationId();
                    $scope.campaign.status = 0;
                    $scope.campaign.locations = getSelectedLocations();
                    $scope.campaign.set_as_default = isSetAsDefault();
                    $scope.campaign.tod = isTimeOfTheDay();
                    $scope.campaign.has_facial_analytics = hasFacialAnalytics();
                    if (isEditing) {
                        $scope.updateFn({campaign: $scope.campaign});
                    } else {
                        $scope.createFn({campaign: $scope.campaign});
                    }
                    $("#campaign-creator").modal("hide");
                    $scope.campaign = {};
                    resetSelectors();
                    isEditing = false;
                };

                var getSelectedLocations = function () {
                    if ($scope.campaign.locations === "0" || $scope.campaign.locations.indexOf("0") !== -1) {
                        var ids = [];
                        $scope.locations.forEach(function (location) {
                            if (location.id !== 0) {
                                ids.push(location.id);
                            }
                        });
                        return ids.join(",");
                    } else {
                        return $scope.campaign.locations.join(",");
                    }
                };

                var isSetAsDefault = function () {
                    var el = $("input[name=defaultyn]:checked");
                    return (el.attr('id') === 'defaultyes') ? 1 : 0;
                };
                var isTimeOfTheDay = function () {
                    var el = $("input[name=tod-yn]:checked");
                    return (el.attr('id') === 'tod-yes') ? 1 : 0;
                };
                var hasFacialAnalytics = function () {
                    var el = $("input[name=fa-yn]:checked");
                    return (el.attr('id') === 'fa-yes') ? 1 : 0;
                };
                var loadCampaignData = function () {
                    digitalMediaAPI.campaigns.data(function (data) {
                        console.log(data);
                        $scope.brands = data.brands;
                        $scope.campaign_types = data.campaign_types;
                        $scope.countries = data.countries;
                        $scope.organisations = data.organisations;
                        $scope.resolutions = data.resolutions;
                        $scope.orientations = data.orientations;
                        $scope.settings = data.settings;
                        $scope.totalDisplays = data.displays;
                        initSelectors();
                    }, function (data) {

                    });
                };
                var resetSelectors = function () {
                    $('#resolution-select').select2("val", "");
                    $('#country-select').select2("val", "");
                    $('#brand-select').select2("val", "");
                    $('#organisation-select').select2("val", "");
                    $('#type-select').select2("val", "");
                    $('#location-select').select2("val", "");
                    $('#daterangepicker').val('');
                };
                var initSelectors = function () {
                    $('#resolution-select').select2();
                    $('#country-select').select2();
                    $('#brand-select').select2();
                    $('#organisation-select').select2();
                    $('#type-select').select2();
                    $('#location-select').select2();
                    $('#type-select').on('change', function (evt) {
                        $scope.campaign.type_id = parseInt(evt.val);
                    });
                    $('#country-select').on('change', function (evt) {
                        cid = parseInt(evt.val);
                        $scope.campaign.country_id = cid;
                        getTargetedDisplays();
                        getRetailersByCountry();
                    });
                    $('#organisation-select').on('change', function (evt) {
                        oid = parseInt(evt.val);
                        $scope.campaign.organisation_id = oid;
                        getTargetedDisplays();
                    });
                    $('#brand-select').on('change', function (evt) {
                        brandid = parseInt(evt.val);
                        $scope.campaign.brand_id = brandid;
                        getTargetedDisplays();
                    });

                    $('#resolution-select').on('change', function (evt) {
                        orientation = evt.val;
                        $scope.campaign.orientation = orientation;
                        getTargetedDisplays();
                    });


                    $('#location-select').on('change', function (evt) {
                        $scope.campaign.locations = evt.val;
                        countAvailableDisplays();
                    });
                };

                var getRetailersByCountry = function () {
                    digitalMediaAPI.organisations.getByCountryId(cid, function (data) {
                        $scope.organisations = data;
                        $('#organisation-select').select2();
                    }, function (data) {
                        //pop spme shit!!
                    });
                };
                var getTargetedDisplays = function () {
                    var criteria = {country: cid, organisation: oid, brand: brandid, orientation: orientation};
                    digitalMediaAPI.campaigns.getTargetedDisplays(criteria, function (data) {
                        $scope.totalDisplays = data.displays;
                        $scope.locations = data.locations;
                        $scope.locations.unshift({id: 0, name: "* All", deployments: []});
                        $scope.$apply();

                        //$('#location-select').select2();
                        $('#location-select').select2("val", locations);
                    }, function () {

                    });
                };

                var getOrgs = function (oid) {
                    if (oid === 0) {
                        var oids = [];
                        $scope.organisations.forEach(function (org) {
                            oids.push(org.id);
                        });
                        return oids.join(",");
                    } else {
                        return oid;
                    }
                };
                var countAvailableDisplays = function () {
                    var display;
                    $scope.totalDisplays = 0;
                    $scope.locations.forEach(function (location) {
                        if ($scope.campaign.locations.length === 0 || $scope.campaign.locations === "0" || $scope.campaign.locations[0] === "0") {
                            location.deployments.forEach(function (deployment) {
                                display = deployment.display;
                                if (brandid !== 0 && orientation !== 0) {
                                    if (display.orientation === orientation && display.brand_id === brandid) {
                                        $scope.totalDisplays++;
                                    }
                                } else {
                                    $scope.totalDisplays++;
                                }
                            });
                        } else {
                            if ($scope.campaign.locations.indexOf(location.id.toString()) !== -1) {
                                location.deployments.forEach(function (deployment) {
                                    display = deployment.display;
                                    if (brandid !== 0 && orientation !== 0) {
                                        if (display.orientation === orientation && display.brand_id === brandid) {
                                            $scope.totalDisplays++;
                                        }
                                    } else {
                                        $scope.totalDisplays++;
                                    }
                                });
                            }
                        }
                    });
                    $scope.$apply();
                };

                $scope.noDates = function () {
                    return (typeof $scope.campaign.start === 'undefined');
                };

                var initDateRangePicker = function () {
                    $('#daterangepicker').daterangepicker({
                        timePicker: true,
                        timePickerIncrement: 1,
                        format: 'DD/MM/YYYY h:mm A'
                    }, function (start, end, label) {
                        $scope.campaign.start = start.format('YYYY-MM-DD HH:mm:ss');
                        $scope.campaign.end = end.format('YYYY-MM-DD HH:mm:ss');
                        $scope.$apply();
                    });
                };
                var init = function () {
                    loadCampaignData();
                    initDateRangePicker();
                    getTargetedDisplays();
                };
                init();
            }
        };
    }]);