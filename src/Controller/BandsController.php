<?php

namespace App\Controller;

/**
 * Description of BandsController
 *
 * @author Yaroslav
 */
class BandsController extends \System\Controller\BandsController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
