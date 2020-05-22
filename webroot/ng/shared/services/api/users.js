API.factory("usersAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/users";
        instance.getAll = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
        };
        instance.login = function (username, password, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/login", {
                username: username,
                password: password
            }, onSuccess, onError);
        };
        instance.add = function(user, onSuccess, onError){
             apiRequest.jq("POST", endpoint + "/add", user, onSuccess, onError);
        };
        instance.update = function(user, onSuccess, onError){
             apiRequest.jq("POST", endpoint + "/update", user, onSuccess, onError);
        };
        instance.remove = function(user, onSuccess, onError){
             apiRequest.jq("POST", endpoint + "/remove", user, onSuccess, onError);
        };
        return instance;
    }]);