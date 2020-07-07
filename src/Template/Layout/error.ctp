<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <meta charset="utf-8" />
        <title><?= $title ?> | Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
        <link rel="apple-touch-icon" href="pages/ico/60.png">
        <link rel="apple-touch-icon" sizes="76x76" href="pages/ico/76.png">
        <link rel="apple-touch-icon" sizes="120x120" href="pages/ico/120.png">
        <link rel="apple-touch-icon" sizes="152x152" href="pages/ico/152.png">
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta content="" name="description" />
        <meta content="" name="author" />
        
        <?= $this->Html->css('/assets/plugins/pace/pace-theme-flash.css') ?>
        <?= $this->Html->css('/assets/plugins/boostrapv3/css/bootstrap.min.css') ?>
        <?= $this->Html->css('/assets/plugins/font-awesome/css/font-awesome.css') ?>
        <?= $this->Html->css('/assets/plugins/jquery-scrollbar/jquery.scrollbar.css') ?>
        <?= $this->Html->css('/assets/plugins/switchery/css/switchery.min.css') ?>
        <?= $this->Html->css('/pages/css/pages-icons.css') ?>
        <?= $this->Html->css('/pages/css/pages.css') ?>
        
        <!--[if lte IE 9]>
            <?= $this->Html->css('/pages/css/ie9.css') ?>
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
        <?= $this->fetch('content') ?>

        <div class="pull-bottom sm-pull-bottom full-width">
            <div class="error-container">
                <div class="error-container-innner">
                    <div class="m-b-30 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
                        <div class="col-sm-12 text-center">
                            <?= $this->Html->image('/assets/img/digital-media/connie-black.png', ["class" => "m-t-5", "alt" => "logo", "width" => 250]) ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- BEGIN VENDOR JS -->
        
        
        <?= $this->Html->script('/assets/plugins/pace/pace.min.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery/jquery-1.11.1.min.js') ?>
        <?= $this->Html->script('/assets/plugins/modernizr.custom.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery-ui/jquery-ui.min.js') ?>
        <?= $this->Html->script('/assets/plugins/boostrapv3/js/bootstrap.min.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery/jquery-easy.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery-unveil/jquery.unveil.min.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery-bez/jquery.bez.min.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery-ios-list/jquery.ioslist.min.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery-actual/jquery.actual.min.js') ?>
        <?= $this->Html->script('/assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js') ?>
        <?= $this->Html->script('/assets/plugins/bootstrap-select2/select2.min.js') ?>
        <?= $this->Html->script('/assets/plugins/classie/classie.js') ?>
        <?= $this->Html->script('/assets/plugins/switchery/js/switchery.min.js') ?>
        <?= $this->Html->script('/pages/js/pages.min.js') ?>
    </body>
</html>