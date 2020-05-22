<?php

namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of CampaignsTable
 *
 * @author Rauxmedia
 */
class CampaignsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['System.Countries', 'System.Brands', 'Clients.Organisations', "Displays.Resolutions"],
            'hasMany' => ['Campaigns.Contents', 'Campaigns.CampaignLocations', 'Campaigns.Mappings', 'Campaigns.CampaignDisplays']
        ]);
    }

    public function index($default) {
        $query = $this->find();
        $query->where(["set_as_default" => $default, "status !=" => 3]);
        $query->order(['Campaigns.created' => 'DESC']);
        $query->contain(["Countries.MobileCarriers", "Brands", "Resolutions", "Contents", "CampaignLocations.Locations.Deployments.Displays", "Mappings"]);
        return $query;
    }
    
    public function profile($id) {
        $query = $this->findById($id);
        $query->contain(["Brands", "Organisations", "Resolutions", "Contents.Media", "CampaignLocations.Locations.Deployments.Displays", "CampaignLocations.Locations.Countries.MobileCarriers", "Mappings",  "CampaignDisplays.Displays"]);
        return $query->first();
    }
    
    public function preview($id) {
        $query = $this->findById($id);
        $query->contain(["Contents.Media"]);
        return $query->first();
    }

    public function add($data = array()) {
        $campaign = parent::add($data);
        if ($campaign) {
            $campaignLocationsTable = \Cake\ORM\TableRegistry::get("Campaigns.CampaignLocations");
            $campaignDisplaysTable = \Cake\ORM\TableRegistry::get("Campaigns.CampaignDisplays");
            $campaignLocationsTable->addAll($campaign->id, $data["locations"]);
            $campaignDisplaysTable->addAll($campaign, $data["locations"]);
        }
        return $campaign;
    }

    public function duplicate($data = array()) {
        $toDuplicate = $data["id"];
        unset($data["id"]);
        unset($data["contents"]);
        unset($data["campaign_locations"]);
        $campaign = parent::add($data);
        if ($campaign) {
            //$campaignLocationsTable = \Cake\ORM\TableRegistry::get("Campaigns.CampaignLocations");
            $contentsTable = \Cake\ORM\TableRegistry::get("Campaigns.Contents");
            //$campaignLocationsTable->duplicate($toDuplicate, $campaign->id);
            $contentsTable->duplicate($toDuplicate, $campaign->id);
        }
        return $campaign;
    }
    
    public function remove($id) {
        if (parent::remove($id)) {
            $contentsTable = \Cake\ORM\TableRegistry::get("Campaigns.Contents");
            $campaignLocationsTable = \Cake\ORM\TableRegistry::get("Campaigns.CampaignLocations");
            $scheduledPlaybacksTable = \Cake\ORM\TableRegistry::get("Campaigns.ScheduledPlaybacks");
            $contentsTable->removeAllByCampaignId($id);
            $campaignLocationsTable->removeAllByCampaignId($id);
            $scheduledPlaybacksTable->removeAllByCampaignId($id);
            return true;
        } else {
            return false;
        }
    }

    public function createDefaultIfNotFound($name, $tag) {
        $campaign = $this->findByName($name)->first();
        if (!$campaign) {
            $data = array();
            $data["name"] = $name;
            $data["status"] = 1;
            $data["orientation"] = "Landscape";
            $data["resolution_id"] = 0;
            $data["type_id"] = 2;
            $data["country_id"] = 0;
            $data["brand_id"] = 1;
            $data["organisation_id"] = 1;
            $data["set_as_default"] = true;
            $data["has_facial_detection"] = false;
            $data["has_facial_analytics"] = false;
            $data["start"] = date("Y-m-d H:i:s");
            $data["end"] = date("Y-m-d H:i:s");
            $campaign = $this->save($this->newEntity($data));
        }
        return $campaign;
    }

}
