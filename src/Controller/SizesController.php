<?php

namespace App\Controller;

/**
 * Description of SizesController
 *
 * @author Yaroslav
 */
class SizesController extends \System\Controller\SizesController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
