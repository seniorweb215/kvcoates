<?php

namespace Campaigns\Services;

use \Cake\ORM\TableRegistry;

/**
 * Description of Publishing
 *
 * @author Rauxmedia
 */
class Publishing {

    public static function preflight($id) {
        $campaignsTable = TableRegistry::get("Campaigns.Campaigns");
        $query = $campaignsTable->findById($id);
        $query->contain(["CampaignDisplays.Displays"]);
        $campaign = $query->first();
        $results = array();
        foreach ($campaign->campaign_displays as $campaign_display) {
            $display = $campaign_display->display;
            $data["display"] = $display;
            $data["display"]['preflight'] = self::preflightCampaignOnDisplay($campaign, $display);
            array_push($results, $display);
        }
        return $results;
    }

    public static function preflightOnDisplay($campaignId, $displayId) {
        $displaysTable = TableRegistry::get("Displays.Displays");
        $campaignsTable = TableRegistry::get("Campaigns.Campaigns");
        $campaign = $campaignsTable->findById($campaignId)->first();
        $display = $displaysTable->findById($displayId)->first();
        $results = array();
        $preflight = self::preflightCampaignOnDisplay($campaign, $display);
        $results["display"] = $display;
        $results["display"]['preflight'] = $preflight;
        return array("success" => $preflight["success"], "data" => $results);
    }

    public static function attachDisplay($data) {
        $campaignsTable = TableRegistry::get("Campaigns.Campaigns");
        $campaignDisplaysTable = TableRegistry::get("Campaigns.CampaignDisplays");
        $scheduledPlaybacksTable = TableRegistry::get("Campaigns.ScheduledPlaybacks");
        $campaign = $campaignsTable->findById($data["cid"])->first();
        $preflight = self::preflightOnDisplay($data["cid"], $data["did"]);
        if (self::checkOverrides($data["overrides"], $preflight)) {
            $campaignDisplaysTable->add(["campaign_id" => $campaign->id, "display_id" => $data["did"]]);
            $scheduledPlaybacksTable->add(["campaign_id" => $campaign->id, "display_id" => $data["did"], "start" => $campaign->start, "end" => $campaign->end, "status" => $campaign->status]);
            return array("success" => true, "data" => $campaign);
        } else {
            return $preflight;
        }
    }

    public static function publish($data) {
        $campaignsTable = TableRegistry::get("Campaigns.Campaigns");
        $query = $campaignsTable->findById($data["id"]);
        $query->contain(["CampaignDisplays.Displays"]);
        $campaign = $query->first();
        $preflight = self::preflightCampaign($campaign);
        if (self::checkOverrides($data["overrides"], $preflight)) {
            self::publishCampaign($campaign);
            IO::zip($campaign->id);
            return array("success" => true, "data" => $campaign);
        } else {
            return $preflight;
        }
    }

    private static function publishCampaign($campaign) {
        $campaignsTable = TableRegistry::get("Campaigns.Campaigns");
        $scheduledPlaybacksTable = TableRegistry::get("Campaigns.ScheduledPlaybacks");
        $results = array();
        foreach ($campaign->campaign_displays as $campaign_display) {
            $display = $campaign_display->display;
            if ($display->brand_id == $campaign->brand_id && $display->orientation == $campaign->orientation) {
                $data = ["campaign_id" => $campaign->id, "display_id" => $display->id, "start" => $campaign->start, "end" => $campaign->end, "status" => 1];
                array_push($results, $scheduledPlaybacksTable->add($data));
            }
        }
        $campaign->status = 1;
        $campaign->publishedTo = $results;
        $campaignsTable->save($campaign);
        return $campaign;
    }

    private static function preflightCampaign($campaign) {
        $success = true;
        $results = array();
        foreach ($campaign->campaign_displays as $campaign_display) {
            $display = $campaign_display->display;
            if ($display->brand_id == $campaign->brand_id && $display->orientation == $campaign->orientation) {
                $preflight = self::preflightCampaignOnDisplay($campaign, $display);
                $data["display"] = $display;
                $data["display"]['preflight'] = $preflight;
                array_push($results, $display);
                if ($success && !$preflight["success"]) {
                    $success = false;
                }
            }
        }
        $response = array("success" => $success, "data" => $results);
        return $response;
    }

    private static function preflightCampaignOnDisplay($campaign, $display) {
        $scheduledPlaybacksTable = TableRegistry::get("Campaigns.ScheduledPlaybacks");
        $preflight = array();
        $preflight["overlaps"] = $scheduledPlaybacksTable->overlaps($display->id, $campaign);
        //$preflight["brand"] = ($campaign->brand_id == $display->brand_id);
        //$preflight["resolution"] = ($campaign->resolution_id == $display->resolution_id);

        $success = (/* $preflight["brand"] && $preflight["resolution"] && */ count($preflight["overlaps"]) == 0) ? true : false;
        $response = array("success" => $success, "preflight" => $preflight);
        return $response;
    }

    private static function checkOverrides($overrides, $preflight) {
        if ($preflight["success"]) {
            return true;
        } else {
            $displays = $preflight["data"];
            $result = false;
            foreach ($displays as $display) {
                $results = $display["prelight"]["preflight"];
                if (!$results["resolution"] && empty($results["overlaps"]) && $overrides["resolution"]) {
                    $result = true;
                } else {
                    $result = false;
                }
            }
            return $result;
        }
    }

}
