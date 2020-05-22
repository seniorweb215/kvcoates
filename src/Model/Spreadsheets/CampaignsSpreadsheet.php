<?php
namespace App\Model\Spreadsheets;

/**
 * Description of CampaignsSpreadsheet
 *
 * @author Rauxmedia
 */
class CampaignsSpreadsheet extends ExcelSpreadsheet{
    var $campaigns;

    public function __construct() {
        parent::__construct();
    }

    public function generate($campaigns) {
        $this->campaigns = $campaigns;
        $this->fileName = "connie-campaigns.xls";
        $this->setDocumentProperties("Campaigns", "");
        $this->body();
        $this->save();
        return array("name" => $this->fileName, "path" => $this->path);
    }
    
    private function addRow($worksheet, $cols) {
        $columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
        foreach($cols as $key => $col){
            $worksheet->setCellValue($columns[$key] . $this->currentRow, $col);
        }
        
        $this->currentRow++;
    }
    
    
    private function body() {
        $worksheet = $this->objPHPExcel->setActiveSheetIndex(0);
        $worksheet->setTitle("Campaigns");
        $worksheet->getColumnDimension('A')->setWidth(10);
        $worksheet->getColumnDimension('B')->setWidth(30);
        $this->addCampaigns($worksheet);
    }
    
    private function addCampaigns($worksheet){
        $this->addRow($worksheet, ["ID", "Name"]);
        $this->currentRow++;
        foreach ($this->campaigns as $campaign){
            $this->addCampaignRow($worksheet, $campaign);
        }
    }
    
    private function addCampaignRow($worksheet, $campaign){
        $cols = array();
        $cols[0] = $campaign->id;
        $cols[1] = $campaign->name;
        $this->addRow($worksheet, $cols);
    }
}
