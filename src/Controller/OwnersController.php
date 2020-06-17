<?php

namespace App\Controller;

/**
 * Description of OwnersController
 *
 * @author Yaroslav
 */
class OwnersController extends \System\Controller\OwnersController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
