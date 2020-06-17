<?php

namespace System\Controller;

/**
 * Description of SizesController
 *
 * @author Yaroslav
 */
class SizesController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Sizes");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Sizes->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->Sizes->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $brand = $this->Sizes->update($this->request->data["id"], $this->request->data);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $brand = $this->Sizes->remove($this->request->data["id"]);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

}
