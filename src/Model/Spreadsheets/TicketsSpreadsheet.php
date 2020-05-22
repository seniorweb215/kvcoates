<?php

namespace App\Model\Spreadsheets;

/**
 * Description of DisplaysSpreadsheet
 *
 * @author Rauxmedia
 */
class TicketsSpreadsheet extends ExcelSpreadsheet {

    var $tickets;

    public function __construct() {
        parent::__construct();
    }

    public function generate($tickets) {
        $this->tickets = $tickets;
        $this->fileName = "connie-tickets.xls";
        $this->setDocumentProperties("Tickets", "");
        $this->body();
        $this->save();
        return array("name" => $this->fileName, "path" => $this->path);
    }

    private function addRow($worksheet, $cols) {
        $columns = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
        foreach ($cols as $key => $col) {
            $worksheet->setCellValue($columns[$key] . $this->currentRow, $col);
        }

        $this->currentRow++;
    }

    private function body() {
        $worksheet = $this->objPHPExcel->setActiveSheetIndex(0);
        $worksheet->setTitle("Displays");
        $worksheet->getColumnDimension('A')->setWidth(5);
        $worksheet->getColumnDimension('B')->setWidth(10);
        $worksheet->getColumnDimension('C')->setWidth(20);
        $worksheet->getColumnDimension('D')->setWidth(40);
        $worksheet->getColumnDimension('E')->setWidth(20);
        $worksheet->getColumnDimension('F')->setWidth(30);
        $worksheet->getColumnDimension('G')->setWidth(50);
        $worksheet->getColumnDimension('H')->setWidth(50);
        $worksheet->getColumnDimension('I')->setWidth(30);
        $worksheet->getColumnDimension('J')->setWidth(30);
        $worksheet->getColumnDimension('H')->setWidth(30);
        $this->addDisplays($worksheet);
    }

    private function addDisplays($worksheet) {
        $this->addRow($worksheet, ["ID", "Status", "Display ID", "Address", "Date", "Issue", "Raised By", "Details", "Action Taken", "Fixed by", "Resolved"]);
        $this->currentRow++;
        foreach ($this->tickets as $ticket) {
            $this->addTicketRow($worksheet, $ticket);
        }
    }

    private function addTicketRow($worksheet, $ticket) {
        $cols = array();
        $cols[0] = $ticket->id;
        $cols[1] = $this->getStatus($ticket);
        $cols[2] = $ticket->display->identifier;
        $cols[3] = ($ticket->display->deployment != null) ? $ticket->display->deployment->location->address : "";
        
        $cols[4] = date("d/m/Y", strtotime($ticket->created));
        $cols[5] = $ticket->display_issue_type->name;
        $cols[6] = $ticket->reporter->first_name . " " . $ticket->reporter->last_name;
        $cols[7] = $ticket->details;
        $cols[8] = ($ticket->actions == "") ? "No actions taken" : $ticket->actions;
        $cols[9] = ($ticket->status != 2) ? "-" : $ticket->solver->first_name . " " . $ticket->solver->last_name;
        $cols[10] = ($ticket->status != 2) ? "To be resolved" : date("d/m/Y", strtotime($ticket->modified));
        $this->addRow($worksheet, $cols);
    }

    private function getStatus($ticket) {
        $status = "";
        switch ($ticket->status) {
            case 0:
                $status = "Pending";
                break;
            case 1:
                $status = "In Process";
                break;
            case 2:
                $status = "Solved";
                break;
        }
        return $status;
    }

}
