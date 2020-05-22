<?php

namespace App\Controller;

/**
 * Description of CountriesController
 *
 * @author Rauxmedia
 */
class CountriesController extends \System\Controller\CountriesController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

}
