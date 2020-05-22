<?php
namespace Displays\Controller;

/**
 * Description of ApplicationController
 *
 * @author Rauxmedia
 */
use Displays\Services\ClientApplication;

class ClientApplicationController extends ContentController{
    
    public function register() {
        if ($this->request->is("post")) {
            $display = ClientApplication::register($this->request->data);
            if ($display) {
                $this->result["success"] = true;
                $this->result["data"] = $display;
            }
        }
    }
    
    public function me() {
        if ($this->request->is("post")) {
            $me = ClientApplication::me($this->request);
            if ($me) {
                $this->result["success"] = true;
                $this->result["data"] = $me;
            }
        }
    }

    public function token() {
        if ($this->request->is("post")) {
            $display = ClientApplication::token($this->request->data);
            if ($display) {
                $this->result["success"] = true;
            }
        }
    }
    
    public function connectivity() {
        if ($this->request->is("post")) {
            $display = ClientApplication::connectivity($this->request->data);
            if ($display) {
                $this->result["success"] = true;
            }
        }
    }

    public function vr() {
        if ($this->request->is("post")) {
            $me = ClientApplication::vr($this->request);
            if ($me) {
                $this->result["success"] = true;
                $this->result["data"] = $me;
            }
        }
    }
}
