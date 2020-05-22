<?php

namespace Displays\Services;
use \Cake\ORM\TableRegistry;
/**
 * Description of IO
 *
 * @author Rauxmedia
 */
class IO {
    
    public static function import($data) {
        
    }

    public static function export() {
        $spreadsheet = new \App\Model\Spreadsheets\DisplaysSpreadsheet();
        $displays = TableRegistry::get("Displays.Displays")->find()->contain(["Deployments.Locations.Countries", "ScheduledPlaybacks" => function($q){
                return $q->where(["date(ScheduledPlaybacks.end) >= curdate()"]);
            }, "ScheduledPlaybacks.Campaigns", "DisplayIssues"])->all();
        return $spreadsheet->generate($displays);
    }
    
    public static function report($data) {
        
        $displays = TableRegistry::get("Displays.Displays")->getByRetailer($data["org_id"]);
        $report = null;
        switch($data["type"]){
            case 1:
                $spreadsheet = new \App\Model\Spreadsheets\Reports\DisplayActivityReportSpreadsheet();
                $report = $spreadsheet->generate(self::getActivityReportData($displays, $data["start"], $data["end"]));
                break;
            case 2:
                $spreadsheet = new \App\Model\Spreadsheets\Reports\DisplayInstallReportSpreadsheet();
                $report = $spreadsheet->generate(self::getInstallReportData($displays, $data["start"], $data["end"]));
                break;
        }
        return $report;
    }
    
    
    
    
    private static function getActivityReportData($displays, $start, $end){
        $displayActionsTable = TableRegistry::get("Displays.DisplayActions");
        $reports = array();
        $datediff = date_diff(date_create($start), date_create($end), true);
        foreach($displays as $display){
            array_push($reports, $displayActionsTable->getInteractionStats($display, $start, $end));
        }
        return array("interval" => self::getInterval($start, $datediff->days), "displays" => $reports);
    }
    
    private static function getInterval($start, $days){
        $interval = array();
        $date = date_create($start);
        for($i = 0; $i < $days; $i++){
            $date->modify("+1 day");
            array_push($interval, $date->format("Y-m-d"));
        }
        return $interval;
    }
    
    
    private static function getInstallReportData($displays, $start, $end){
        $reports = array();
        foreach($displays as $display){
            if(self::inDateRange($display->installed, $start, $end) && $display->deployment != null){
                array_push($reports, $display);
            }
        }
        return array("displays" => $reports);
    }
    
    private static function inDateRange($installed, $start, $end){
        $start_ts = strtotime($start);
        $end_ts = strtotime($end);
        $user_ts = strtotime($installed);
        return (($user_ts >= $start_ts) && ($user_ts <= $end_ts));
    }
}
