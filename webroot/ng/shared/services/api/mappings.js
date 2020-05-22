API.factory("mappingsAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/mappings";
        instance.getAllByCampaign = function (cid, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/campaign/" +  cid, {}, onSuccess, onError);
        };
        instance.add = function(user, onSuccess, onError){
             apiRequest.jq("POST", endpoint + "/add", user, onSuccess, onError);
        };
        instance.remove = function(user, onSuccess, onError){
             apiRequest.jq("POST", endpoint + "/remove", user, onSuccess, onError);
        };
        return instance;
    }]);