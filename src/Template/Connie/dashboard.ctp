<!-- START CONTENT INNER -->
<div class="map-controls">
    <div class="pull-left">
        <div class="btn-group btn-group-vertical" data-toggle="buttons-radio">
            <button id="map-zoom-in" class="btn btn-success btn-xs"><i class="fa fa-plus"></i>
            </button>
            <button id="map-zoom-out" class="btn btn-success btn-xs"><i class="fa fa-minus"></i>
            </button>
        </div>
    </div>

</div>
<div class="display-search">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-4">
                <div class="support-controls">
                    <p class="pull-left"><i class="fa fa-wrench" aria-hidden="true"></i> Support</p>
                    <input type="checkbox" data-init-plugin="switchery" class="support-toggle" />
                </div>
            </div>
            <div class="col-sm-8">
                <form>
                    <div class="form-group">
                        <input class="form-control" type="text" placeholder="search by display ID" id="search-input"/>
                    </div>
                </form>

                <div id="search-results"></div>
            </div>

        </div>
    </div>

</div>
<!-- Map -->
<div class="map-container full-width full-height">
    <div id="google-map" class="full-width full-height"></div>
</div>


<div class="digitalmedia-location">
    <div class="container infowindow-scroll-fix">
        <div class="row">
            <div class="col-md-12">
                <h4 class="name">Lola</h4>
                <h5 class="address">alle X kaha</h5>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-6">
                <p class="phone">9181761661</p>
                <p class="email">a@a.com</p>
            </div>
            <div class="col-md-6">
                <div class="displays">
                </div>
            </div>
        </div>
        <hr />
        <div class="row">
            <div class="col-md-12">
                <div class="tickets"></div>
            </div>
        </div>
    </div>
</div>
<!-- END CONTENT INNER -->

<?php $this->start("scripts"); ?>

<script>
    var settings = <?= json_encode($map, JSON_NUMERIC_CHECK) ?>;
</script>
<?php
$this->end();
