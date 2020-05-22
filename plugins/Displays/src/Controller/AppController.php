<?php

namespace Displays\Controller;

class AppController extends DisplaysController {

    public function initialize() {
        parent::initialize();
        $this->loadModel("Displays.Displays");
    }

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
