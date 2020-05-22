'use strict';
var displays = angular.module('digitalMedia.displays', []);
displays.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
                .state('display', {
                    url: '/displays/:id',
                    templateUrl: 'ng/components/displays/display/view.html',
                    controller: "displayController"
                })
                .state('deployliftnlearn', {
                    url: "/displays/:id/liftnlearn",
                    templateUrl: 'ng/components/displays/liftnlearn/view.html',
                    controller: "liftnlearnDeploymentController"
                })
                .state('deploytouch', {
                    url: '/displays/:id/touch',
                    templateUrl: 'ng/components/displays/touch/view.html',
                    controller: "touchDeploymentController"
                })
                .state('deploycampaigns', {
                    url: '/displays/:id/campaigns',
                    templateUrl: 'ng/components/displays/campaigns/view.html',
                    controller: "campaignsDeploymentController"
                });
    }]);