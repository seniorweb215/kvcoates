<?php

namespace Campaigns\Controller;

/**
 * Description of CampaignsController
 *
 * @author Rauxmedia
 */
use Campaigns\Services\General;

class CampaignsController extends PublishingController {

    public function data() {
        $this->result["success"] = true;
        $this->result["data"] = General::data();
    }
    
    public function target(){
        $this->result["success"] = true;
        $this->result["data"] = General::target($this->request->data);
    }

    public function remove() {
        if ($this->request->is("post")) {
            $campaign = General::remove($this->request->data["id"]);
            if ($campaign) {
                $this->result["success"] = true;
                $this->result["data"] = $campaign;
            }
        }
    }
    public function stop() {
        if ($this->request->is("post")) {
            $campaign = General::stop($this->request->data["id"]);
            if ($campaign) {
                $this->result["success"] = true;
                $this->result["data"] = $campaign;
            }
        }
    }

    public function pushContent() {
        if ($this->request->is("post")) {
            $content = General::pushContent($this->request->data);
            if ($content) {
                $this->result["success"] = true;
                $this->result["data"] = $content;
            }
        }
    }

    public function popContent() {
        if ($this->request->is("post")) {
            $content = General::popContent($this->request->data);
            if ($content) {
                $this->result["success"] = true;
                $this->result["data"] = $content;
            }
        }
    }

    public function togglemotiondetection($id = null) {
        $this->result["success"] = true;
        $this->result["data"] = General::toggleFacialDetection($id);
    }

}
