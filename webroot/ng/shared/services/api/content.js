API.factory("contentAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/contents";
        extended.feed = function (feedId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/feed/" + feedId, {}, onSuccess, onError);
        };
        extended.remove = function (content, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/remove", content, onSuccess, onError);
        };
        return extended;
    }]);