<?php

namespace Notifications\Controller;

/**
 * Description of NotificationsController
 *
 * @author Rauxmedia
 */

use App\Controller\AppController as BaseController;

class NotificationsController extends BaseController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

    public function test($displayId) {
        $this->loadModel("Displays.Displays");
        $display = $this->Displays->findById($displayId)->first();
        if ($display) {
            $this->result["success"] = true;
            $this->result["data"] = \App\Model\Messaging\FirebaseCloudMessaging::push($display->token, "Test Title", "Test Body", array("a" => 0, "b" => 0));
        }
    }

    public function push() {
        if ($this->request->is("post")) {
            $result = $this->Notifications->push($this->request->data);
            if($result){
                $this->result["success"] = true;
            }else{
                $this->result["data"] = "Device either not found or without a valid token";
            }
        }
    }

}
