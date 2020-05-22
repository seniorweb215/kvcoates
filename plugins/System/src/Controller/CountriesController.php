<?php

namespace System\Controller;

/**
 * Description of CountriesController
 *
 * @author Rauxmedia
 */
class CountriesController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Countries");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Countries->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $country = $this->Countries->add($this->request->data);
            if ($country) {
                $this->result["success"] = true;
                $this->result["data"] = $country;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $country = $this->Countries->remove($this->request->data("id"));
            if ($country) {
                $this->result["success"] = true;
                $this->result["data"] = $country;
            }
        }
    }

    public function addmobilecarrier() {
        if ($this->request->is("post")) {
            $mobileCarrier = $this->Countries->addMobileCarrier($this->request->data);
            if ($mobileCarrier) {
                $this->result["success"] = true;
                $this->result["data"] = $mobileCarrier;
            }
        }
    }

    public function updatemobilecarrier() {
        if ($this->request->is("post")) {
            $mobileCarrier = $this->Countries->updateMobileCarrier($this->request->data);
            if ($mobileCarrier) {
                $this->result["success"] = true;
                $this->result["data"] = $mobileCarrier;
            }
        }
    }

    public function removemobilecarrier() {
        if ($this->request->is("post")) {
            $mobileCarrier = $this->Countries->removeMobileCarrier($this->request->data);
            if ($mobileCarrier) {
                $this->result["success"] = true;
                $this->result["data"] = $mobileCarrier;
            }
        }
    }

}
