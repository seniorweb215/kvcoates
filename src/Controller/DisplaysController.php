<?php

namespace App\Controller;

/**
 * Description of DisplaysController
 *
 * @author Rauxmedia
 */
use Displays\Controller\AppController as BaseController;

class DisplaysController extends BaseController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
