'use strict';

digitalMedia.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/404');
        $urlRouterProvider.when('', '/');

        $stateProvider
                .state('login', {
                    url: '/',
                    templateUrl: 'ng/components/login/view.html',
                    controller: "loginController"
                })
                .state('dashboard', {
                    url: '/dashboard',
                    templateUrl: 'ng/components/dashboard/view.html',
                    controller: "dashboardViewController"
                })
                .state('displays', {
                    url: '/displays',
                    templateUrl: 'ng/components/displays/dashboard/view.html',
                    controller: "displaysDashboardController"
                })
                .state('campaigns', {
                    url: '/campaigns/:id',
                    templateUrl: 'ng/components/campaigns/view.html',
                    controller: "campaignsController"
                })
                .state('campaign', {
                    url: "/campaign/:id",
                    templateUrl: 'ng/components/campaigns/campaign/view.html',
                    controller: "campaignController"
                })
                .state('campaignstats', {
                    url: "/campaign/:id/stats",
                    templateUrl: 'ng/components/campaigns/stats/view.html',
                    controller: "campaignStatsController"
                })
                .state('media', {
                    url: '/media',
                    templateUrl: 'ng/components/media/view.html',
                    controller: "mediaViewController"
                })
                .state('stats', {
                    url: '/stats',
                    templateUrl: 'ng/components/stats/view.html',
                    controller: "statsController"
                })
                .state('help', {
                    url: '/help',
                    templateUrl: 'ng/components/help/view.html',
                    controller: "helpController"
                })
                .state('terms', {
                    url: '/terms',
                    templateUrl: 'ng/components/terms/view.html',
                    controller: "termsController"
                })
                .state('privacy', {
                    url: '/privacy',
                    templateUrl: 'ng/components/privacy/view.html',
                    controller: "privacyController"
                })
                .state('maintenance', {
                    url: '/maintenance',
                    templateUrl: 'ng/components/maintenance/view.html',
                    controller: "maintenanceController"
                })
                .state('reports', {
                    url: '/reports',
                    templateUrl: 'ng/components/reports/view.html',
                    controller: "reportsController"
                })
                .state('support', {
                    url: '/support',
                    templateUrl: 'ng/components/support/view.html',
                    controller: "supportController"
                })
                .state('ticket', {
                    url: '/support/ticket/:id',
                    templateUrl: 'ng/components/support/ticket/view.html',
                    controller: "ticketController"
                })
                .state('404', {
                    url: '/404',
                    templateUrl: 'ng/components/not-found/view.html',
                    controller: "notFoundViewController"
                });
    }]);