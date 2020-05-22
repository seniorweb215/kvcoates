<?php

namespace Campaigns\Controller;

class AppController extends CampaignsController {

    public function initialize() {
        parent::initialize();
        $this->loadModel("Campaigns.Campaigns");
    }

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
