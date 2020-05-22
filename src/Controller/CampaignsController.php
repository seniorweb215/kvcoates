<?php

namespace App\Controller;

/**
 * Description of FeedsController
 *
 * @author Rauxmedia
 */
use Campaigns\Controller\AppController as BaseController;

class CampaignsController extends BaseController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
