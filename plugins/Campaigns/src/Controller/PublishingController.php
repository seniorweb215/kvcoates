<?php
namespace Campaigns\Controller;

/**
 * Description of PublishingController
 *
 * @author Rauxmedia
 */
use Campaigns\Services\Publishing;

class PublishingController extends BaseController{

    public function preflight($id) {
        $this->result["success"] = true;
        $this->result["data"] = Publishing::preflight($id);
    }
    
    public function preflightOnDisplay($campaignId, $displayId) {
        $this->result["success"] = true;
        $this->result["data"] = Publishing::preflightOnDisplay($campaignId, $displayId);
    }
    
    public function publish() {
        set_time_limit(0);
        if ($this->request->is("post")) {
            $this->result = Publishing::publish($this->request->data);
        }
    }
    
    public function attachDisplay() {
        if ($this->request->is("post")) {
            $this->result = Publishing::attachDisplay($this->request->data);
        }
    }

}
