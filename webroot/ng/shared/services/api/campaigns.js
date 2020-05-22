API.factory("campaignsAPI", ['apiRequest', function (apiRequest) {
        var extended = {};
        var endpoint = "/campaigns";
        
        extended.data = function (onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/data/", {}, onSuccess, onError);
        };
        extended.all = function (defaultCampaigns, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/all/" + defaultCampaigns, {}, onSuccess, onError);
        };
        
        extended.getTargetedDisplays = function(criteria, onSuccess, onError){
            apiRequest.jq("POST", endpoint + "/target", criteria, onSuccess, onError);
        };
        
        extended.download = function(cId){
            window.location = server + "api" + endpoint + "/download/" + cId;
        };
        
        extended.downloadReport = function(cId){
            window.location = server + "api" + endpoint + "/report/" + cId;
        };
        
        extended.publish = function (cId, overrides, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/publish", {id: cId, overrides: overrides}, onSuccess, onError);
        };
        
        extended.publish = function (cId, overrides, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/publish", {id: cId, overrides: overrides}, onSuccess, onError);
        };
        extended.attachDisplay = function (cId, dId, overrides, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/attach-display", {cid: cId, did: dId, overrides: overrides}, onSuccess, onError);
        };
        
        extended.stop = function (cId, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/stop", {id: cId}, onSuccess, onError);
        };
        
        extended.profile = function (feedId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/profile/" + feedId, {}, onSuccess, onError);
        };
        extended.preview = function (feedId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/preview/" + feedId, {}, onSuccess, onError);
        };
        extended.contents = function (feedId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/contents/" + feedId, {}, onSuccess, onError);
        };
        extended.add = function (feed, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/add", feed, onSuccess, onError);
        };
        extended.update = function (feed, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/update", feed, onSuccess, onError);
        };
        extended.duplicate = function (feed, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/duplicate", feed, onSuccess, onError);
        };
        extended.remove = function (campaign, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/remove", campaign, onSuccess, onError);
        };
        extended.pushContent = function (content, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/push-content", content, onSuccess, onError);
        };
        extended.popContent = function (content, onSuccess, onError) {
            apiRequest.jq("POST", endpoint + "/pop-content", content, onSuccess, onError);
        };
        
        extended.toggleMotionDetection = function (cId, onSuccess, onError) {
            apiRequest.ng("GET", endpoint + "/togglemotiondetection/" + cId, {}, onSuccess, onError);
        };
        
        extended.exportToXLS = function(){
            window.location = server + "api" +endpoint + "/export";
        };
        return extended;
    }]);