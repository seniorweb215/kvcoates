<?php
namespace App\Model\Spreadsheets\Reports;

/**
 * Description of ReportsSpreadsheet
 *
 * @author Rauxmedia
 */
class DisplayInstallReportSpreadsheet extends \App\Model\Spreadsheets\ExcelSpreadsheet {

    var $reportData;
    var $columns;

    public function __construct() {
        parent::__construct();
    }

    public function generate($reportData) {
        $this->reportData = $reportData;
        $this->fileName = "install-report.xls";
        $this->setDocumentProperties("Display Install Report", "");
        $this->generateColumns();
        $this->body();
        $this->save();
        return array("name" => $this->fileName, "path" => $this->path);
    }
    
    private function generateColumns(){
        $columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        $this->columns = $columns;
        foreach($columns as $columnA){
            foreach($columns as $columnB){
                array_push($this->columns, $columnA.$columnB);
            }
        }
        
    }

    private function addRow($worksheet, $cols) {
        
        foreach ($cols as $key => $col) {
            $worksheet->setCellValue($this->columns[$key] . $this->currentRow, $col);
        }
        $this->currentRow++;
    }
    
    

    private function body() {
        $worksheet = $this->objPHPExcel->setActiveSheetIndex(0);
        $worksheet->setTitle("Displays");
        $worksheet->getColumnDimension('A')->setWidth(25);
        $worksheet->getColumnDimension('B')->setWidth(15);
        $worksheet->getColumnDimension('C')->setWidth(35);
        $worksheet->getColumnDimension('D')->setWidth(35);
        $this->addReports($worksheet);
    }
    
    private function getHeaders(){
        $headers = array("Display Identifier", "Installation Date", "Retailer", "Location Address", "Country");
        return $headers;
    }

    private function addReports($worksheet) {
        $this->addRow($worksheet, $this->getHeaders());
        $this->currentRow++;
        $displays = $this->reportData["displays"];
        foreach ($displays as $display) {
            $this->addDisplayReportRow($worksheet, $display);
        }
    }

    private function addDisplayReportRow($worksheet, $display) {
        $d = $display["display"];
        //var_dump($display->deployment);
        //exit;
        $cols = array($display->identifier, date("d/m/Y h:i A", strtotime($display->installed)), $display->deployment->location->organisation->name, $display->deployment->location->address, $display->deployment->location->country->countryName);
        $this->addRow($worksheet, $cols);
    }
    
    
    
    private function hadAnyActivity($d, $report){
        $activity = 0;
        foreach($report as $day){
            $a = date_format(date_create($day->created),"Y-m-d");
            //\Cake\Log\Log::write("debug", [$a, $d]);
            $pos = stripos($a, $d);
            if($pos !== false){
                $activity = 1;
            }
        }
        return $activity;
    }

    

}
