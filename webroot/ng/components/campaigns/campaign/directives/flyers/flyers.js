'use strict';
content.directive('flyersCampaign', ["$rootScope", "$state", "appService", "digitalMediaAPI", function ($rootScope, $state, appService, digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/campaigns/campaign/directives/flyers/view.html',
            scope: {
            },
            controller: function ($scope) {
            }
        };
    }]);