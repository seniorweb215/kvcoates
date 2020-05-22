<?php

namespace Statistics\Controller;

/**
 * Description of StatisticsController
 *
 * @author Rauxmedia
 */

use Statistics\Services\System as SystemStats;
use Statistics\Services\Campaign as CampaignStats;

class StatisticsController extends AppController {

    public function initialize() {
        parent::initialize();
        $this->loadModel("Statistics.Statistics");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = SystemStats::getGeneralStats();
    }

    public function dashboard() {
        $this->result["success"] = true;
        $this->result["data"] = SystemStats::getGeneralStats();
    }

    public function support() {
        $this->result["success"] = true;
        $this->result["data"] = SystemStats::getSupportStats();
    }


    public function campaign($cid) {
        $this->result["success"] = true;
        $this->result["data"] = ($cid == null) ? $this->Statistics->getCampaigns() : CampaignStats::getStats($cid);
    }

    public function raw($cid) {
        $this->result["success"] = true;
        $this->result["data"] = CampaignStats::getRawStats($cid);
    }
    
    
    public function data() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Statistics->getCampaigns();
    }

    public function discover() {
        set_time_limit(0);
        $this->result["success"] = true;
        $this->result["data"] = $this->Statistics->discoverDefaultCampaigns();
    }

    public function patch() {
        set_time_limit(0);
        $this->result["success"] = true;
        $this->result["data"] = $this->Statistics->patch();
    }

}
