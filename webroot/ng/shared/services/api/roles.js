API.factory("rolesAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/roles";
        extended.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };
        extended.getSystemActions = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/systemactions", {}, onSuccess, onError);
        };
        
        extended.getDashboard = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/dashboard", {}, onSuccess, onError);
        };
        
        extended.updateRolePermission = function (permission, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/permission", permission, onSuccess, onError);
        };
        return extended;
    }]);