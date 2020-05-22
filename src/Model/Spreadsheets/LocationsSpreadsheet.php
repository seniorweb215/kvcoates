<?php
namespace App\Model\Spreadsheets;

/**
 * Description of LocationsSpreadsheet
 *
 * @author Rauxmedia
 */
class LocationsSpreadsheet extends ExcelSpreadsheet{
    var $locations;

    public function __construct() {
        parent::__construct();
    }

    public function generate($locations) {
        $this->locations = $locations;
        $this->fileName = "connie-locations.xls";
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
        $this->addLocations($worksheet);
    }
    
    private function addLocations($worksheet){
        $this->addRow($worksheet, ["ID", "Name"]);
        $this->currentRow++;
        foreach ($this->locations as $location){
            $this->addLocationRow($worksheet, $location);
        }
    }
    
    private function addLocationRow($worksheet, $location){
        $cols = array();
        $cols[0] = $location->id;
        $cols[1] = $location->name;
        $this->addRow($worksheet, $cols);
    }
}
