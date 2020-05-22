<?php
namespace Campaigns\Services;
use \Cake\ORM\TableRegistry;

/**
 * Description of IO
 *
 * @author Rauxmedia
 */
class IO {

    
    public static function report($id) {
        $spreadsheet = new \App\Model\Spreadsheets\CampaignSpreadsheet();
        $campaign = TableRegistry::get("Campaigns.Campaigns")->profile($id);
        $campaign->stats = \Cake\ORM\TableRegistry::get("Statistics.Statistics")->getStatsReport($campaign);
        return $spreadsheet->generate($campaign);
    }

    public static function import($data) {
        
    }

    public static function export() {
        $spreadsheet = new \App\Model\Spreadsheets\CampaignsSpreadsheet();
        $campaigns = TableRegistry::get("Campaigns.Campaigns")->contain(["Countries.MobileCarriers", "Brands", "Organisations", "Resolutions", "Contents", "CampaignLocations.Locations.Deployments.Displays"])->all();
        return $spreadsheet->generate($campaigns);
    }
    
    public static function zip($id){
        $campaign = TableRegistry::get("Campaigns.Campaigns")->findById($id)->contain(["Contents" => function($q){
            return $q->order(['position' => 'ASC']);
        }, "Contents.Media"])->first();
        return self::zipCampaign($campaign);
    }
    
    
    public static function download($id){    
        $campaign = TableRegistry::get("Campaigns.Campaigns")->findById($id)->contain(["Contents.Media" => function($q){
            return $q->where(["media_type" => 2]);
        }])->first();
        foreach($campaign->contents as $content){
            if($content->media != null){
                $media = $content->media;
            }
        }
        return array("name" => $media->filename, "path" => WWW_ROOT .$media->url);
    }
    
    
    private static function zipCampaign($campaign){
        $file = array();
        switch ($campaign->type_id){
            case 2:
                $file = LiftNLearn::zip($campaign);
                self::saveToLibraryAndPushToContents($campaign, $file["filename"], $file["filepath"]);
                break;
        }
        return $file;
    }
    
    private static function saveToLibraryAndPushToContents($campaign, $filename, $filepath){
        $media = TableRegistry::get("Campaigns.Media")->add(["media_type" => 2, "organisation_id" => $campaign->organisation_id, "filename" => $filename, "url" => $filepath]);
        return TableRegistry::get("Campaigns.Contents")->add(["campaign_id" => $campaign->id, "media_id" => $media->id, "position" => 0]);
    }
    
}
