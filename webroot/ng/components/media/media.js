'use strict';
angular.module('digitalMedia.media', [])
        .controller("mediaViewController", ["$rootScope", "$scope", "appService", "digitalMediaAPI", function ($rootScope, $scope, appService, digitalMediaAPI) {
                $rootScope.title = "Media";
                $scope.media = [];

                var gallery = {};

                $scope.getURL = function (url) {
                    return appService.getURL(url);
                };

                var onSuccess = function (file, response) {
					console.log("------file----------");
					console.log(file);
					console.log("------response----------");
					console.log(response);
					console.log("------responsedata----------");
					console.log(response.data);
                    if (response.success) {
                        $scope.media.push(response.data);
                        $scope.$apply();
                        resetGallery();

                    }

                };
                var onSending = function (file, xhr, formData) {
                    formData.append("organisation_id", appService.getLoggedUserOrganisationId());
                };

                var resetGallery = function () {
                    appService.resetGallery(gallery);
                    initGallery();
                };

                var initGallery = function () {
                    appService.initGallery(".gallery", ".gallery-item", function(_gallery){
                        console.log(gallery);
                        gallery = _gallery;
                    });
                };

                var load = function () {
                    digitalMediaAPI.media.me(appService.getLoggedUserOrganisationId(), function (data) {
                        console.log("Org Media: ", data);
                        $scope.media = data;
                        initGallery();
                    }, function () {
                        console.log("error Loading Org Media");
                    });
                };

                var init = function () {
                    dropzone = new Dropzone("#media-uploader", {
                        url: digitalMediaAPI.media.uploadEndpoint()
                    });
                    dropzone.on("sending", onSending);
                    dropzone.on("success", onSuccess);
                    load();
                };

                var dropzone = null;
                init();
            }]);