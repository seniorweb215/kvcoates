'use strict';
admin.directive('userTr', ["digitalMediaAPI", "appService", function (digitalMediaAPI, appService) {
        return {
            templateUrl: 'ng/components/admin/users/directives/user-tr/view.html',
            scope: {
                user: '=',
                removeUser: '&',
                edit: '&'
            },
            controller: function ($scope) {

                $scope.getOrganisation = function () {
                    return ($scope.user.organisation_user !== null) ? $scope.user.organisation_user.organisation.name : "No ORG!";
                };

                $scope.getCountry = function () {
                    return ($scope.user.country !== null) ? $scope.user.country.countryName : "No Country!";
                };

                $scope.getStatus = function () {
                    return ($scope.user.status) ? "Active" : "Inactive";
                };



                $scope.remove = function () {
                    if (confirm("Are you sure you want to remove this user?")) {
                        digitalMediaAPI.users.remove($scope.user, function (data) {
                            $scope.removeUser($scope.user);
                        }, function (data) {
                            console.log(data);
                        });
                    }
                };

            }
        };
    }]);