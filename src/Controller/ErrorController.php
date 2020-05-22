<?php

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

/**
 * Description of ErrorController
 *
 * @author Rauxmedia
 */
class ErrorController extends Controller {

    public function beforeRender(Event $event) {
        parent::beforeRender($event);
        $this->loadModel("Clients.OrganisationsSettings");
        $settings = $this->OrganisationsSettings->find()->first();
        $this->set("title", $settings->title);
        $this->viewBuilder()->layout('error');
    }

}
