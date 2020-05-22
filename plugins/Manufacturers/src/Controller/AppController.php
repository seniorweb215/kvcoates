<?php

namespace Manufacturers\Controller;

class AppController extends ManufacturersController {

    public function initialize() {
        parent::initialize();
        $this->loadModel("Manufacturers.DisplayManufacturers");
    }

}
