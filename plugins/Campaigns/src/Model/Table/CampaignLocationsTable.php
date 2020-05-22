<?php

namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of CampaignLocationsTable
 *
 * @author Rauxmedia
 */
class CampaignLocationsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['Clients.Locations']
        ]);
    }
    
    public function duplicate($source_cid, $target_cid){
        $clocations = $this->findByCampaignId($source_cid)->all();
        foreach($clocations as $clocation){
            $this->add(["campaign_id" => $target_cid, "location_id" => $clocation->location_id]);
        }
        
    }
    
    
    

    public function addAll($campaign_id, $locationsString) {
        $locations = explode(",", $locationsString);
        $this->deleteAll(["campaign_id" => $campaign_id]);
        foreach ($locations as $location) {
            $this->add(array("campaign_id" => $campaign_id, "location_id" => $location));
        }
    }

    public function removeAllByCampaignId($id) {
        $campaignLocations = $this->findByCampaignId($id)->all();
        foreach ($campaignLocations as $campaignLocation) {
            $this->remove($campaignLocation->id);
        }
    }
    
    
    
    public function createIfNotFound($campaign_id, $location_id){
        $ent = $this->find()->where(["campaign_id" => $campaign_id, "location_id" => $location_id])->first();
        if(!$ent){
            $ent = $this->add(array("campaign_id" => $campaign_id, "location_id" => $location_id));
        }
        return $ent;
    }

}
