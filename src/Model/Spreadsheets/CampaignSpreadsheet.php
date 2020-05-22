<?php

namespace App\Model\Spreadsheets;

/**
 * Description of CampaignsSpreadsheet
 *
 * @author Rauxmedia
 */
class CampaignSpreadsheet extends ExcelSpreadsheet {

    var $campaign;

    public function __construct() {
        parent::__construct();
    }

    public function generate($campaign) {
        $this->campaign = $campaign;
        $this->fileName = strtolower($campaign->name) . "-campaign.xls";
        $this->setDocumentProperties("Campaign", "");
        $this->body();
        $this->save();
        return array("name" => $this->fileName, "path" => $this->path);
    }

    private function addRow($worksheet, $id, $name) {
        $worksheet->setCellValue('A' . $this->currentRow, $id);
        $worksheet->setCellValue('B' . $this->currentRow, $name);
        $this->currentRow++;
    }

    private function body() {
        $worksheet = $this->objPHPExcel->setActiveSheetIndex(0);
        $worksheet->setTitle($this->campaign->name);
        $worksheet->getColumnDimension('A')->setWidth(10);
        $worksheet->getColumnDimension('B')->setWidth(30);
        $this->addCampaignSummary($worksheet);
        $this->addCampaignStats($worksheet);
    }

    private function addCampaignSummary($worksheet) {
        $this->addRow($worksheet, "Campaign Summary", "");
        $this->addRow($worksheet, "Campaign", $this->campaign->name);
        $this->addRow($worksheet, "Start Date", $this->campaign->start);
        $this->addRow($worksheet, "End Date", $this->campaign->end);
        $this->addRow($worksheet, "Duration", $this->getCampaignDuration());
        $this->addRow($worksheet, "Campaign Type", $this->getCampaignType());
        $this->addRow($worksheet, "Brand", $this->campaign->brand->name);
        $this->addRow($worksheet, "Displays Wifi", $this->getDisplaysCountByNetworkType("Wifi"));
        $this->addRow($worksheet, "Displays 3G", $this->getDisplaysCountByNetworkType("3G"));
        $this->addRow($worksheet, "Campaign Size", "");
        $this->addRow($worksheet, "Campaign Cost", "");
        $this->currentRow += 2;
    }

    private function getCampaignDuration() {
        $start = date_create($this->campaign->start);
        $end = date_create($this->campaign->end);
        $interval = date_diff($start, $end);
        return $interval->format("%d days, %h hours");
    }

    private function getCampaignType() {
        $type = "Unknown";
        switch ($this->campaign->type_id) {
            case 1:
                $type = "Video";
                break;
            case 2:
                $type = "Lift N Learn";
                break;
            case 3:
                $type = "Touch";
                break;
            case 4:
                $type = "VR";
                break;
        }
        return $type;
    }

    private function getDisplaysCountByNetworkType($type) {
        $count = 0;
        foreach ($this->campaign->campaign_locations as $campaign_location) {
            foreach ($campaign_location->location->deployments as $deployment) {
                if ($deployment->display->network == $type) {
                    $count++;
                }
            }
        }
        return $count;
    }

    private function addCampaignStats($worksheet) {
        $stats = $this->campaign->stats;
        $this->addRow($worksheet, "Campaign Stats", "");
        $this->addRow($worksheet, "Total Devices", "");
        $this->currentRow++;
        $this->addRow($worksheet, "TAG (All)", "Events");
        $this->addStats($worksheet, $stats["general"]);

        foreach ($stats["displays"] as $display) {
            $this->currentRow++;
            $this->addRow($worksheet, "TAG (" . $display->identifier . ")", "Events");
            $this->addStats($worksheet, $display->stats);
        }
    }

    private function addStats($worksheet, $anyStats) {
        foreach ($anyStats as $stats) {
            $this->addRow($worksheet, $this->mapTag($stats->tag), $stats->count);
        }
    }
    
    private function mapTag($tag){
        $value = $tag;
        foreach($this->campaign->mappings as $mapping){
            if(strtolower($mapping->tag) == strtolower($tag)){
                $value = $mapping->value;
            }
        }
        return $value; 
    }

}
