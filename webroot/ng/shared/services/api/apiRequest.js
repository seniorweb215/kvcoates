API.factory('apiRequest', ["$http", function ($http) {
    var instance = {};
    instance.ng = function (type, endpoint, data, successCallback, errorCallback) {
        var req = {
            method: type,
            url: server + "api" + endpoint,
            headers: {'Content-type': 'text/plain'},
            data: data
        };
        $http(req).then(function onSuccess(response) {
            if(response.data.success){
                successCallback(response.data.data);
            }else{
                errorCallback(response.data.data);
            }
        }, function onError(data, status, headers, config) {
            console.log("Server Error ", data, status, headers, config);
            errorCallback();
        });
    };
    
    instance.jq = function(type, endpoint, data, onSuccess, onError){
        $.ajax({
            type: type,
            url: server + "api" + endpoint,
            data: data,
            success: function(response){
                if(response.success){
                    onSuccess(response.data);
                }else{
                    onError(response.data);
                }
            },
            error : onError
        });
    };
    
    instance.getServerURL = function(){
        return server;
    };
    return instance;
}]);