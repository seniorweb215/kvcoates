<?php

namespace App\Controller;

/**
 * Description of MessagesController
 *
 * @author Rauxmedia
 */
use Notifications\Controller\AppController as BaseController;

class NotificationsController extends BaseController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
