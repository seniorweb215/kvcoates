API.factory("countriesAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/countries";
        extended.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint  + "/index", {}, onSuccess, onError);
        };
        extended.add = function(country, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/add", country, onSuccess, onError);
        };
        extended.remove = function(country, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/remove", country, onSuccess, onError);
        };
        extended.addMobileCarrier = function(mobileCarrier, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/addmobilecarrier", mobileCarrier, onSuccess, onError);
        };
        extended.updateMobileCarrier = function(mobileCarrier, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/updatemobilecarrier", mobileCarrier, onSuccess, onError);
        };
        extended.removeMobileCarrier = function(mobileCarrier, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/removemobilecarrier", mobileCarrier, onSuccess, onError);
        };
        extended.update = function(country, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/update", country, onSuccess, onError);
        };
        return extended;
    }]);