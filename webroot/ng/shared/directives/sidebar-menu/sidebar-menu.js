'use strict';
shared.directive('sidebarMenu', [function () {
        return {
            templateUrl: 'ng/shared/directives/sidebar-menu/view.html',
            scope: {
            },
            controller: function ($scope) {
                
                
                var bindEvents = function () {
                    $('body').on('click', '.sidebar-menu a', function (e) {

                        if ($(this).parent().children('.sub-menu') === false) {
                            return;
                        }
                        var el = $(this);
                        var parent = $(this).parent().parent();
                        var li = $(this).parent();
                        var sub = $(this).parent().children('.sub-menu');

                        if (li.hasClass("active open")) {
                            el.children('.arrow').removeClass("active open");
                            sub.slideUp(200, function () {
                                li.removeClass("active open");
                            });

                        } else {
                            parent.children('li.open').children('.sub-menu').slideUp(200);
                            parent.children('li.open').children('a').children('.arrow').removeClass('active open');
                            parent.children('li.open').removeClass("open active");
                            el.children('.arrow').addClass("active open");
                            sub.slideDown(200, function () {
                                li.addClass("active open");

                            });
                        }
                    });
                };

                var patch = function(){
                    var sub = $("ul.sub-menu  li.active.open ul.sub-menu");
                    sub.slideDown(1, function () {});
                };
                var init = function () {
                    $.Pages.initSidebar();
                    patch();
                    bindEvents();
                };
                setTimeout(init, 0);
            }
        };
    }]);