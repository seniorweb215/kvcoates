<?php

namespace App\Controller;

/**
 * Description of MappingsController
 *
 * @author Rauxmedia
 */
class MappingsController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("Campaigns.Mappings");
    }

    public function campaign($cid) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Mappings->campaign($cid);
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->Mappings->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $brand = $this->Mappings->remove($this->request->data["id"]);
            if ($brand) {
                $this->result["success"] = true;
                $this->result["data"] = $brand;
            }
        }
    }

}
