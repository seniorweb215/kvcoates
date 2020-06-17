<?php

namespace System\Controller;

/**
 * Description of OwnersController
 *
 * @author Rauxmedia
 */
class OwnersController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Owners");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Owners->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->Owners->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $brand = $this->Owners->update($this->request->data["id"], $this->request->data);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $brand = $this->Owners->remove($this->request->data["id"]);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

}
