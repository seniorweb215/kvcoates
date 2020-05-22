'use strict';
shared.directive('locationsMap', ["$state", "appService", "mapService", function ($state, appService, mapService) {
        return {
            templateUrl: 'ng/shared/directives/maps/locations/view.html',
            scope: {
                locations: "=",
                shouldRedraw: '='
            },
            controller: function ($scope) {

                var LocationView = function (map, model, callbacks) {
                    var addMarker = function () {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(model.latitude, model.longitude),
                            map: map,
                            icon: "assets/img/maps/" + getLocationIcon(),
                            title: model.name
                        });
                        marker.addListener('click', onClick);
                    };
                    var onClick = function () {
                        callbacks.onClick(marker, getHTMLContent());
                    };
                    var getLocationIcon = function () {
                        var icon = "";
                        var now = moment();
                        displays.forEach(function (display) {
                            var diff = now.diff(moment(display.last_login), 'hours');
                            console.log(display.name, diff);
                            if (diff < 12) {
                                icon = "digitalmedia-pin-display-on.png";
                            } else if (diff >= 12 && diff <= 24) {
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
                        $(el + " .phone").text("Phone: " + model.telephone);
                        $(el + " .email").text("Email: " + model.email);
                        $(el + " .displays").html(getDisplaysHTML());
                        return $(el).html();
                    };
                    var getDisplaysHTML = function () {
                        var html = '';

                        displays.forEach(function (display) {
                            html += '<li>' + display.name + ', last login: ' + moment(display.last_login).fromNow() + '</li>';
                        });
                        return html;
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
                };
                var map, infoWindow;
                $scope.$watch("shouldRedraw", function (value) {
                    if(value){
                        redraw();
                    }
                });





                var redraw = function () {
                    setTimeout(function () {
                        
                        draw();
                    }, 50);
                };


                var showInfoWindow = function (marker, html) {
                    infoWindow.setContent(html);
                    infoWindow.open(map, marker);
                };

                var draw = function () {
                    if ($scope.locations.length > 0) {
                        init();
                        $scope.locations.forEach(function (location) {
                            new LocationView(map, location, {
                                onClick: showInfoWindow
                            });
                        });
                    }

                };
                var init = function () {
                    map = mapService.init();
                    google.maps.event.trigger(map, 'resize');
                    infoWindow = new google.maps.InfoWindow();
                };

            }
        };
    }]);