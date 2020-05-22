API.factory("zonesAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/timezones";
        instance.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };
        instance.getTimezones = function(zoneId, onSuccess, onError){
             apiRequest.jq("GET", endpoint + "/timezones/" + zoneId, {}, onSuccess, onError);
        };
        return instance;
    }]);