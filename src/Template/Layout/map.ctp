<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <title><?= $title ?> | Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <?= $this->element("favicon") ?>
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
        <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" />
        <link href="assets/stylesheets/digitalmedia.css" rel="stylesheet" type="text/css" />
        
        <script>var server = "<?= $this->Url->build(["controller" => "connie", "action" => "home"], true)  ?>";</script>
        <!--[if lte IE 9]>
            <link href="assets/plugins/codrops-dialogFx/dialog.ie.css" rel="stylesheet" type="text/css" media="screen" />
            <![endif]-->
    </head>
    <body class="fixed-header no-header digitalmedia-dashboard">
        <div class="page-container">
            <!-- START HEADER -->
            <div class="header transparent">
                <!-- START MOBILE CONTROLS -->
                <div class="container-fluid relative">
                    <!-- LEFT SIDE -->
                    <div class="pull-left full-height visible-sm visible-xs">
                        <!-- START ACTION BAR -->
                        <div class="header-inner">
                            <a href="#" class="btn-link toggle-sidebar visible-sm-inline-block visible-xs-inline-block padding-5" data-toggle="sidebar">
                                <span class="icon-set menu-hambuger"></span>
                            </a>
                        </div>
                        <!-- END ACTION BAR -->
                    </div>
                    <div class="pull-center hidden-md hidden-lg">
                        <div class="header-inner">
                            <div class="brand inline">
                                <img src="assets/img/display-plan/logo.png" alt="logo" data-src="assets/img/display-plan/logo.png" data-src-retina="assets/img/display-plan/logo_2x.png" width="78" height="22">
                            </div>
                            <a href="#" class="search-link" data-toggle="search"><i class="pg-search"></i>Type anywhere to <span class="bold">search</span></a>
                        </div>
                    </div>
                    <!-- RIGHT SIDE -->
                    <div class="pull-right full-height visible-sm visible-xs">
                        <!-- START ACTION BAR -->
                        <div class="header-inner">
                            <a href="#" class="btn-link visible-sm-inline-block visible-xs-inline-block" data-toggle="quickview" data-toggle-element="#quickview">
                                <span class="icon-set menu-hambuger-plus"></span>
                            </a>
                        </div>
                        <!-- END ACTION BAR -->
                    </div>
                </div>
                <!-- END MOBILE CONTROLS -->
                <div class=" pull-left sm-table hidden-xs hidden-sm">
                    <div class="header-inner">
                        <div class="brand inline">
                            <img src="assets/img/display-plan/logo.png" alt="logo" data-src="assets/img/display-plan/logo.png" data-src-retina="assets/img/display-plan/logo_2x.png" width="78" height="22">
                        </div>
                        
                    </div>
                </div>
            </div>
            <!-- END HEADER -->
            <!-- START PAGE CONTENT WRAPPER -->
            <div class="page-content-wrapper full-height">
                <!-- START PAGE CONTENT -->
                <div class="content full-width full-height overlay-footer">
                    <?= $this->fetch('content') ?>
                </div>
                <!-- END PAGE CONTENT -->
            </div>
            <!-- END PAGE CONTENT WRAPPER -->
        </div>

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
        <script src="assets/plugins/moment/moment.min.js" type="text/javascript"></script>
        <!-- END VENDOR JS -->
        <!-- BEGIN CORE TEMPLATE JS -->
        <script src="pages/js/pages.min.js"></script>
        <!-- END CORE TEMPLATE JS -->
        <!-- BEGIN PAGE LEVEL JS -->
        <?= $this->fetch('scripts') ?>
        <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=<?php echo $map['api_key']; ?>&libraries=places" type="text/javascript"></script>
        <script src="assets/js/scripts.js" type="text/javascript"></script>
        <script src="assets/js/sitesettings.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL JS -->
    </body>
</html>
