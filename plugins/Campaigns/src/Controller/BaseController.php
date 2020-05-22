<?php

namespace Campaigns\Controller;

/**
 * Description of BaseController
 *
 * @author Rauxmedia
 */
class BaseController extends IOController {

    public function all($default = 0) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Campaigns->index($default);
    }

    public function profile($id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Campaigns->profile($id);
    }
    public function preview($id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Campaigns->preview($id);
    }

    public function add() {
        if ($this->request->is('post')) {
            $feed = $this->Campaigns->add($this->request->data);
            if ($feed) {
                $this->result["success"] = true;
                $this->result["data"] = $feed;
            }
        }
    }

    public function update() {
        if ($this->request->is('post')) {
            $feed = $this->Campaigns->add($this->request->data);
            if ($feed) {
                $this->result["success"] = true;
                $this->result["data"] = $feed;
            }
        }
    }

    /*public function remove() {
        if ($this->request->is("post")) {
            $campaigns = $this->Campaigns->remove($this->request->data("id"));
            if ($campaigns) {
                $this->result["success"] = true;
                $this->result["data"] = $campaigns;
            }
        }
    }*/

  
    public function duplicate() {
        if ($this->request->is('post')) {
            $feed = $this->Campaigns->duplicate($this->request->data);
            if ($feed) {
                $this->result["success"] = true;
                $this->result["data"] = $feed;
            }
        }
    }

}
