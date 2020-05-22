<?php
namespace App\Controller;

/**
 * Description of ManufacturersController
 *
 * @author Rauxmedia
 */

use Manufacturers\Controller\AppController as BaseController;

class ManufacturersController extends BaseController {
    
    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
