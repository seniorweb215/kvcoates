digitalMedia.factory('appService', ["$window", "$cookies", "apiRequest",
    function ($window, $cookies, apiRequest) {
        var user = {};
        var organisation = {};
        var instance = {};

        var cloneUser = function (obj) {
            var copy = JSON.parse(JSON.stringify(obj));
            delete copy.role;
            return copy;
        };

        instance.init = function () {

            var session = $window.localStorage.getItem("session");
            if (typeof session !== 'undefined' && session !== null) {
                var data = JSON.parse(session);
                user = data.user;
                organisation.id = data.organisation_id;
            } else {
                user = null;
            }

        };

        instance.login = function (data) {
            /*$cookies.putObject("org_id", data.organisation_id);
             $cookies.putObject("role", data.user.role);
             $cookies.putObject("user", cloneUser(data.user));*/
            $window.localStorage.setItem("session", JSON.stringify(data));
            user = data.user;
            organisation.id = data.organisation_id;
        };
        instance.logout = function (data) {
            $window.localStorage.removeItem("session");
            user = null;
            organisation.id = null;
        };

        instance.isSuperAdmin = function () {
            return (user !== null && user.role_id === 1);
        };
        instance.isAdmin = function () {
            return (user !== null && user.role_id === 2);
        };
        instance.isStatsViewer = function () {
            return (user !== null && user.role_id === 4);
        };
        instance.getLoggedUser = function () {
            return user;
        };
        instance.getLoggedUserId = function () {
            return user.id;
        };
        instance.getLoggedUserOrganisationId = function () {
            return organisation.id;
        };
        instance.getLoggedUserFullName = function () {
            return user.first_name + " " + user.last_name;
        };

        instance.getURL = function (url) {
            return apiRequest.getServerURL() + "/" + url;
        };


        instance.initGallery = function (gallerySelector, itemSelector, onImagesLoaded) {
            var gallery = $(gallerySelector);
            gallery.imagesLoaded(function () {
                applyIsotope(gallery, itemSelector, onImagesLoaded);
            });
        };
        instance.resetGallery = function (gallery) {
            gallery.isotope('destroy');
        };

        instance.notify = function (style, message, type, timeout) {
            //style: bar, flip,. circle, simple
            //type: info, success, warning, error
            $('body').pgNotification({
                style: style,
                message: message,
                position: 'top',
                timeout: timeout,
                type: type
            }).show();
        };


        instance.callPrint = function (id) {
            var prtContent = document.getElementById(id);
            var WinPrint =
                    window.open('', '', 'left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status=0');
            WinPrint.document.write(prtContent.innerHTML);
            WinPrint.document.close();
            WinPrint.focus();
            WinPrint.print();
            return false;
            WinPrint.close();
        }

        var applyIsotope = function (gallery, itemSelector, onImagesLoaded) {
            gallery.isotope({
                itemSelector: itemSelector,
                masonry: {
                    columnWidth: 280,
                    gutter: 10,
                    isFitWidth: true
                }
            });
            onImagesLoaded(gallery);
        };


        return instance;
    }]);


