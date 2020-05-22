<?php

namespace App\Controller;

/**
 * Description of SupportController
 *
 * @author Rauxmedia
 */

use Displays\Services\General as DisplaysService;
use Statistics\Services\System as SystemStats;

class SupportController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("DisplayIssues.DisplayIssues");
    }

    public function signin() {
        $this->loadModel("Clients.Users");
        if ($this->request->is("post")) {
            $user = $this->Users->signin($this->request);
            if ($user) {
                $this->result["success"] = true;
                unset($user["id"]);
                $this->result["data"] = $user;
            }
        }
    }
    
    public function myLocation() {
        $this->loadModel("Clients.Users");
        if ($this->request->is("post")) {
            if ($this->Users->myLocation($this->request)) {
                $this->result["success"] = true;
            }
        }
    }
    
    
    public function dashboard(){
        $this->result["success"] = true;
        $this->result["data"] = SystemStats::getSupportStats();
    }
    

    public function tickets($identifier = null) {
        if ($this->request->is("get")) {
            $this->result["success"] = true;
            $this->result["data"] = ($identifier == null) ? $this->DisplayIssues->data() : $this->DisplayIssues->me($identifier);
        } else if ($this->request->is("post") && !isset($this->request->data["ticket_id"])) {
            $this->result["success"] = $this->DisplayIssues->open($this->request->data);
        } else if ($this->request->is("post")) {
            $this->result["success"] = $this->DisplayIssues->modify($this->request->data);
        }
    }

    public function displays($identifier = null) {
        $this->loadModel("Displays.Displays");
        if ($this->request->is("get")) {
            $this->result["success"] = true;
            $this->result["data"] = ($identifier == null) ? DisplaysService::data() : $this->Displays->getBasicProfile($identifier);
        } else if ($this->request->is("post") && !isset($this->request->data["identifier"])) {
            $this->result["success"] = DisplaysService::install($this->request->data);
        } else if ($this->request->is("post")) {
            $this->result["success"] = $this->Displays->modify($this->request->data);
        }
    }
    
    public function locations() {
        $this->loadModel("Clients.Locations");
        if ($this->request->is("get")) {
            $this->result["success"] = true;
            $this->result["data"] = $this->Locations->data();
        } else if ($this->request->is("post") && !isset($this->request->data["location_id"])) {
            $this->result["success"] = $this->Locations->addNew($this->request->data);
        } else if ($this->request->is("post")) {
            //$this->result["success"] = $this->Locations->modify($this->request->data);
        }
    }

}
