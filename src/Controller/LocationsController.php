<?php

namespace App\Controller;

/**
 * Description of LocationsController
 *
 * @author Rauxmedia
 */
class LocationsController extends \Clients\Controller\LocationsController {

    public function beforeRender(\Cake\Event\Event $event) {
        parent::beforeRender($event);
    }
}
