<?php
namespace Manufacturers\Controller;

/**
 * Description of ManufacturersController
 *
 * @author Rauxmedia
 */

use App\Controller\AppController as BaseController;

class ManufacturersController extends BaseController{
    public function formdata(){
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayManufacturers->formdata();
    }
    
    public function all() {
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayManufacturers->all();
    }
    
    public function add() {
        if ($this->request->is("post")) {
            $manufacturer = $this->DisplayManufacturers->add($this->request->data);
            if ($manufacturer) {
                $this->result["success"] = true;
                $this->result["data"] = $manufacturer;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $manufacturer = $this->DisplayManufacturers->remove($this->request->data("id"));
            if ($manufacturer) {
                $this->result["success"] = true;
                $this->result["data"] = $manufacturer;
            }
        }
    }
}
