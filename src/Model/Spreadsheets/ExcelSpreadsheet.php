<?php

namespace App\Model\Spreadsheets;

/**
 * Description of ExcelForm
 *
 * @author Rauxmedia
 */
class ExcelSpreadsheet {

    protected $objPHPExcel;
    protected $currentRow;
    protected $fileName;
    protected $path;

    function __construct() {
        $this->objPHPExcel = new \PHPExcel();
        $this->currentRow = 1;
        
    }

    protected function setDocumentProperties($title, $description) {
        $this->objPHPExcel->getProperties()->setCreator("DigitalMedia")
                ->setLastModifiedBy("Rauxmedia")
                ->setTitle($title)
                ->setSubject($title)
                ->setDescription($description)
                ->setKeywords("digitalmedia, digital, signage")
                ->setCategory("tech");
    }

    protected function save() {
        define('EOL', (PHP_SAPI == 'cli') ? PHP_EOL : '<br />');
        $objWriter = \PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');  //Excel2007
        $this->path = WWW_ROOT . 'content' . DS . 'spreadsheets' . DS . $this->fileName;
        $objWriter->save($this->path);
    }

}
