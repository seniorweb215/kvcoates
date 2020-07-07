

var DigitalMedia = {};
DigitalMedia.Models = {};
DigitalMedia.Views = {};
DigitalMedia.Controllers = {};


DigitalMedia.Models.Displays = {
    endpoint: "displays/",
    getAll: function (onSuccess, onError) {
        DigitalMedia.Models.API.request("GET", this.endpoint, {}, onSuccess, onError);
    }
};
DigitalMedia.Models.Locations = {
    endpoint: "locations/",
    dashboard: function (onSuccess, onError) {
        DigitalMedia.Models.API.request("GET", this.endpoint + "dashboard", {}, onSuccess, onError);
    }
};
DigitalMedia.Models.Users = {
    endpoint: "users/",
    locations: function (onSuccess, onError) {
        DigitalMedia.Models.API.request("GET", this.endpoint + "locations", {}, onSuccess, onError);
    }
};
DigitalMedia.Models.API = {
    displays: DigitalMedia.Models.Displays,
    locations: DigitalMedia.Models.Locations,
    users: DigitalMedia.Models.Users,
    request: function (type, endpoint, data, onSuccess, onError) {
        $.ajax({
            type: type,
            url: server + "api/" + endpoint,
            data: data,
            success: function (response) {
                if (response.success) {
                    onSuccess(response.data);
                } else {
                    onError(response.data);
                }
            },
            error: onError
        });
    }
};


DigitalMedia.Models.DisplaySearch = function () {
    var displays;
    this.query = function (id) {
        id = id.toUpperCase();
        return displays.filter(function (display) {
            return (display.identifier.includes(id));
        });
    };


    this.findByDisplayId = function (id) {
        return displays.find(function (display) {
            return (display.id === id);
        });
    };

    this.parse = function (locations) {
        var display;
        displays = [];
        locations.forEach(function (location) {
            location.deployments.forEach(function (deployment) {
                display = deployment.display;
                display.latitude = location.latitude;
                display.longitude = location.longitude;
                displays.push(display);
            });
        });
    };
    this.parseUsers = function (users) {
        var display, id;
        users.forEach(function (user) {
            id = user.first_name + " " + user.last_name;
            display = {id: 'u' + user.id};
            display.identifier = id.toUpperCase();
            display.latitude = user.location.latitude;
            display.longitude = user.location.longitude;
            displays.push(display);
        });
    };
};

