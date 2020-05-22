<?php

namespace System\Controller;

/**
 * Description of BrandsController
 *
 * @author Rauxmedia
 */
class BrandsController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Brands");
    }

    public function index() {
        print_r($this->Brands);exit();
        $this->result["success"] = true;
        $this->result["data"] = $this->Brands->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->Brands->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $brand = $this->Brands->update($this->request->data["id"], $this->request->data);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $brand = $this->Brands->remove($this->request->data["id"]);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

}
