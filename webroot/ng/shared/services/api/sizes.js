API.factory("sizesAPI", ['apiRequest', function (apiRequest) {
    var extended = {};
    var endpoint = "/sizes";

    extended.getAll = function (onSuccess, onError) {
        apiRequest.ng("GET", endpoint + "/index", {}, onSuccess, onError);
    };

    extended.add = function(band, onSuccess, onError){
        apiRequest.jq("POST", endpoint + "/add", band, onSuccess, onError);
    };

    extended.remove = function(band, onSuccess, onError){
        apiRequest.jq("POST", endpoint + "/remove", band, onSuccess, onError);
    };

    extended.update = function(band, onSuccess, onError){
        apiRequest.jq("POST", endpoint + "/update", band, onSuccess, onError);
    };

    return extended;
}]);