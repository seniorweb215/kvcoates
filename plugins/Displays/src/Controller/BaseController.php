<?php

namespace Displays\Controller;

/**
 * Description of BaseController
 *
 * @author Rauxmedia
 */

use Displays\Services\General;

class BaseController extends IOController {

    public function all() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Displays->all();
    }



    public function profile($id = null) {
        $profile = $this->Displays->profile($id);
        if ($profile) {
            $this->result["success"] = true;
            $this->result["data"] = $profile;
        }
    }

    public function formdata() {
        $this->result["success"] = true;
        $this->result["data"] = General::getFormData();
    }

    public function add() {
        if ($this->request->is("post")) {
            $display = $this->Displays->add($this->request->data);
            if ($display) {
                $this->result["success"] = true;
                $this->result["data"] = $display;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            
            $display = $this->Displays->update($this->request->data["id"], $this->request->data);
            
            if ($display) {
                $this->result["success"] = true;
                $this->result["data"] = $display;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $display = $this->Displays->remove($this->request->data("id"));
            if ($display) {
                $this->result["success"] = true;
                $this->result["data"] = $display;
            }
        }
    }

}
