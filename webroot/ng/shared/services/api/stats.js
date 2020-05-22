API.factory("statsAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/statistics";
        instance.dashboard = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };
        instance.support = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/support", {}, onSuccess, onError);
        };
        instance.campaign = function (cid, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/campaign/" + cid, {}, onSuccess, onError);
        };
        return instance;
    }]);