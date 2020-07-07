'use strict';
content.directive('lnlCampaign', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/campaign/directives/lift-and-learn/view.html',
            scope: {
                campaign: '='
            },
            controller: function ($scope) {
                $scope.totalSlots = 1;
                $scope.slots = new Array($scope.totalSlots);
                $scope.hasMotionDetection = false;

                var currentSlot = 0;
                var position = 0;
                var isUpdating = false;

                $scope.$watch("campaign", function(val){
                    if(val !== null){
                        detectModuleState();
                    }
                });

                $scope.hasContents = function (testPosition) {
                    var result = false;
                    if ($scope.campaign !== null) {
                        $scope.campaign.contents.forEach(function (content) {
                            if (content.position === testPosition) {
                                result = true;
                            }
                        });
                    }

                    return result;
                };

                $scope.getVideoInfo = function (targetPosition) {
                    var desiredContent = "";
                    if ($scope.campaign !== null) {
                        $scope.campaign.contents.forEach(function (content) {
                            if (content.position === targetPosition && content.media.media_type !== 2) {
                                desiredContent = content.media.filename + " (" + (parseInt(content.media.size) / 1000000).toFixed(2) + "MB)";
                            }
                        });
                    }

                    return desiredContent;
                };
                $scope.getImageInfo = function (targetPosition) {
                    var desiredContent = "";
                    if ($scope.campaign !== null) {
                        $scope.campaign.contents.forEach(function (content) {
                            if (content.position === targetPosition) {
                                desiredContent = content.media.thumb_name + " (" + (parseInt(content.media.thumb_size) / 1000000).toFixed(2) + "MB)";
                            }
                        });
                    }

                    return desiredContent;
                };

                var getContent = function (targetPosition) {
                    var desiredContent = null;
                    if ($scope.campaign !== null) {
                        $scope.campaign.contents.forEach(function (content) {
                            if (content.position === targetPosition) {
                                desiredContent = content;
                            }
                        });
                    }

                    return desiredContent;
                };

                var updateContentMedia = function (media) {
                    if ($scope.campaign !== null) {
                        for (var i = 0; i < $scope.campaign.contents.length; i++) {
                            if ($scope.campaign.contents[i].media.id === media.id) {
                                $scope.campaign.contents[i].media = media;
                                $scope.$apply();
                                break;
                            }
                        }
                    }
                };




                var pushContent = function (media) {
                    var data = {campaign_id: $scope.campaign.id, media_id: media.id, position: position};
                    digitalMediaAPI.campaigns.pushContent(data, function (content) {
                        $scope.campaign.contents.push(content);
                        $scope.$apply();
                    }, function () {

                    });
                };

                var onDrop = function (event) {
                    position = $(event.target).closest(".lift-and-learn-dropzone").data('order');
                    currentSlot = $(event.target).closest(".lift-and-learn-dropzone").data('index');
                    console.log("current slot", currentSlot);

                };

                var onFileAdded = function (file) {
                    if (isImage(file) && !hasContent()) {
                        alert("Please, add a video first!");
                    } else {
                        console.log("start upload");
                        setTimeout(function () {
                            dropzones[currentSlot].processQueue();
                        }, 100);
                    }
                };

                var hasContent = function () {
                    return (getContent(position) !== null);
                };

                var isImage = function (file) {
                    return (file.type.includes("image"));
                };

                var onSuccess = function (file, response) {
                    if (response.success && !isUpdating) {
                        pushContent(response.data);
                    } else {
                        isUpdating = false;
                        updateContentMedia(response.data);
                    }
                };
                var onSending = function (file, xhr, formData) {
                    var content = getContent(position);
                    if (content !== null) {
                        isUpdating = true;
                        formData.append("media_id", content.media.id);
                    } else {
                        formData.append("organisation_id", appService.getLoggedUserOrganisationId());
                    }
                    formData.append("filesize", file.size);
                };
                var onModuleToggle = function (e) {
                    digitalMediaAPI.campaigns.toggleMotionDetection($scope.campaign.id,  function(data){
                        $scope.hasMotionDetection = !$scope.hasMotionDetection;
                    }, function(){
                        
                    });
                };
                var initSwitch = function () {
                    var elems = Array.prototype.slice.call(document.querySelectorAll('.module-toggle'));
                    elems.forEach(function (html) {
                        new Switchery(html, {size: 'default', color: '#00b19d'});
                    });
                    $('.module-toggle').change(onModuleToggle);
                };
                var initDropZones = function () {
                    var elements = $(".lift-and-learn-dropzone");
                    var dropzone, d;
                    dropzones = [];
                    for (var i = 0; i < elements.length; i++) {
                        d = $(elements[i]);
                        dropzone = new Dropzone('#' + d.attr("id"), {
                            url: digitalMediaAPI.media.uploadEndpoint(),
                            autoProcessQueue: false,
                            acceptedFiles : 'image/jpeg,image/png,image/gif,video/mp4'
                        });
                        dropzone.on("addedfile", onFileAdded);
                        dropzone.on("drop", onDrop);
                        dropzone.on("sending", onSending);
                        dropzone.on("success", onSuccess);
                        dropzones.push(dropzone);
                    }
                };

                var detectModuleState = function () {
                    $scope.hasMotionDetection = $scope.campaign.has_facial_detection;
                    setTimeout(initSwitch, 100);
                };

                var init = function () {
                    setTimeout(initDropZones, 100);
                };
                init();
                var dropzones;
            }
        };
    }]);