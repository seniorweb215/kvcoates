API.factory("displaysAPI", ['apiRequest', function (apiRequest) {
        var instance = {};
        var endpoint = "/displays";
        instance.getAll = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/all", {}, onSuccess, onError);
        };
        instance.undeployed = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/undeployed", {}, onSuccess, onError);
        };
        instance.getFormData = function(onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/formdata", {}, onSuccess, onError);
        };
        instance.add = function(display, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/add", display, onSuccess, onError);
        };
        instance.update = function(display, onSuccess, onError){
            display.last_login = moment(display.last_login).format('YYYY-MM-DD HH:mm:ss');
            display.installed = moment(display.installed).format('YYYY-MM-DD HH:mm:ss');
            display.modules = JSON.stringify(display.modules);
            apiRequest.jq("POST", endpoint + "/update", display, onSuccess, onError);
        };
        instance.remove = function(display, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/remove", display, onSuccess, onError);
        };
        instance.profile = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/profile/" + displayId , {}, onSuccess, onError);
        };
        instance.history = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/history/" + displayId , {}, onSuccess, onError);
        };
        instance.liftnlearn = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/liftnlearn/" + displayId , {}, onSuccess, onError);
        };
        instance.touch = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/touch/" + displayId , {}, onSuccess, onError);
        };
        instance.campaigns = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/campaigns/" + displayId , {}, onSuccess, onError);
        };
        instance.playback = function(playback, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/playback", playback, onSuccess, onError);
        };
        instance.deploy = function(displayId, locationId, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/deploy", {
                display_id: displayId,
                location_id: locationId
            }, onSuccess, onError);
        };
        instance.undeploy = function(displayId, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/undeploy", {
                display_id: displayId
            }, onSuccess, onError);
        };
        
        
        instance.toggleLiftNLearn = function(displayId , onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/toggleliftnlearn/" + displayId , {}, onSuccess, onError);
        };
        instance.toggleMotionDetection = function(displayId , onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/togglemotiondetection/" + displayId , {}, onSuccess, onError);
        };
        instance.toggleTouch = function(displayId , onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/toggletouch/" + displayId , {}, onSuccess, onError);
        };
        
        instance.exportToXLS = function(){
            window.location = server + "api" + endpoint + "/export";
        };
        
        instance.report = function(type, org_id, start, end){
            window.location = server + "api" + endpoint + "/report?type="+type+"&org_id="+org_id+"&start="+start+"&end="+end;
        };
        
        
        instance.powerHistory = function(displayId, onSuccess, onError){
            apiRequest.ng("GET", endpoint + "/powerhistory/" + displayId , {}, onSuccess, onError);
        };
        
        return instance;
    }]);