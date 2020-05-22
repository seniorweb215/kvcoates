API.factory('apiRequest', ["$http", function ($http) {
        var instance = {};
        instance.ng = function (type, endpoint, data, onSuccess, onError) {
            var req = {
                method: type,
                url: server + "api" + endpoint,
                headers: {'Content-type': 'text/plain'},
                data: data
            };
            $http(req).success(function (response) {
                if(response.success){
                     onSuccess(response.data);
                }else{
                    onError(response.data);
                }
            }).error(function (data, status, headers, config) {
                console.log("Server Error ", data, status, headers, config);
                onError();
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


