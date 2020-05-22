<?php

namespace Clients\Controller;

/**
 * Description of LocationsController
 *
 * @author Rauxmedia
 */
class LocationsController extends AppController {

    public function initialize() {
        parent::initialize();
        $this->loadModel("Clients.Locations");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->index();
    }

    public function dashboard() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->dashboard();
    }

    public function countries() {
        $this->loadModel("System.Countries");
        $this->result["success"] = true;
        $this->result["data"] = $this->Countries->all();
    }

    public function owners() {
        $this->loadModel("System.Owners");
        $this->result["success"] = true;
        $this->result["data"] = $this->Owners->all();
    }

    public function sizes() {
        $this->loadModel("System.Sizes");
        $this->result["success"] = true;
        $this->result["data"] = $this->Sizes->all();
    }

    public function attach() {

    }

    public function profile($id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->profile($id);
    }

    public function findbyorganisation($id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->findByOrganisationId($id);
    }

    public function byorgandbrand($org_id, $brand_id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->getByOrgAndBrand($org_id, $brand_id);
    }

    public function byorganisations($orgs, $cid) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->getByOrganisationsAndCountry($orgs, $cid);
    }

    public function add() {
        if ($this->request->is("post")) {
            $location = $this->Locations->add($this->request->data);
            // print_r($location);exit();
            if ($location) {
                $this->result["success"] = true;
                $this->result["data"] = $location;
            }
        }
    }

    public function attachUpload() {
        if ($this->request->is("post")) {
            $this->loadModel("Clients.LocationAttachments");
            $attachment = $this->LocationAttachments->upload($this->request->data);
            if ($attachment) {
                $this->result["success"] = true;
                $this->result["data"] = $attachment;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $location = $this->Locations->remove($this->request->data["id"]);
            if ($location) {
                $this->result["success"] = true;
                $this->result["data"] = $location;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $location = $this->Locations->update($this->request->data["id"], $this->request->data);
            if ($location) {
                $this->result["success"] = true;
                $this->result["data"] = $location;
            }
        }
    }

    public function geocode() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->geoCodeAll();
    }

    public function import() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Locations->import();
    }

    public function export() {
        $this->autoRender = false;
        $result = $this->Locations->export();
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }

}
