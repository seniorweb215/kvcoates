<?php

namespace App\Controller;

/**
 * Description of DisplayIssuesController
 *
 * @author Rauxmedia
 */
use DisplayIssues\Controller\AppController as BaseController;

class DisplayIssuesController extends BaseController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