DigitalMedia.Views.Location = function (map, model, callbacks) {

    var addMarker = function () {

        if (shouldAddMarker()) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(model.latitude, model.longitude),
                map: map,
                icon: "assets/img/maps/" + getLocationIcon(),
                title: model.name
            });
            marker.addListener('click', onClick);
        }
    };

    var shouldAddMarker = function () {
        var result = false;
        for (var i = 0; i < displays.length; i++) {
            if (displays[i].verified) {
                result = true;
                break;
            }
        }
        return (settings.unverified === "true") ? true : result;
    };

    var onClick = function () {
        callbacks.onClick(marker, getHTMLContent());
    };

    var getLocationIcon = function () {
        var icon = "";
        var now = moment();
        displays.forEach(function (display) {
            var diff = now.diff(moment(display.last_login), 'hours');
            if (diff < settings.offline_two) {
                icon = "digitalmedia-pin-display-on.png";
            } else if (diff >= settings.offline_two && diff <= settings.offline_one) {
                icon = "digitalmedia-pin-display-offline.png";
            } else {
                icon = "digitalmedia-pin-display-off.png";
            }
        });
        icon = (displays.length === 0) ? "digitalmedia-location-marker.png" : icon;
        return icon;
    };


    var getHTMLContent = function () {
        var el = ".digitalmedia-location";
        $(el + " .name").text(model.name);
        $(el + " .address").text(model.address);
        $(el + " .daily-users").html("<strong>Daily Users: </strong>" + model.daily_users);
        $(el + " .displays").html("<strong>Displays: </strong>" + model.deployments.length);
        $(el + " .size").html("<strong>Size: </strong>" + model.size.size_name);
        $(el + " .price-band").html("<strong>Price Band: </strong>" + model.deployments[0].display.band_id);
        $(el + " .owner").html("<strong>Owner: </strong>" + model.location_contact.name);
        if(model.location_attachments.length > 0) {
            $(el + " .image").attr("src", model.location_attachments[0].url);
        } else {
            $(el + " .image").attr("src", "");
        }
        
        // $(el + " .displays").html(getDisplaysHTML());
        $(el + " .tickets").html(getSupportHTML());
        return $(el).html();
    };

    var getDisplaysHTML = function () {
        var html = '';
        displays.forEach(function (display) {
            var campaign = getUpcomingCampaign(display);
            html += '<p><a href="' + server + '#/displays/' + display.id + '" target="_blank">' + display.identifier + ' - ' + display.name + '</a></p>';
            html += '<p><b>Last login:</b> ' + moment(display.last_login).fromNow() + '</p>';
            html += '<p><strong>Playing: </strong>' + campaign.name + '</p>';
            html += "<hr />";
        });
        return html;
    };

    var getSupportHTML = function () {
        var html = '';
        displays.forEach(function (display) {
            display.display_issues.forEach(function (issue) {
                html += '<p><b>Issue: </b> ' + issue.display_issue_type.name + '</p>';
                html += '<p><b>Details: </b>' + issue.details + '</p>';
                html += '<p><a href="' + server + '#/support/ticket/' + issue.id + '" target="_blank">more</a></p>';
                html += "<hr />";
            });


        });
        return html;
    };

    var getUpcomingCampaign = function (display) {
        var upcomingCampaign = {name: "No campaign"};
        if (display.scheduled_playbacks !== null) {
            if (display.scheduled_playbacks.length > 0) {
                upcomingCampaign = display.scheduled_playbacks[0].campaign;
            }
        }
        return upcomingCampaign;
    };

    var init = function () {
        displays = [];
        model.deployments.forEach(function (deployment) {
            displays.push(deployment.display);
        });

        addMarker();
    };
    var displays, marker;

    init();
    return {
        getMarker: function () {
            return marker;
        }
    };
};

DigitalMedia.Views.Minion = function (map, model) {
    var marker;
    var addMarker = function () {

        marker = new google.maps.Marker({
            position: new google.maps.LatLng(model.location.latitude, model.location.longitude),
            map: map,
            icon: "assets/img/maps/digitalmedia-minion-marker.png",
            title: model.name
        });
        // marker.addListener('click', onClick);
    };
    var init = function () {
        addMarker();
    };
    this.getMarker = function () {
        return marker;
    };
    init();
};


DigitalMedia.Views.Map = function () {
    var map, markers;
    var locations = [];
    var zoomLevel = settings.zoom;
    var digitalMediaHQ = new google.maps.LatLng(settings.latitude, settings.longitude);
    var infoWindow = new google.maps.InfoWindow();




    var showInfoWindow = function (marker, html) {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    };

    var getMapOptions = function () {
        return {
            // How zoomed in you want the map to start at (always required)
            zoom: zoomLevel,
            disableDefaultUI: true,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York
            // Map styling
            styles: settings.style
        };
    };

    var zoomIn = function () {
        map.setZoom(++zoomLevel);
    };
    var zoomOut = function () {
        map.setZoom(--zoomLevel);
    };
    var initUI = function () {
        $('#map-zoom-in').click(zoomIn);
        $('#map-zoom-out').click(zoomOut);
        infoWindow.setZIndex(10000);
    };

    var clearMarkers = function () {
        markers.forEach(function (marker) {
            marker.setMap(null);
        })
        markers = [];
    };

    var init = function () {
        var mapElement = document.getElementById('google-map');
        map = new google.maps.Map(mapElement, getMapOptions());
        map.setCenter(digitalMediaHQ);
        var marker = new google.maps.Marker({
            map: map,
            position: digitalMediaHQ,
            icon: "assets/img/maps/digitalmedia-hq-icon.png" || "assets/img/maps/digitalmedia-location-marker.png",
            title: settings.hq_text || "DigitalMedia HQ"
        });
        markers = [];
        initUI();
    };
    init();


    this.drawDisplays = function (displays) {
        var markers = [];
        var lat = 0, lng = 0;
        displays.forEach(function (display) {
            lat += display.latitude;
            lng += display.longitude;
            markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(display.latitude, display.longitude),
                map: map,
                title: display.name
            }));
        });


    };
    this.drawLocations = function (_locations) {
        var loc;
        clearMarkers();
        locations = _locations;
        locations.forEach(function (location) {
            loc = new DigitalMedia.Views.Location(map, location, {
                onClick: showInfoWindow
            });
            if (typeof loc.getMarker() !== 'undefined') {
                markers.push(loc.getMarker());
            }

        });
        if (settings.clustered === 'true') {
            var markerCluster = new MarkerClusterer(map, markers,
                    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        }
    };

    this.drawMinions = function (minions) {
        var min;
        if (settings.minions === 'true') {
            minions.forEach(function (minion) {
                min = new DigitalMedia.Views.Minion(map, minion);
            });
        }
    };

    this.center = function () {
        map.setCenter(digitalMediaHQ);
    };

    this.zoomIntoDisplayLocation = function (display) {
        var loc = new google.maps.LatLng(display.latitude, display.longitude);
        map.setCenter(loc);
        zoomLevel = 15;
        zoomIn();
    };
};

