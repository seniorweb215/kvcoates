<?php

namespace System\Controller;

/**
 * Description of BandsController
 *
 * @author Yaroslav
 */
class BandsController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Bands");
    }

    public function index() {
        print_r($this->Bands);exit();
        $this->result["success"] = true;
        $this->result["data"] = $this->Bands->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->Bands->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $band = $this->Bands->update($this->request->data["id"], $this->request->data);
            if ($band) {
                $this->result["success"] = true;
                $this->result["data"] = $band;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $band = $this->Bands->remove($this->request->data["id"]);
            if ($band) {
                $this->result["success"] = true;
                $this->result["data"] = $band;
            }
        }
    }

}
