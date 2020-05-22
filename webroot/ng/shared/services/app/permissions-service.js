shared.factory("permissionsService", ["digitalMediaAPI", function (digitalMediaAPI) {
        var instance = {};
        var getSystemActionId = function(target, action){
            var systemAction = {};
            var id = 0;
            for(var i = 0; i < systemActions.length; i++){
                systemAction = systemActions[i];
                if(systemAction.target === target && systemAction.action === action){
                    id = systemAction.id;
                    break;
                }
            }
            return id;
        };
        
        instance.isAllowedTo = function(user, target, action){
            var id = getSystemActionId(target, action);
            var permissions = user.role.permissions;
            var response = false;
            for(var i = 0; i < permissions.length; i++){
                if(permissions[i].system_action.id === id){
                    response = permissions[i].granted;
                }
            }
            return response;
        };
        return instance;
    }]);