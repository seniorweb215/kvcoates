'use strict';
displays.directive('displayGeneral', ["digitalMediaAPI", function (digitalMediaAPI) {
        return {
            templateUrl: 'ng/components/displays/display/directives/general/view.html',
            scope: {
                display: '='
            },
            controller: function ($scope) {
                $scope.campaign = null;
                $scope.$watch("display", function (val) {
                    if (val !== null) {
                        setTimeout(initSwitches, 10);
                    }
                });

                $scope.isVerified = function () {
                    return ($scope.display !== null && $scope.display.verified === 1);
                };

                $scope.getStatus = function () {
                    var status = "PENDING REGISTRATION";
                    if ($scope.display !== null) {
                        if ($scope.isVerified()) {
                            var now = moment();
                            var diff = now.diff(moment($scope.display.last_login), 'hours');
                            if (diff < 12) {
                                status = "ONLINE";
                            } else {
                                status = "OFFLINE";
                            }
                        }
                        if ($scope.display.network === "Independent") {
                            status = "INDEPENDENT";
                        }
                    }
                    return status;
                };

                
                


                var onModuleToggle = function (e) {
                    var el = $(e.target);
                    $scope.display.modules[el.data("module")] = el.is(':checked');
                    digitalMediaAPI.displays.update($scope.display, function(data){
                        data.modules = JSON.parse(data.modules);
                        $scope.display = data;
                    }, function(){});
                };
                var initSwitches = function () {
                    var elems = Array.prototype.slice.call(document.querySelectorAll('.module-toggle'));
                    elems.forEach(function (html) {
                        new Switchery(html, {size: 'default', color: '#00b19d'});
                    });
                    $('.module-toggle').change(onModuleToggle);
                    initSlider();
                };
                var initSlider = function () {
                    $("#slider-tooltips").noUiSlider({
                        start: $scope.display.volume,
                        connect: "lower",
                        range: {
                            'min': 0,
                            'max': 15
                        },
                        change:function(values){
                            console.log(values);
                        }
                    });
                    
                    $("#slider-tooltips").on("change", function(event, values){
                        $scope.display.volume = parseFloat(values);
                        digitalMediaAPI.displays.update($scope.display, function(data){
                            data.modules = JSON.parse(data.modules);
                            $scope.display = data;
                        }, function(){});
                    });

                    $("#slider-tooltips").Link('lower').to('-inline-<div class="tooltip fade top in" style="top: -33px;left: -14px;opacity: 0.7;"></div>', function (value) {
                        // The tooltip HTML is 'this', so additional
                        // markup can be inserted here.
                        $(this).html(
                                '<div class="tooltip-inner">' +
                                '<span>' + value + '</span>' +
                                '</div>'
                                );
                    });
                };
            }
        };
    }]);