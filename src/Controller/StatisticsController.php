<?php

namespace App\Controller;

/**
 * Description of StatisticsController
 *
 * @author Rauxmedia
 */
use Statistics\Controller\StatisticsController as BaseController;

class StatisticsController extends BaseController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
