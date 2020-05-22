<?php
namespace App\Model\Spreadsheets;

/**
 * Description of DisplaysSpreadsheet
 *
 * @author Rauxmedia
 */
class DisplaysSpreadsheet extends ExcelSpreadsheet{
    var $displays;

    public function __construct() {
        parent::__construct();
    }

    public function generate($displays) {
        $this->displays = $displays;
        $this->fileName = "connie-displays.xls";
        $this->setDocumentProperties("Displays", "");
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
        $worksheet->setTitle("Displays");
        $worksheet->getColumnDimension('A')->setWidth(40);
        $worksheet->getColumnDimension('B')->setWidth(40);
        $worksheet->getColumnDimension('C')->setWidth(40);
        $worksheet->getColumnDimension('D')->setWidth(40);
        $this->addDisplays($worksheet);
    }
    
    private function addDisplays($worksheet){
        $this->addRow($worksheet, ["Display ID", "Name", "Address", "Country", "Last Login", "Status", "Support", "Content"]);
        $this->currentRow++;
        foreach ($this->displays as $display){
            $this->addDisplayRow($worksheet, $display);
        }
    }
    
    private function addDisplayRow($worksheet, $display){
        $cols = array();
        $cols[0] = $display->identifier;
        $cols[1] = $display->name;
        $cols[2] = (isset($display->deployment)) ? $display->deployment->location->address : "Not deployed";
        $cols[3] = (isset($display->deployment)) ? $display->deployment->location->country->countryName : "Not deployed";
        $cols[4] = date("d/m/Y", strtotime($display->last_login));
        $cols[5] = $this->getDisplayStatus($display);
        $cols[6] = (count($display->display_issues) > 0) ? "Y" : "N";
        $cols[7] = (isset($display->scheduled_playbacks)) ? (count($display->scheduled_playbacks) > 0) ? $display->scheduled_playbacks[0]->campaign->id : "Default" : "Default";
        $this->addRow($worksheet, $cols);
    }
    
    private function getDisplayStatus($display){
        $now = date_create(date("Y-m-d H:i:s", strtotime("now")));
        $datetime = date_create($display->last_login);
        $diff = date_diff($now, $datetime);
        $hours = $diff->h;
        $hours += ($diff->days * 24);
        $status = "PENDING";
        if ($display->verified) {
            $status = ($hours < 12) ? "ONLINE" : "OFFLINE";
        }
        if($display->network == "Independent"){
            $status = "INDEPENDENT";
        }
        return $status;
    }
}
