<?php

namespace App\Controller;

/**
 * Description of BrandsController
 *
 * @author Rauxmedia
 */
class BrandsController extends \System\Controller\BrandsController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
