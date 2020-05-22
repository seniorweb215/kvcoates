<?php
namespace App\Controller;

/**
 * Description of BlacklistedClients
 *
 * @author Rauxmedia
 */
class BlacklistedClientsController extends \System\Controller\BlacklistedClientsController {
    
    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
