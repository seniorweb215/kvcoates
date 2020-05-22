<!DOCTYPE html>
<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> 
<html lang="en" ng-app="digitalMedia" class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title ng-bind="'<?= $title ?> | ' + title"> </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <?= $this->element("favicon") ?>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta content="" name="description" />
        <meta content="" name="author" />


        <link href="assets/plugins/pace/pace-theme-flash.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/boostrapv3/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/jquery-scrollbar/jquery.scrollbar.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/bootstrap-select2/select2.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/switchery/css/switchery.min.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/jquery-nouislider/jquery.nouislider.css" rel="stylesheet" type="text/css" media="screen" />

        <link href="assets/plugins/jquery-metrojs/MetroJs.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/codrops-dialogFx/dialog.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/codrops-dialogFx/dialog-sandra.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/owl-carousel/assets/owl.carousel.css" rel="stylesheet" type="text/css" media="screen" />
        <link href="assets/plugins/jquery-nouislider/jquery.nouislider.css" rel="stylesheet" type="text/css" media="screen" />

        <link href="assets/plugins/bootstrap-datepicker/css/datepicker3.css" rel="stylesheet" type="text/css" media="screen">
        <link href="assets/plugins/summernote/css/summernote.css" rel="stylesheet" type="text/css" media="screen">
        <link href="assets/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css" media="screen">
        <link href="assets/plugins/bootstrap-timepicker/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" media="screen">

        <link href="assets/plugins/nvd3/nv.d3.min.css" rel="stylesheet" type="text/css" media="screen" />



        <link href="assets/plugins/jquery-datatable/media/css/dataTables.bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/datatables-responsive/css/datatables.responsive.css" rel="stylesheet" type="text/css" media="screen" />

        <link href="pages/css/pages-icons.css" rel="stylesheet" type="text/css">
        <link class="main-stylesheet" href="pages/css/pages.css" rel="stylesheet" type="text/css" />
        <link class="main-stylesheet" href="pages/css/themes/calendar.css" rel="stylesheet" type="text/css" />



        <link href="assets/plugins/dropzone/css/dropzone.css" rel="stylesheet" type="text/css" />


        <link href="assets/stylesheets/digitalmedia.css" rel="stylesheet" type="text/css" />


        <link rel="stylesheet" href="ng/bower_components/html5-boilerplate/dist/css/normalize.css">
        <link rel="stylesheet" href="ng/bower_components/html5-boilerplate/dist/css/main.css">
        <script src="ng/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js"></script>
        <script>var server = "<?= $this->Url->build(["controller" => "connie", "action" => "home"], true) ?>";</script>
        <script>var systemActions = <?php echo json_encode($system_actions); ?>;</script>
        <script>var maintenance = <?php echo $maintenance ?>;</script>
        <script>var notification = <?php echo json_encode($notification); ?>;</script>
        <script>var siteTitle = "<?php echo $title; ?>";</script>
        <script>var footerMessage = "<?php echo $footer; ?>";</script>

        <script>var settings = <?= json_encode($map, JSON_NUMERIC_CHECK) ?>;</script>
        <style>.pac-container {
                z-index: 1051 !important;
            }</style>
    </head>

    <body ui-view class="fixed-header sidebar-visible menu-pin">
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->



        <?= $this->element("Bootstrap/angular") ?>
        <?= $this->element("Bootstrap/api") ?>
        <?= $this->element("Bootstrap/components") ?>
        <?= $this->element("Bootstrap/shared") ?>
        <?= $this->element("Bootstrap/vendor") ?>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDN5pEePvXHhwBhg0z23lKnRCSgt3AhruE&libraries=places" type="text/javascript"></script>
        <script src="assets/js/tables.js" type="text/javascript"></script>
        <script src="assets/js/scripts.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL JS -->
    </body>
</html>

