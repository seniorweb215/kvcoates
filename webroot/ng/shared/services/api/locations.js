API.factory("locationsAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/locations";
        extended.getAll = function (uid, oid, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/index", {uid: uid, oid : oid}, onSuccess, onError);
        };
        extended.dashboard = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/dashboard", {}, onSuccess, onError);
        };
        extended.profile = function(id, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/profile/" +  id, {}, onSuccess, onError);
        };
        extended.getAllCountries = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/countries", {}, onSuccess, onError);
        };
        extended.getAllOwners = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/owners", {}, onSuccess, onError);
        };
        extended.getAllSizes = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/sizes", {}, onSuccess, onError);
        };
        extended.attachmentEndpoint = function () {
            return apiRequest.getServerURL() + "api" + endpoint + "/attachUpload";
        };
        extended.getByOrganisationsAndCountry = function (orgs, cid, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/byorganisations/" + orgs + "/" + cid, {}, onSuccess, onError);
        };
        extended.getByOrganisationId = function (orgId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/findbyorganisation/" + orgId, {}, onSuccess, onError);
        };
        extended.getByOrgAndBrand = function (orgId, brandId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/byorgandbrand/" + orgId + "/" + brandId, {}, onSuccess, onError);
        };
        extended.add = function(location, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/add", location, onSuccess, onError);
        };
        extended.remove = function(location, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/remove", location, onSuccess, onError);
        };
        extended.update = function(location, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/update", location, onSuccess, onError);
        };
        
        extended.exportToXLS = function(){
            window.location = server + "api" + endpoint + "/export";
        };

        return extended;
    }]);