DigitalMedia.Views.Search = function (callbacks) {
    var search;
    var searchInput = $("#search-input");
    var searchResults = $("#search-results");

    var onSelectDisplay = function (e) {
        var id = $(e.target).closest(".search-result").data("id");
        var display = search.findByDisplayId(id);
        searchResults.html("");
        searchInput.val(display.identifier);
        callbacks.onSelectedDisplay(display);
    };
    var onKeyUp = function (e) {
        renderSearchResults(search.query(searchInput.val()));
    };

    var renderSearchResults = function (results) {
        var html = "";
        results.forEach(function (result) {
            html += '<div class="search-result" data-id="' + result.id + '">' + result.identifier + '</div>';
        });
        searchResults.html(html);
        $(".search-result").click(onSelectDisplay);
    };

    var eventListeners = function () {
        searchInput.keyup(onKeyUp);
    };

    this.init = function (locations) {
        search = new DigitalMedia.Models.DisplaySearch();
        search.parse(locations);
        eventListeners();
    };
    this.addUsers = function (users) {
        search.parseUsers(users);
    };

};

DigitalMedia.Views.Support = function (callbacks) {
    var locations;

    var onModuleToggle = function (e) {
        var el = $(e.target);
        callbacks.onToggle(el.is(':checked'), locations);
    };

    this.init = function (_locations) {
        $('.support-toggle').change(onModuleToggle);
        locations = _locations.filter(function (location) {
            var result = false;
            for (var i = 0; i < location.deployments.length; i++) {
                if (location.deployments[i].display.display_issues.length > 0) {
                    result = true;
                    break;
                }
            }
            return result;
        });
    };
};


DigitalMedia.Controllers.Dashboard = function () {
    var locations, minions, search, map, support;
    var loadDisplays = function () {
        DigitalMedia.Models.API.locations.dashboard(function (data) {
            locations = data;
            map.drawLocations(locations);
            search.init(locations);
            support.init(locations);
            loadMinions();
        }, function (data) {

        });
    };
    var loadMinions = function () {
        DigitalMedia.Models.API.users.locations(function (data) {
            minions = data;
            map.drawMinions(minions);
            search.addUsers(minions);
        }, function (data) {

        });
    };
    var onSupportModeToogle = function (state, supportLocations) {
        (state) ? map.drawLocations(supportLocations) : map.drawLocations(locations);
    };

    var zoomIntoDisplayLocation = function (display) {
        map.zoomIntoDisplayLocation(display);
    };

    var init = function () {
        map = new DigitalMedia.Views.Map();
        search = new DigitalMedia.Views.Search({
            onSelectedDisplay: zoomIntoDisplayLocation
        });
        support = new DigitalMedia.Views.Support({
            onToggle: onSupportModeToogle
        });
        loadDisplays();
        
    };
    init();
};







var main = function () {
    new DigitalMedia.Controllers.Dashboard();
};
jQuery(main);


