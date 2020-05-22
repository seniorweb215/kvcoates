'use strict';
content.directive('vrCampaign', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/campaign/directives/vr/view.html',
            scope: {
                campaign: '='
            },
            controller: function ($scope) {



                $scope.deleteMedia = function (content) {
                    if (confirm("Are you sure you want to remove this video file?")) {
                        digitalMediaAPI.media.remove(content.media, function (data) {
                            digitalMediaAPI.campaigns.popContent(content, function (data) {
                                var index = $scope.campaign.contents.indexOf(content);
                                $scope.campaign.contents.splice(index, 1);
                                $scope.$apply();
                            }, function (data) {
                                console.log(data);
                            });
                        }, function (data) {
                            console.log(data);
                        });
                    }
                };

                var pushContent = function (media) {
                    var data = {campaign_id: $scope.campaign.id, media_id: media.id, position: 0};
                    digitalMediaAPI.campaigns.pushContent(data, function (content) {
                        $scope.campaign.contents.push(content);
                        $scope.$apply();
                    }, function () {

                    });
                };
                var onSuccess = function (file, response) {
                    if (response.success) {
                        pushContent(response.data);
                    }
                };
                var onSending = function (file, xhr, formData) {
                    formData.append("organisation_id", appService.getLoggedUserOrganisationId());
                    formData.append("filesize", file.size);

                };
                var initDropZone = function () {
                    dropzone = new Dropzone("#videos-uploader", {
                        url: digitalMediaAPI.media.uploadEndpoint(),
                        acceptedFiles : 'video/mp4'
                    });
                    dropzone.on("sending", onSending);
                    dropzone.on("success", onSuccess);
                };

                var init = function () {
                    setTimeout(initDropZone, 100);
                };

                var dropzone = null;
                init();
            }
        };
    }]);