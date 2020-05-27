'use strict';
var digitalMedia = angular.module('digitalMedia', [
    'ui.router',
    'ngCookies',
    'digitalMedia.shared',
    'digitalMedia.notFound',
    'digitalMedia.reports',
    'digitalMedia.support',
    'digitalMedia.help',
    'digitalMedia.maintenance',
    'digitalMedia.terms',
    'digitalMedia.privacy',
    'digitalMedia.login',
    'digitalMedia.dashboard',
    'digitalMedia.admin',
    'digitalMedia.displays',
    'digitalMedia.content',
    'digitalMedia.media',
    'digitalMedia.stats',
    'digitalMedia.API'
]);

var shared = angular.module('digitalMedia.shared', []);
var content = angular.module('digitalMedia.content', []);
var support = angular.module('digitalMedia.support', []);
var API = angular.module('digitalMedia.API', []);
digitalMedia.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

digitalMedia.run(['$rootScope', '$location', 'appService', 'permissionsService',
    function ($rootScope, $location, appService, permissionsService) {
        appService.init();
        $rootScope.notification = notification;
        $rootScope.module = "/";
        if ($rootScope.user) {
            //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
            console.log("Signed User ", $rootScope.user);
        }


        $rootScope.isAllowedTo = function (target, action) {
            return permissionsService.isAllowedTo($rootScope.user, target, action);
        };
        $rootScope.isAdmin = function () {
            return ($rootScope.user.role_id === 1);
        };

        $rootScope.isCurrentlyBrowsing = function (module) {
            return $rootScope.module.includes(module);
        };
        $rootScope.isBrowsingAnAdminSection = function () {
            return ($rootScope.isCurrentlyBrowsing("general/") || $rootScope.isCurrentlyBrowsing("users") || $rootScope.isCurrentlyBrowsing("settings") || $rootScope.isCurrentlyBrowsing("documents") || $rootScope.isCurrentlyBrowsing("pages"));
        };
        $rootScope.isBrowsingCampaignSections = function () {
            return ($rootScope.isCurrentlyBrowsing("campaigns") || $rootScope.isCurrentlyBrowsing("default"));
        };

        $rootScope.$on('$locationChangeStart', function (event, next, current) {



            $rootScope.user = appService.getLoggedUser();
            $rootScope.module = $location.path();
            console.log("Module ", $rootScope.module);
            if (!$rootScope.user) {
                var path = '/';
                switch ($location.path()) {
                    case '/help':
                        path = $location.path();
                        break;
                    default:
                        path = '/';
                        break;
                }
                $location.path(path);
            } else {
                if (!$rootScope.isAdmin() && maintenance) {
                    $location.path('/maintenance');
                } else if(appService.isStatsViewer()){
                    $location.path('/campaigns');
                }else {
                    switch ($location.path()) {
                        case '/':
                            $location.path("/dashboard");
                            break;
                        case '/maintenance':
                            $location.path('/dashboard');
                            break;
                        default:
                            break;
                    }
                }
            }


        });
    }]);