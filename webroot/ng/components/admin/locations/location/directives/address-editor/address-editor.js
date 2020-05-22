'use strict';
admin.directive('addressEditor', ['mapService', function (mapService) {
        return {
            templateUrl: 'ng/components/admin/locations/location/directives/address-editor/view.html',
            scope: {
                location: '=',
                saveFn: '&',
                cancelFn: '&'
            },
            controller: function ($scope) {

                $scope.$watch("location", function (location) {
                    if (location !== null) {
                        initAutoComplete();
                    }
                });
                $scope.getPlaceholderText = function () {
                    return "Where is " + getLocationName() + " located?";
                };
                var getLocationName = function () {
                    return ($scope.location !== null) ? $scope.location.name : "that";
                };

                var initAutoComplete = function () {
                    mapService.initAutoComplete('autocomplete-input', $scope.location.latitude, $scope.location.longitude, function (data) {
                        place = data;
                        $scope.location.address = place.formatted_address;
                        $scope.location.latitude = place.geometry.location.lat();
                        $scope.location.longitude = place.geometry.location.lng();
                    });
                };
                var init = function () {
                    mapService.init();

                };
                var place;
                init();
            }
        };
    }]);