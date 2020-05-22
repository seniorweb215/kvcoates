API.factory("notificationsAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/notifications";

        extended.push = function(displayId, type, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/push", {display_id: displayId, type: type}, onSuccess, onError);
        };
        return extended;
    }]);