<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <title><?= $title ?> | Blacklisted</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <?= $this->element("favicon") ?>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta content="" name="description" />
        <meta content="" name="author" />
        <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/boostrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/bootstrap-select2/select2.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/switchery/css/switchery.min.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="pages/css/pages-icons.css" rel="stylesheet" type="text/css">
        <link class="main-stylesheet" href="pages/css/pages.css" rel="stylesheet" type="text/css" />
        <!--[if lte IE 9]>
            <link href="pages/css/ie9.css" rel="stylesheet" type="text/css" />
        <![endif]-->
        <script type="text/javascript">
            window.onload = function ()
            {
                // fix for windows 8
                if (navigator.appVersion.indexOf("Windows NT 6.2") != -1)
                    document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="pages/css/windows.chrome.fix.css" />'
            }
        </script>
    </head>
    <body class="fixed-header error-page">
        <div class="container-xs-height full-height">
            <?= $this->fetch('content') ?>
        </div>
        <!--<div class="pull-bottom sm-pull-bottom full-width">
            <div class="error-container">
                <div class="error-container-innner">
                    <div class="m-b-30 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                        <div class="col-sm-3 no-padding">
                            <img alt="" class="m-t-5" data-src="assets/img/demo/pages_icon.png" data-src-retina="assets/img/demo/pages_icon_2x.png" height="60" src="assets/img/demo/pages_icon.png" width="60">
                        </div>
                        <div class="col-sm-9 no-padding">
                            <p><small>Create a pages account. If you have a facebook account, log into it for this process.
                                    Sign in with <a href="#">Facebook</a> or <a href="#">Google</a></small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>-->
        <!-- END PAGE CONTAINER -->
        <!-- BEGIN VENDOR JS -->
        <script src="assets/plugins/pace/pace.min.js" type="text/javascript"></script>
        <script src="assets/plugins/jquery/jquery-1.11.1.min.js" type="text/javascript"></script>
        <script src="assets/plugins/modernizr.custom.js" type="text/javascript"></script>
        <script src="assets/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
        <script src="assets/plugins/boostrapv3/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="assets/plugins/jquery/jquery-easy.js" type="text/javascript"></script>
        <script src="assets/plugins/jquery-unveil/jquery.unveil.min.js" type="text/javascript"></script>
        <script src="assets/plugins/jquery-bez/jquery.bez.min.js"></script>
        <script src="assets/plugins/jquery-ios-list/jquery.ioslist.min.js" type="text/javascript"></script>
        <script src="assets/plugins/jquery-actual/jquery.actual.min.js"></script>
        <script src="assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js"></script>
        <script type="text/javascript" src="assets/plugins/bootstrap-select2/select2.min.js"></script>
        <script type="text/javascript" src="assets/plugins/classie/classie.js"></script>
        <script src="assets/plugins/switchery/js/switchery.min.js" type="text/javascript"></script>
        <!-- END VENDOR JS -->
        <script src="pages/js/pages.min.js"></script>
    </body>
</html>
