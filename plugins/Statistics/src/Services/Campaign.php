<?php

namespace Statistics\Services;

use \Cake\ORM\TableRegistry;

/**
 * Description of Campaign
 *
 * @author Rauxmedia
 */
class Campaign {

    public static function getRawStats($id) {
        $statistics = TableRegistry::get("Statistics.Statistics");
        return $statistics->findByCampaignId($id)->orderDesc("log_date")->all();
    }

    public static function getStats($id) {
        $campaign = TableRegistry::get("Campaigns.Campaigns")->profile($id);
        $stats = [
            "mappings" => TableRegistry::get("Campaigns.Mappings")->findByCampaignId($id)->all(),
            "overall" => self::getOverallStats($campaign),
            "insights" => self::getInsights($campaign)
        ];
        return $stats;
    }

    private static function getOverallStats($campaign) {
        $data = array();
        switch ($campaign->type_id) {
            case 1: // video
                $data = Video::getOverall($campaign);
                break;
            case 2: // LnL
                $data = LiftNLearn::getOverall($campaign);
                break;
            case 3: // touch
                $data = Touch::getOverall($campaign);
                break;
        }
        $data["interaction"] = Statistics::getInteractionHistogram($campaign->id);
        if ($campaign->has_facial_analytics) {
            $data["facial_analitycs"] = Statistics::getFacialAnalytics($campaign->id);
        }
        return $data;
    }

    private static function getInsights($campaign) {
        $displays = array();
        foreach ($campaign->campaign_locations as $campaign_location) {
            $location = $campaign_location->location;
            if ($location->deployments != null) {
                foreach ($location->deployments as $deployment) {
                    $display = new \stdClass();
                    $display->id = $deployment->display->id;
                    $display->identifier = $deployment->display->identifier;
                    $display->name = $deployment->display->name;
                    $display->stats = Statistics::getCampaignOrderedHistogram($campaign->id, $display->id);
                    $display->interaction = Statistics::getInteractionHistogram($campaign->id, $display->id);
                    if ($campaign->has_facial_analytics) {
                        $display->facial_analitycs = Statistics::getFacialAnalytics($campaign->id, $display->id);
                    }
                    array_push($displays, $display);
                }
            }
        }
        return $displays;
    }

}
