API.factory("blacklistedClientsAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/blacklisted-clients";

        extended.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };
        extended.add = function (brand, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/add", brand, onSuccess, onError);
        };
        extended.remove = function (brand, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/remove", brand, onSuccess, onError);
        };
        return extended;
    }]);