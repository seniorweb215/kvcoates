<?php
namespace Statistics\Services;
use \Cake\ORM\TableRegistry;
/**
 * Description of System
 *
 * @author Rauxmedia
 */

class System {
    
    public static function getGeneralStats() {
        $issuesTable = TableRegistry::get("DisplayIssues.DisplayIssues");
        $mediaTable = TableRegistry::get("Campaigns.Media");
        $campaignsTable = TableRegistry::get("Campaigns.Campaigns");
        $locationsTable = TableRegistry::get("Clients.Locations");
        $data = array(
            "displays" => self::getDisplaysStats(),
            "videos" => $mediaTable->find()->where(["1"])->count(),
            "tickets" => $issuesTable->find()->count(),
            "campaigns" => $campaignsTable->all()->count(),
            "locations" => $locationsTable->all()->count());
        return $data;
    }
    
    public static function getSupportStats() {
        $issuesTable = \Cake\ORM\TableRegistry::get("DisplayIssues.DisplayIssues");
        $data = array(
            "displays" => self::getDisplaysStats(),
            "fixed" => $issuesTable->find('fixed')->count(),
            "outstanding" => $issuesTable->find('outstanding')->count(),
            "closed" => $issuesTable->find('closed')->count());
        return $data;
    }
    
    private static function getDisplaysStats(){
        $displaysTable = TableRegistry::get("Displays.Displays");
        $displays = array(
            "total" => $displaysTable->all()->count(),
            "online" => $displaysTable->find("online", ["heartbeat" => 24])->all()->count(),
            "offline" => $displaysTable->find("offline", ["heartbeat" => 24])->all()->count(),
            "pending" => $displaysTable->find("pending")->all()->count(),
            "independent" => $displaysTable->find("independent")->all()->count()
        );
        return $displays;
    }
}
