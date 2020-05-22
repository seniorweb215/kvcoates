'use strict';
admin.controller("usersRightsController", ["$rootScope", "$scope", "digitalMediaAPI", function ($rootScope, $scope, digitalMediaAPI) {
        $rootScope.title = "User Rights";
        $scope.roles = [];
        var switches = [], editing = null, actions = [];


        $scope.isEditing = function (id) {
            return (editing !== null) ? editing.id === id : false;
        };
        $scope.edit = function (role) {
            if (role !== editing) {
                editing = role;
                updateSwitches();
            }

        };

        var onPermissionToggle = function (e) {
            var el = $(e.target);
            var id = el.data("id");
            var swi = switches.find(function (s) {
                return ($(s.element).data("id") === id);
            });
            var permission = editing.permissions.find(function (p) {
                return (p.system_action_id === id);
            });
            permission.granted = swi.isChecked();
            digitalMediaAPI.roles.updateRolePermission(permission, function (data) {}, function(){});
        };

        var updateSwitches = function () {
            actions.forEach(function (action) {
                var swi = switches.find(function (s) {
                    return ($(s.element).data("id") === action.id);
                });
                if (typeof swi !== 'undefined') {
                    var permission = editing.permissions.find(function (p) {
                        return (p.system_action_id === action.id);
                    });
                    setSwitchery(swi, permission.granted);
                }
            });
        };


        function setSwitchery(switchElement, checkedBool) {
            if ((checkedBool && !switchElement.isChecked()) || (!checkedBool && switchElement.isChecked())) {
                switchElement.setPosition(true);
                //switchElement.handleOnchange(true);
            }
        }

        var parseSystemActions = function () {
            $scope.displays = actions.filter(function (action) {
                return (action.target === 'displays');
            });
            $scope.locations = actions.filter(function (action) {
                return (action.target === 'locations');
            });
            $scope.campaigns = actions.filter(function (action) {
                return (action.target === 'campaigns');
            });
            $scope.reports = actions.filter(function (action) {
                return (action.target === 'reports');
            });
            $scope.support = actions.filter(function (action) {
                return (action.target === 'support');
            });

        };

        var initSwitches = function () {
            var elems = Array.prototype.slice.call(document.querySelectorAll('.permission-toggle'));
            elems.forEach(function (html) {
                switches.push(new Switchery(html, {size: 'default', color: '#00b19d'}));
            });
            $('.permission-toggle').change(onPermissionToggle);
        };

        var loadDashboard = function () {
            digitalMediaAPI.roles.getDashboard(function (data) {
                actions = data.system_actions;
                $scope.roles = data.roles;
                parseSystemActions();
                setTimeout(function () {
                    initSwitches();
                    $scope.edit(data.roles[0]);
                }, 100);
            }, function () {

            });
        };

        var init = function () {
            loadDashboard();
        };
        init();
    }]);