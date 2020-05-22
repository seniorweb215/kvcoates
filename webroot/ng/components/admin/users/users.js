'use strict';
admin.controller("usersController", ["$rootScope", "$scope", "appService", "digitalMediaAPI", function ($rootScope, $scope, appService, digitalMediaAPI) {
        $rootScope.title = "Users";
        $scope.newUser = {};
        $scope.isEditing = false;
        $scope.users = [];
        $scope.organisations = [];
        $scope.selectedOrg = {};
        $scope.statuses = [{value: true, name : "Active"}, {value: false, name: "Inactive"}];


        $scope.openNewUserModal = function(){
            clearForm();
            $("#modalFillIn").modal("show");
        };

        $scope.addNewUser = function () {
            $scope.newUser.role_id = parseInt($scope.newUser.role_id);
            $scope.newUser.organisation_id = appService.getLoggedUserOrganisationId();
            digitalMediaAPI.users.add($scope.newUser, function (data) {
                $("#modalFillIn").modal("hide");
                clearForm();
                loadUsers();
            }, function (data) {
                
            });
        };

        $scope.removeUser = function (user) {
            var index = $scope.users.indexOf(user);
            $scope.users.splice(index, 1);
            $scope.$apply();
        };
        
        $scope.editUser = function (user) {
            $scope.newUser = jQuery.extend(true, {}, user);
            $scope.isEditing = true;
            $('#status-select').select2("val", user.status);
            $('#country-select').select2("val", user.country_id);
            $('#role-select').select2("val", user.role_id);
            $("#modalFillIn").modal("show");
        };
        
        $scope.updateUser = function(){
            $scope.newUser.role_id = parseInt($scope.newUser.role_id);
            $scope.newUser.organisation_id = appService.getLoggedUserOrganisationId();
            delete $scope.newUser.role;
            delete $scope.newUser.country;
            digitalMediaAPI.users.update($scope.newUser, function (data) {
                $("#modalFillIn").modal("hide");
                $scope.isEditing = false;
                clearForm();
                loadUsers();
            }, function (data) {

            });
        };
        
        var clearForm = function(){
            $scope.newUser = {};
            $('#status-select').select2("val", "");
            $('#country-select').select2("val", "");
            $('#role-select').select2("val", "");
        };

        var loadOrganisations = function () {
            digitalMediaAPI.organisations.getAll(function (data) {
                $scope.organisations = data;
                $('#organisation-select').select2();
                $('#organisation-select').on('change', function (evt) {
                    $scope.newUser.organisation_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var loadRoles = function () {
            digitalMediaAPI.roles.getAll(function (data) {
                $scope.roles = data;
                $('#role-select').select2();
                $('#role-select').on('change', function (evt) {
                    $scope.newUser.role_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var loadCountries = function () {
            digitalMediaAPI.locations.getAllCountries(function (data) {
                $scope.countries = data;
                $('#country-select').select2();
                $('#country-select').on('change', function (evt) {
                    $scope.newUser.country_id = parseInt(evt.val);
                });
            }, function (data) {

            });
        };

        var loadUsers = function () {
            digitalMediaAPI.users.getAll(function (data) {
                $scope.users = data;
            }, function (data) {
            });
        };

        var init = function () {
            loadUsers();
            //loadOrganisations();
            loadRoles();
            loadCountries();
        };
        init();
    }]);