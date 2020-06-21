<?php

namespace App\Controller;

/**
 * Description of UsersController
 *
 * @author Rauxmedia
 */
class UsersController extends AppController {

    
    public function initialize() {
        parent::initialize();
        $this->loadModel("Clients.Users");
    }

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Users->all();
    }
    
    public function locations() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Users->locations();
    }

    public function add() {
        if ($this->request->is("post")) {
            $user = $this->Users->add($this->request->data);
            if ($user) {
                $this->result["success"] = true;
                $this->result["data"] = $user;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $data = $this->request->data;
            $data['location'] = '{}';
            $user = $this->Users->update($this->request->data("id"), $data);
            if ($user) {
                $this->result["success"] = true;
                $this->result["data"] = $user;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $user = $this->Users->remove($this->request->data("id"));
            if ($user) {
                $this->result["success"] = true;
                $this->result["data"] = $user;
            }
        }
    }

    public function login() {
        if ($this->request->is("post")) {
            $user = $this->Users->sso($this->request);
            if ($user) {
                $this->result["success"] = true;
                $this->result["data"] = $user;
            }
        }
    }

}
