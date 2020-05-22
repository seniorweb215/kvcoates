'use strict';
content.controller("campaignController", ["$rootScope", "$scope", "$stateParams", "appService", "digitalMediaAPI", function ($rootScope, $scope, $stateParams, appService, digitalMediaAPI) {
        $rootScope.title = "Campaign";
        $scope.campaign = null;
        $scope.preflight = {};
        $scope.overrides = [];






        var campaignMegaBytes, campaignDisplays, campaignLocations, campaignCountries, campaignMobileCarriers, campaignCosts;
        var countries;




        $scope.publish = function () {
            $(".publish-button").toggleClass("disabled");
            $(".publish-button").text("Publishing ...");
            digitalMediaAPI.campaigns.publish($scope.campaign.id, {resolution: 0}, function (data) {
                $scope.campaign.status = 1;
                $(".publish-button").text("Published");
                $scope.$apply();
            }, function (data) {
                $scope.preflight = data;
                $scope.canOverride = canOverride();
                $(".publish-button").toggleClass("disabled");
                $scope.$apply();
            });
        };


        var canOverride = function () {
            if ($scope.preflight.length > 0) {
                var result = false;
                $scope.preflight.forEach(function (display) {
                    result = (display.preflight.preflight.overlaps.length === 0 && !display.preflight.preflight.resolution) ? true : false;
                });
                return result;
            } else {
                return false;
            }
        };

        $scope.publishWithOverrides = function () {
            digitalMediaAPI.campaigns.publish($scope.campaign.id, {resolution: 1}, function (data) {
                $scope.campaign.status = 1;
                $scope.$apply();
            }, function (data) {
            });
        };


        $scope.getCampaignTypeIcon = function () {
            var css = '';
            if ($scope.campaign !== null) {
                if ($scope.campaign.type_id === 1) {
                    css = 'fa-file-video-o';
                } else if ($scope.campaign.type_id === 2) {
                    css = 'fa-gamepad';
                } else if ($scope.campaign.type_id === 3) {
                    css = 'fa-hand-pointer-o';
                } else if ($scope.campaign.type_id === 4) {
                    css = 'fa-simplybuilt';
                }
            }

            return css;
        };


        $scope.isVideoCampaign = function () {
            return isCampaignType(1);
        };
        $scope.isLiftNLearnCampaign = function () {
            return isCampaignType(2);
        };
        $scope.isTouchCampaign = function () {
            return isCampaignType(3);
        };
        $scope.isVRCampaign = function () {
            return isCampaignType(4);
        };
        $scope.isFlyersCampaign = function () {
            return isCampaignType(5);
        };



        var isCampaignType = function (type) {
            return ($scope.campaign !== null && $scope.campaign.type_id === type);
        };

        $scope.getCampaignTypeName = function () {
            var name = '';
            if ($scope.campaign !== null) {
                if ($scope.campaign.type_id === 1) {
                    name = 'Videos';
                } else if ($scope.campaign.type_id === 2) {
                    name = 'Lift N Learn';
                } else if ($scope.campaign.type_id === 3) {
                    name = 'Touch';
                } else if ($scope.campaign.type_id === 4) {
                    name = 'VR';
                }
            }

            return name;
        };

        $scope.getStatus = function () {
            var status = '';
            if ($scope.campaign !== null) {
                switch ($scope.campaign.status) {
                    case 0:
                        status = "Unpublished";
                        break;
                    case 1:
                        status = "Published";
                        break;
                    case 2:
                        status = "Expired";
                        break;
                }
            }
            return status;
        };

        $scope.getDisplays = function () {
            return campaignDisplays.join(", ");
        };

        $scope.getLocations = function () {
            return campaignLocations.join(", ");
        };
        $scope.getCountries = function () {
            return campaignCountries.join(", ");
        };

        $scope.getCarriers = function () {
            return campaignMobileCarriers.join(", ");
        };

        $scope.getCampaignCosts = function () {
            return campaignCosts.join(", ");
        };

        

        $scope.getCampaignSize = function () {
            return campaignMegaBytes;
        };

        

        var findCampaignSize = function () {
            $scope.campaign.contents.forEach(function (node) {
                campaignMegaBytes += parseInt(node.media.size);
            });
            campaignMegaBytes = (campaignMegaBytes / 1000000).toFixed(2);
        };

        var findCampaignDisplays = function () {
            $scope.campaign.campaign_displays.forEach(function (cdisplay) {
                campaignDisplays.push(cdisplay.display.name);
            });
        };

        var findCampaignLocations = function () {
            $scope.campaign.campaign_locations.forEach(function (clocation) {
                campaignLocations.push(clocation.location.name);
            });
        };

        var findCampaignCountries = function () {
            var country;
            $scope.campaign.campaign_locations.forEach(function (clocation) {
                country = clocation.location.country;
                if (campaignCountries.indexOf(country.countryName) === -1) {
                    campaignCountries.push(country.countryName);
                    countries.push(country);
                }
            });
        };

        var findCampaignMobileCarriers = function () {
            countries.forEach(function (country) {
                country.mobile_carriers.forEach(function (carrier) {
                    campaignMobileCarriers.push(carrier.name + " (£ " + carrier.british_pound_per_mb + " / MB)");
                });
            });
        };

        var findCampaignCosts = function () {
            countries.forEach(function (country) {
                country.mobile_carriers.forEach(function (carrier) {
                    //if (carrier.set_as_default) {
                        campaignCosts.push("£ " + computeTotalCost(carrier.british_pound_per_mb) + " (" + carrier.name + ")");
                    //}
                });
            });
        };
        
        var computeTotalCost = function (british_pound_per_mb) {
            var cost = 0;
            var mb = 0;
            $scope.campaign.contents.forEach(function (node) {
                mb = parseInt(node.media.size) / 1000000;
                cost += mb * british_pound_per_mb;
            });
            return cost.toFixed(2);
        };








        var init = function () {
            campaignMegaBytes = 0;
            campaignDisplays = [];
            campaignLocations = [];
            campaignCountries = [];
            campaignMobileCarriers = [];
            campaignCosts = [];
            countries = [];
            digitalMediaAPI.campaigns.profile($stateParams.id, function (data) {
                $scope.campaign = data;
                findCampaignSize();
                findCampaignDisplays();
                findCampaignLocations();
                findCampaignCountries();
                findCampaignMobileCarriers();
                findCampaignCosts();
            }, function (data) {
            });

        };
        init();
        var dropzone = null;
    }]);