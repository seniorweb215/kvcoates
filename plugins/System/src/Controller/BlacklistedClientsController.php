<?php

namespace System\Controller;

/**
 * Description of BlacklistedClientsController
 *
 * @author Rauxmedia
 */
class BlacklistedClientsController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.BlacklistedClients");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->BlacklistedClients->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->BlacklistedClients->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $brand = $this->BlacklistedClients->remove($this->request->data["id"]);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

}
