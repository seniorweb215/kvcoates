'use strict';
admin.controller("pagesController", ["$rootScope", "$scope", "$stateParams", '$sce', "digitalMediaAPI", function ($rootScope, $scope, $stateParams, $sce, digitalMediaAPI) {
        $rootScope.title = "Pages";
        $scope.content = {};
        var settings = {};


        $scope.save = function () {
            $("#save-button").toggleClass("disabled");
            $("#save-button").text("In Progress");
            setContent();
            digitalMediaAPI.organisations.saveSettings(settings, function (data) {
                $("#save-button").toggleClass("disabled");
                $("#save-button").text("Save");
            }, function () {
                $("#save-button").text("There has been an error!");
            });
        };
        
        var setContent = function(){
            var markup = $('#summernote').code();
            switch ($stateParams.id) {
                case "help":
                    settings.help = markup;
                    break;
                case "tos":
                    settings.terms = markup;
                    break;
                case "privacy":
                    settings.privacy = markup;
                    break;
            }
        };
        
        var getContent = function (data) {
            var content = {};
            switch ($stateParams.id) {
                case "help":
                    content.title = "Help";
                    content.text = $sce.trustAsHtml(data.help);
                    break;
                case "tos":
                    content.title = "Terms of Service";
                    content.text = $sce.trustAsHtml(data.terms);
                    break;
                case "privacy":
                    content.title = "Privacy Policy";
                    content.text = $sce.trustAsHtml(data.privacy);
                    break;
            }
            
            return content;
        };
        
        

        var loadSettings = function () {
            digitalMediaAPI.organisations.getSettings(function (data) {
                settings = data;
                $scope.content = getContent(data);
                setTimeout(initSummernote, 100);
            }, function () {

            });
        };

        var initSummernote = function () {
            $('#summernote').summernote({
                height: 500,
                onfocus: function (e) {
                    $('body').addClass('overlay-disabled');
                },
                onblur: function (e) {
                    $('body').removeClass('overlay-disabled');
                }
            });
        };
        var init = function () {
            loadSettings();
        };
        init();

    }]);