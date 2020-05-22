<?php

namespace Statistics\Model\Table;

use App\Model\Table\AppTable;
use Statistics\Services\Statistics as StatisticsService;

/**
 * Description of StatisticsTable
 *
 * @author Rauxmedia
 */
class StatisticsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function getCampaigns() {
        return \Cake\ORM\TableRegistry::get("Campaigns")->find()->select(["id", "name", "status", "type_id", "start", "end"])->all();
    }

    
    /*
     * TODO!!!
     */
    public function getStatsReport($campaign) {
        $data = array();
        $displays = array();
        $data["general"] = StatisticsService::getCampaignOrderedHistogram($campaign->id);//:getCampaignOrderedStats($campaign->id);
        foreach ($campaign->campaign_locations as $campaign_location) {
            $location = $campaign_location->location;
            foreach ($location->deployments as $deployment) {
                $display = $deployment->display;
                $display->stats = StatisticsService::getCampaignOrderedHistogram($campaign->id, $display->id);
                array_push($displays, $display);
            }
        }
        $data["displays"] = $displays;
        return $data;
    }

    public function discoverDefaultCampaigns() {
        $query = $this->find();
        $query->select(["display_id", "tag", "count" => $query->func()->count('display_id')])
                ->group("display_id")
                ->where(["campaign_id" => 2147483647]);

        $histogram = $query->all();
        $displaysTable = \Cake\ORM\TableRegistry::get("Displays");
        $campaignsTable = \Cake\ORM\TableRegistry::get("Campaigns");
        $campaignsLocationsTable = \Cake\ORM\TableRegistry::get("CampaignLocations");
        $scheduledPlaybacksTable = \Cake\ORM\TableRegistry::get("ScheduledPlaybacks");
        foreach ($histogram as $bin) {
            $q = $displaysTable->findById($bin->display_id);
            $display = $q->contain(["Deployments.Locations.Organisations"])->first();
            $location = $display->deployment->location;
            $organisation = $location->organisation;

            $campaign = $campaignsTable->createDefaultIfNotFound(sprintf("%s Default Campaign", $organisation->name), $bin->tag);
            $campaignsLocationsTable->createIfNotFound($campaign->id, $location->id);
            $scheduledPlaybacksTable->scheduleIfNotFound($display->id, $campaign);
        }
        return $histogram;
    }

    public function patch() {
        $scheduledPlaybacksTable = \Cake\ORM\TableRegistry::get("ScheduledPlaybacks");
        $query = $scheduledPlaybacksTable->find();
        $query->innerJoinWith('Campaigns', function ($q) {
            return $q->where(['Campaigns.set_as_default' => 1]);
        });
        $playbacks = $query->all();
        $connection = \Cake\Datasource\ConnectionManager::get("default");
        $queries = array();
        foreach ($playbacks as $playback) {
            $sql = sprintf("UPDATE statistics SET campaign_id = %d WHERE campaign_id = %d AND display_id = %d"
                    , $playback->campaign_id
                    , 2147483647
                    , $playback->display_id);
            $connection->execute($sql);
            //array_push($queries, $sql);
        }
        return $queries;
    }

}
