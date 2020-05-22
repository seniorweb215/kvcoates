'use strict';
content.controller("campaignsController", ["$rootScope", "$scope", "$stateParams", "appService", "digitalMediaAPI", function ($rootScope, $scope, $stateParams, appService, digitalMediaAPI) {
        $rootScope.title = "Campaigns Manager";
        $scope.campaigns = [];
        

        $scope.addCampaign = function (campaign) {
            digitalMediaAPI.campaigns.add(campaign, function (data) {
                console.log("New Campaign", data);
                loadCampaigns();
            }, function () {
                console.log("Error adding a new feed");
            });
        };
        
        $scope.updateCampaign = function (campaign) {
            digitalMediaAPI.campaigns.update(campaign, function (data) {
                loadCampaigns();
            }, function () {
            });
        };


        $scope.editCampaign = function (campaign) {
            $scope.$broadcast("editCampaign", {campaign: campaign});
        };
        
        
        $scope.editCampaignForDuplication = function (campaign) {
            $scope.$broadcast("duplicateCampaign", {campaign: campaign});
        };
        
        $scope.duplicateCampaign = function (campaign) {
            digitalMediaAPI.campaigns.duplicate(campaign, function (data) {
                loadCampaigns();
            }, function () {
            });
        };
        
        $scope.stopCampaign = function (campaign) {
            digitalMediaAPI.campaigns.stop(campaign.id, function (data) {
                loadCampaigns();
            }, function () {
            });
        };
        
        $scope.previewCampaign = function (campaign) {
            $scope.$broadcast("previewCampaign", {campaign: campaign});
        };
        
        $scope.downloadCampaignReport = function (campaign) {
            digitalMediaAPI.campaigns.downloadReport(campaign.id);
        };
        
        $scope.downloadCampaign = function (campaign) {
            if(campaign.type_id === 2 && campaign.status === 0){
                alert("This campaign is not available for download yet, publish it and try again.");
            }else{
                digitalMediaAPI.campaigns.download(campaign.id);
            }
        };

        $scope.deleteCampaign = function (campaign) {
            if (confirm("Are you sure you want to remove this campaign?")) {
                digitalMediaAPI.campaigns.remove(campaign, function (data) {
                    var index = $scope.campaigns.indexOf(campaign);
                    $scope.campaigns.splice(index, 1);
                    $scope.$apply();
                }, function (data) {
                    console.log(data);
                });
            }
        };
        
        $scope.editCampaignMappings = function(campaign){
            $scope.selectedCampaign = campaign;
        };
        
        $scope.exportCampaigns = function () {
            digitalMediaAPI.campaigns.exportToXLS();
            
        };

        $scope.isListingDefaultCampaigns = function(){
            return ($stateParams.id === "default");
        };

        var loadCampaigns = function () {
            var defaultCampaigns = ($scope.isListingDefaultCampaigns()) ? 1 : 0;
            digitalMediaAPI.campaigns.all(defaultCampaigns, function (data) {
                $scope.campaigns = data;
                setTimeout(function(){
                    $('[data-toggle="tooltip"]').tooltip();
                }, 100);
            }, function (data) {

            });
        };

        var init = function () {
            loadCampaigns();
        };
        init();
    }]);