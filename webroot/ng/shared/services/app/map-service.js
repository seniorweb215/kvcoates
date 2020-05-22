shared.factory("mapService", ['digitalMediaAPI', function (digitalMediaAPI) {
        var instance = {};
        var map;
        var placesService;
        var zoomLevel = settings.zoom;
        var digitalMediaHQ = new google.maps.LatLng(settings.latitude, settings.longitude);
        var mapOptions = {
            zoom: zoomLevel,
            disableDefaultUI: true,
            styles: [{
                    featureType: 'water',
                    elementType: 'all',
                    stylers: [{
                            hue: '#e9ebed'
                        }, {
                            saturation: -78
                        }, {
                            lightness: 67
                        }, {
                            visibility: 'simplified'
                        }]
                }, {
                    featureType: 'landscape',
                    elementType: 'all',
                    stylers: [{
                            hue: '#ffffff'
                        }, {
                            saturation: -100
                        }, {
                            lightness: 100
                        }, {
                            visibility: 'simplified'
                        }]
                }, {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{
                            hue: '#bbc0c4'
                        }, {
                            saturation: -93
                        }, {
                            lightness: 31
                        }, {
                            visibility: 'simplified'
                        }]
                }, {
                    featureType: 'poi',
                    elementType: 'all',
                    stylers: [{
                            hue: '#ffffff'
                        }, {
                            saturation: -100
                        }, {
                            lightness: 100
                        }, {
                            visibility: 'off'
                        }]
                }, {
                    featureType: 'road.local',
                    elementType: 'geometry',
                    stylers: [{
                            hue: '#e9ebed'
                        }, {
                            saturation: -90
                        }, {
                            lightness: -8
                        }, {
                            visibility: 'simplified'
                        }]
                }, {
                    featureType: 'transit',
                    elementType: 'all',
                    stylers: [{
                            hue: '#e9ebed'
                        }, {
                            saturation: 10
                        }, {
                            lightness: 69
                        }, {
                            visibility: 'on'
                        }]
                }, {
                    featureType: 'administrative.locality',
                    elementType: 'all',
                    stylers: [{
                            hue: '#2c2e33'
                        }, {
                            saturation: 7
                        }, {
                            lightness: 19
                        }, {
                            visibility: 'on'
                        }]
                }, {
                    featureType: 'road',
                    elementType: 'labels',
                    stylers: [{
                            hue: '#bbc0c4'
                        }, {
                            saturation: -93
                        }, {
                            lightness: 31
                        }, {
                            visibility: 'on'
                        }]
                }, {
                    featureType: 'road.arterial',
                    elementType: 'labels',
                    stylers: [{
                            hue: '#bbc0c4'
                        }, {
                            saturation: -93
                        }, {
                            lightness: -2
                        }, {
                            visibility: 'simplified'
                        }]
                }]
        };


        



        instance.initUI = function () {
            $('#map-zoom-in').click(function () {
                map.setZoom(++zoomLevel);
            });
            $('#map-zoom-out').click(function () {
                map.setZoom(--zoomLevel);
            });
        };

        instance.initAutoComplete = function (id, lat, lng, onPlaceChange) {
            var autocomplete = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */(document.getElementById(id)));
            autocomplete.bindTo('bounds', map);
            var position = (lat !== 0 && lng !== 0) ? new google.maps.LatLng(lat, lng) : digitalMediaHQ;
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                draggable: true,
                icon: "assets/img/maps/digitalmedia-location-marker.png",
                title: "DigitalMedia Location"
            });
            map.setCenter(position);
            map.setZoom(16);

            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                console.log(place);
                if (!place.geometry) {
                    onPlaceChange(null);
                    return;
                }
                onPlaceChange(place);
                map.setCenter(place.geometry.location);
                marker.setPosition(place.geometry.location);
                infowindow.setContent(place.formatted_address);

            });
            var geocoder = new google.maps.Geocoder();
            var infowindow = new google.maps.InfoWindow();
            geocoder.geocode({'latLng': position}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $('.location_address').val(results[0].formatted_address);
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                    }
                }
            });

            google.maps.event.addListener(marker, 'dragend', function () {
                geocoder.geocode({'latLng': marker.getPosition()}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $('.location_address').val(results[0].formatted_address);
                            console.log(results[0]);
                            if (!results[0].geometry) {
                                onPlaceChange(null);
                                return;
                            }
                            onPlaceChange(results[0]);
                            infowindow.setContent(results[0].formatted_address);
                            infowindow.open(map, marker);
                        }
                    }
                });
            });

        };
        
        instance.autoComplete = function (id, onPlaceChange) {
            var autocomplete = new google.maps.places.Autocomplete(/** @type {!HTMLInputElement} */(document.getElementById(id)));
            

            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                console.log(place);
                if (!place.geometry) {
                    onPlaceChange(null);
                    return;
                }
                onPlaceChange(place);
                /*map.setCenter(place.geometry.location);
                marker.setPosition(place.geometry.location);
                infowindow.setContent(place.formatted_address);*/

            });
        };
        instance.init = function () {
            mapOptions.center = digitalMediaHQ;
            map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
            this.initUI();
            return map;
        };

        return instance;
    }]);