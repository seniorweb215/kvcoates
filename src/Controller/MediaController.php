<?php
namespace App\Controller;

/**
 * Description of MediaController
 *
 * @author Rauxmedia
 */
class MediaController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("Campaigns.Media");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Media->all();
    }

    public function me($organisation_id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->Media->findByOrganisationId($organisation_id)->all();
    }

    public function upload() {
        if ($this->request->is("post")) {
            $response = $this->Media->upload($this->request->data);
            if ($response) {
                $this->result["success"] = true;
                $this->result["data"] = $response;
            } else {
                $this->result["data"] = $this->request->data;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $media = $this->Media->remove($this->request->data["id"]);
            if ($media) {
                $this->result["success"] = true;
                $this->result["data"] = $media;
            }
        }
    }

}
