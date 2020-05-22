<?php
namespace System\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of TimezonesTable
 *
 * @author Rauxmedia
 */
class TimezonesTable extends AppTable{
    
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    public function import() {
        $objPHPExcel = \PHPExcel_IOFactory::load(WWW_ROOT . 'content' . DS . 'spreadsheets' . DS . 'timezones.xlsx');
        return $this->importFromWorksheet($objPHPExcel->getSheet(0));
    }
    
    private function importFromWorksheet($worksheet){
        $entries = array();
        foreach ($worksheet->getRowIterator(1) as $row) {
            $index = $row->getRowIndex();
            array_push($entries, $this->add($this->getDataFromWorksheetRow($worksheet, $index)));
        }
        return $entries;
    }
    
    private function getDataFromWorksheetRow($worksheet, $index){
        $data = array();
        $data["name"] = $worksheet->getCellByColumnAndRow(2, $index)->getValue();
        $data["region"] = $worksheet->getCellByColumnAndRow(3, $index)->getValue();
        $data["iana"] = $worksheet->getCellByColumnAndRow(4, $index)->getValue();
        $data["utc_offset"] = $worksheet->getCellByColumnAndRow(1, $index)->getValue();
        return $data;
    }
}
