API.factory('digitalMediaAPI', ["usersAPI",
    "displaysAPI",
    "manufacturersAPI",
    "displayIssuesAPI",
    "organisationsAPI",
    "bandsAPI",
    "brandsAPI",
    "locationsAPI",
    "campaignsAPI",
    "contentAPI",
    "mediaAPI",
    "countriesAPI",
    "zonesAPI",
    "statsAPI",
    "rolesAPI",
    "notificationsAPI",
    "mappingsAPI",
    "blacklistedClientsAPI",
    function (usersAPI,
            displaysAPI,
            manufacturersAPI,
            displayIssuesAPI,
            organisationsAPI,
            bandsAPI,
            brandsAPI,
            locationsAPI,
            campaignsAPI,
            contentAPI,
            mediaAPI,
            countriesAPI,
            zonesAPI,
            statsAPI,
            rolesAPI,
            notificationsAPI,
            mappingsAPI,
            blacklistedClientsAPI){
        var instance = {};
        instance.users = usersAPI;
        instance.displays = displaysAPI;
        instance.manufacturers = manufacturersAPI;
        instance.displayIssues = displayIssuesAPI;
        instance.organisations = organisationsAPI;
        instance.bands = bandsAPI;
        instance.brands = brandsAPI;
        instance.campaigns = campaignsAPI;
        instance.content = contentAPI;
        instance.media = mediaAPI;
        instance.locations = locationsAPI;
        instance.countries = countriesAPI;
        instance.zones = zonesAPI;
        instance.stats = statsAPI;
        instance.roles = rolesAPI;
        instance.notifications = notificationsAPI;
        instance.mappings = mappingsAPI;
        instance.blacklistedClients = blacklistedClientsAPI;
        return instance;
    }]);


