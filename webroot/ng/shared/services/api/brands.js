API.factory("brandsAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/brands";

		extended.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };

		extended.add = function(brand, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/add", brand, onSuccess, onError);
        };

		extended.remove = function(brand, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/remove", brand, onSuccess, onError);
        };

        extended.update = function(brand, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/update", brand, onSuccess, onError);
        };

		return extended;
    }]);