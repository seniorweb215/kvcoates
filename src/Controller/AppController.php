<?php

namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;

class AppController extends Controller {

    protected $result;

    public function initialize() {
        parent::initialize();
        $this->loadComponent('RequestHandler');
        $this->loadComponent('Flash');
        
    }

    /**
     * Before render callback.
     *
     * @param \Cake\Event\Event $event The beforeRender event.
     * @return void
     */
    public function beforeRender(Event $event) {
        if (!array_key_exists('frontend', $this->viewVars)) {
            $this->json();
        }
    }

    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);
        $this->result = array("success" => false);
    }

    protected function json() {
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Headers: Cache-Control, X-Requested-With");
        header("Content-type: application/json; charset=UTF-8");
        echo json_encode((array) $this->result, JSON_PRETTY_PRINT);
        exit;
    }

}
