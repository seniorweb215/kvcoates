<?php

namespace Statistics\Services;
use \Cake\ORM\TableRegistry;
/**
 * Description of Statistics
 *
 * @author Rauxmedia
 */
class Statistics {

    public static function getEventsHistogram($key, $cid, $displayId = null) {
        $statistics = TableRegistry::get("Statistics.Statistics");
        $query = $statistics->find();
        $query->select(["tag", "count" => $query->func()->count('tag')])
                ->group("tag")
                ->where(["campaign_id" => $cid])
                ->andWhere(['tag LIKE' => '%' . $key . '%']);

        if ($displayId != null) {
            $query->andWhere(["display_id" => $displayId]);
        }
        $histogram = $query->all();
        return $histogram;
    }

    public static function getInteractionHistogram($cid, $displayId = null) {
        $statistics = TableRegistry::get("Statistics.Statistics");
        $query = $statistics->find();
        $time = $query->func()->date_format([
            'log_date' => 'identifier',
            "'%Y-%m-%d %H:00'" => 'literal'
        ]);
        $query->select(["log_date" => $time, "count" => $query->func()->count('log_date')])
                ->group("hour(log_date), day(log_date), month(log_date)")
                ->where(["campaign_id" => $cid])
                ->orderAsc("log_date");

        if ($displayId != null) {
            $query->andWhere(["display_id" => $displayId]);
        }
        $histogram = $query->all();
        return $histogram;
    }

    public static function getCampaignOrderedHistogram($cid, $displayId = null) {
        $statistics = TableRegistry::get("Statistics.Statistics");
        $query = $statistics->find();
        $query->select(["tag", "count" => $query->func()->count('tag')])
                ->group("tag")
                ->where(["campaign_id" => $cid]);
        //->orderDesc("COUNT(*)");

        if ($displayId != null) {
            $query->andWhere(["display_id" => $displayId]);
        }
        $histogram = $query->all();
        return $histogram;
    }

    public static function getDevicesHistogram($cid) {
        $statistics = TableRegistry::get("Statistics.Statistics");
        $displays = TableRegistry::get("Displays.Displays");
        $query = $statistics->find();
        $query->select(["display_id", "count" => $query->func()->count('display_id')])
                ->group("display_id")
                ->where(["campaign_id" => $cid])
                ->orderDesc("COUNT(*)");
        
        $histogram = $query->all();
        foreach ($histogram as $bin) {
            $q = $displays->findById($bin->display_id);
            $display = $q->contain(["Deployments.Locations"])->first();
            $bin->name = $display->name;
            $bin->location = $display->deployment->location->name;
            unset($bin->display_id);
        }
        return $histogram;
    }

    public static function getDwellTime($campaign) {
        $statistics = TableRegistry::get("Statistics.Statistics");
        $query = $statistics->find();
        $dwellTime = $query->select(["interaction_time" => $query->func()->avg("interaction_time")])
                ->where(["campaign_id" => $campaign->id])
                ->first();
        return $dwellTime->interaction_time;
    }

    public static function getFacialAnalytics($cid, $displayId = null) {
        return FacialAnalytics::getStats($cid, $displayId);
    }

}
