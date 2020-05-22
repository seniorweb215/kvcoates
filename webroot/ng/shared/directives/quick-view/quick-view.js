'use strict';
shared.directive('quickView', [function () {
        return {
            templateUrl: 'ng/shared/directives/quick-view/view.html',
            scope: {
            },
            controller: function ($scope) {





                var toggle = function (e) {
                    var elem = $(this).attr('data-toggle-element');
                    if (Modernizr.csstransitions) {
                        $(elem).toggleClass('open');
                    } else {
                        var width = $(elem).width();
                        if (!$(elem).hasClass('open-ie')) {
                            $(elem).stop().animate({
                                right: -1 * width
                            }, 400, $.bez([.05, .74, .27, .99]), function () {
                                $(elem).addClass('open-ie')
                            });
                        } else {
                            $(elem).stop().animate({
                                right: 0
                            }, 400, $.bez([.05, .74, .27, .99]), function () {
                                $(elem).removeClass('open-ie')
                            });
                        }
                    }
                    e.preventDefault();
                };
                var init = function () {
                    $('[data-pages="quickview"]').each(function () {
                        var $quickview = $(this);
                        $quickview.quickview($quickview.data());
                    });
                    $(document).on('click.pg.quickview.data-api touchstart', '[data-toggle="quickview"]', toggle);
                };
                setTimeout(init, 0);
            }
        };
    }]);