<?php

namespace App\Controller;

/**
 * Description of RolesController
 *
 * @author Rauxmedia
 */
class RolesController extends \System\Controller\RolesController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);   
    }
}
