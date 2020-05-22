API.factory("organisationsAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/organisations";
        extended.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };
        extended.getByCountryId = function (cid, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/bycountry/" +  cid, {}, onSuccess, onError);
        };
        
        
        extended.getSettings = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/settings", {}, onSuccess, onError);
        };
        extended.saveSettings = function (settings, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/settings", settings, onSuccess, onError);
        };
        extended.getAllCountries = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/countries", {}, onSuccess, onError);
        };
        extended.add = function (organisation, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/add", organisation, onSuccess, onError);
        };
        extended.remove = function (organisation, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/remove", organisation, onSuccess, onError);
        };
        extended.update = function (organisation, onSuccess, onError) {
            console.log(organisation);
            apiRequest.jq("POST", endpoint + "/update", organisation, onSuccess, onError);
        };
        extended.toggleCampaignType = function (ctid, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/togglecampaigntype/" + ctid, {}, onSuccess, onError);
        };
        
        extended.pinEndpoint = function () {
            return apiRequest.getServerURL() + "/api" + endpoint + "/pin";
        };
        extended.logoEndpoint = function () {
            return apiRequest.getServerURL() + "/api" + endpoint + "/logo";
        };

        return extended;
    }]);