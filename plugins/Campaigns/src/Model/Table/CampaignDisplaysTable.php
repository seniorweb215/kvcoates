<?php

namespace Campaigns\Model\Table;
use App\Model\Table\AppTable;
/**
 * Description of CampaignDisplaysTable
 *
 * @author Rauxmedia
 */
class CampaignDisplaysTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['Displays.Displays']
        ]);
    }
    
    public function addAll($campaign, $locationsString){
        $deploymentsTable = \Cake\ORM\TableRegistry::get("Displays.Deployments");
        $this->deleteAll(["campaign_id" => $campaign->id]);
        $locations = explode(",", $locationsString);
        foreach ($locations as $location) {
            $deployments = $deploymentsTable->findByLocationId($location)->contain(["Displays"])->all();
            $this->addIfCriteriaIsMet($campaign, $deployments);
        }
    }
    
    private function addIfCriteriaIsMet($campaign, $deployments){
        foreach($deployments as $deployment){
            if($campaign->orientation == $deployment->display->orientation && $campaign->brand_id == $deployment->display->brand_id){
                $this->add([
                    "campaign_id" => $campaign->id,
                    "display_id" => $deployment->display->id
                ]);
            }
        }
    }
}
