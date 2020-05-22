API.factory("displayIssuesAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/display-issues";
        
        instance.all = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/all", {}, onSuccess, onError);
        };
        
        instance.getAll = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/display/" + displayId, {}, onSuccess, onError);
        };
        instance.getFormData = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/formdata", {}, onSuccess, onError);
        };
        
        instance.getProfile = function(id, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/profile/" + id, {}, onSuccess, onError);
        };
        instance.add = function(issue, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/add", issue, onSuccess, onError);
        };
        
        instance.attachmentEndpoint = function () {
            return apiRequest.getServerURL() + "/api" + endpoint + "/attach";
        };
        
        instance.exportToXLS = function(){
            window.location = server + "api" + endpoint + "/export";
        };
        
        return instance;
    }]);