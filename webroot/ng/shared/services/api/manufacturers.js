API.factory("manufacturersAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/manufacturers";
        
        instance.all = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/all", {}, onSuccess, onError);
        };
       
        instance.getFormData = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/formdata", {}, onSuccess, onError);
        };
        instance.add = function(manufacturer, onSuccess, onError){
            manufacturer.tech_specs = JSON.stringify(manufacturer.tech_specs);
            manufacturer.network = JSON.stringify(manufacturer.network);
            apiRequest.jq("POST", endpoint + "/add", manufacturer, onSuccess, onError);
        };
        instance.remove = function(manufacturer, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/remove", manufacturer, onSuccess, onError);
        };
        instance.imageEndpoint = function () {
            return apiRequest.getServerURL() + "/api" + endpoint + "/image";
        };
        
        return instance;
    }]);