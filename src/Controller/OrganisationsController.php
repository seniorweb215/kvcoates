<?php

namespace App\Controller;

/**
 * Description of OrganisationsController
 *
 * @author Rauxmedia
 */
class OrganisationsController extends \Clients\Controller\OrganisationsController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
