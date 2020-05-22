API.factory("mediaAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/media";
        extended.uploadEndpoint = function () {
            return apiRequest.getServerURL() + "api" + endpoint + "/upload";
        };
        extended.me = function (orgId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/me/" + orgId, {}, onSuccess, onError);
        };
        extended.remove = function (content, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/remove", content, onSuccess, onError);
        };

        return extended;
    }]);