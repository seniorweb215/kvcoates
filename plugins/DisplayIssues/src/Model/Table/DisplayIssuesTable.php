<?php
namespace DisplayIssues\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of DisplayIssuesTable
 *
 * @author Rauxmedia
 */
class DisplayIssuesTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'hasMany' => ['DisplayIssues.DisplayIssueAttachments'],
            'belongsTo' => ['Displays.Displays', 'DisplayIssues.DisplayIssueTypes']
        ]);
        
        $this->belongsTo('Reporter', ['foreignKey' => 'raised_by', 'className' => 'Client.Users']);
        $this->belongsTo('Solver', ['foreignKey' => 'fixed_by', 'className' => 'Client.Users']);
        $this->belongsTo('Location', ['foreignKey' => 'location_id', 'className' => 'Client.Locations']);
    }
    
    
    /*Designed for Roman's app*/
    public function data(){
        $data = [
            "displays" => $this->listDisplays(),
            "display_issue_types" => $this->listIssueTypes(),
            "statuses" => ["Pending", "In Process", "Solved"]
        ];
        return $data;
    }
    
    public function me($identifier){
        $display = \Cake\ORM\TableRegistry::get("Displays.Displays")->findByIdentifier($identifier)->first();
        if($display){
            $statuses = ["Pending", "In Process", "Solved"];
            $issues = array();
            $entities = $this
                    ->findByDisplayId($display->id)
                    ->contain(["Displays", "DisplayIssueTypes", "DisplayIssueAttachments", "Reporter", "Solver", "Location"])
                    ->all();
            foreach($entities as $entity){
                $data = array(
                    "id" => $entity->id,
                    "status" => $statuses[$entity->status],
                    "display" => $entity->display->identifier,
                    "location" => $entity->location->name,
                    "issue_type" => $entity->display_issue_type->name,
                    "details" => $entity->details,
                    "raised_by" => $entity->reporter->first_name . " " . $entity->reporter->last_name,
                    "attachments" => $this->listAttachments($entity->display_issue_attachments));   
                array_push($issues, $data);
            }
            return $issues;
        }else{
            return false;
        }
    }
   
    public function open($data){
        $response = false;
        if(isset($data["display"]) && isset($data["issue_type"]) && isset($data["raised_by"])){
           $display = \Cake\ORM\TableRegistry::get("Displays.Displays")->findByIdentifier($data["display"])->first();
           $issueType = \Cake\ORM\TableRegistry::get("DisplayIssues.DisplayIssueTypes")->findByName($data["issue_type"])->first();
           $user = \Cake\ORM\TableRegistry::get("Clients.Users")->findByPassword($data["raised_by"])->first();
           if($display  && $issueType && $user){
               $tdata = array("status" => 0, "display_issue_type_id" => $issueType->id, "display_id" => $display->id);
               $tdata["details"] = (isset($data["details"])) ? $data["details"] : "";
               $tdata["raised_by"] = $user->id;
               $ticket = $this->add($tdata);
               if($ticket){
                   $response = \Cake\ORM\TableRegistry::get("DisplayIssues.DisplayIssueAttachments")->multipleUpload($data, $ticket->id);
               }
           }
        }
        return $response;
    }
    
    public function modify($data){
        $response = false;
        if(isset($data["ticket_id"]) && isset($data["status"]) && isset($data["changed_by"])){
           $user = \Cake\ORM\TableRegistry::get("Client.Users")->findByPassword($data["changed_by"])->first();
           $ticket = $this->findById($data["ticket_id"])->first();
           $status = $this->getStatusId($data["status"]);
           if($ticket && $user){
               $ticket->fixed_by = $user->id;
               $ticket->status = $status;
               $this->save($ticket);
               $response = \Cake\ORM\TableRegistry::get("DisplayIssues.DisplayIssueAttachments")->multipleUpload($data, $ticket->id);
           }
        }
        return $response;
    }
    
    
    private function listAttachments($attachments){
        $urls = array();
        foreach($attachments as $attachment){
            array_push($urls, $attachment->url);
        }
        return $urls;
    }
    
    private function listDisplays(){
        $displays = [];
        $entities = \Cake\ORM\TableRegistry::get("Displays.Displays")->find()->select(["identifier"])->all();
        foreach($entities as $entity){
            array_push($displays, $entity->identifier);
        }
        return $displays;
    }
    
    private function listIssueTypes(){
        $types = [];
        $entities = \Cake\ORM\TableRegistry::get("DisplayIssues.DisplayIssueTypes")->find()->select(["name"])->all();
        foreach($entities as $entity){
            array_push($types, $entity->name);
        }
        return $types;
    }
    
    private function getStatusId($status){
        $id = null;
        switch($status){
            case "Pending":
                $id = 0;
                break;
            case "In Process":
                $id = 1;
                break;
            case "Solved":
                $id = 2;
                break;
        }
        return $id;
    }
    
    /*End of Roman's app*/
    
    public function formdata(){
        $data = [
            "types" => \Cake\ORM\TableRegistry::get("DisplayIssues.DisplayIssueTypes")->find()->all(),
            "statuses" => [["id" => 0, "name" => "Pending"], ["id" => 1, "name" => "In Process"], ["id" => 2, "name" => "Solved"]]
        ];
        return $data;
    }
    
    
    public function findFixed($query, $options) {
        $d = date('Y-m-d h:i:s', strtotime("first day of last month"));
        $query->where(["date(DisplayIssues.modified) between date('" . $d . "') and curdate()"]);
        $query->andWhere(["status" => 2]);
        return $query;
    }
    
    public function findClosed($query, $options) {
        $query->where(["status" => 2]);
        return $query;
    }
    public function findOutstanding($query, $options) {
        $query->where(["status !=" => 2]);
        return $query;
    }
    
    
    
    
    public function profile($id){
        $query = $this->findById($id);
        $query->contain(["Displays", "DisplayIssueTypes", "DisplayIssueAttachments", "Reporter", "Solver"]);
        return $query->first();
    }
    
    public function all(){
        $query = $this->find();
        $query->contain(["Displays.Deployments.Locations", "DisplayIssueTypes", "DisplayIssueAttachments", "Reporter", "Solver"]);
        $query->order(['DisplayIssues.created' => 'DESC']);
        return $query->all();
    }
    public function display($id){
        $query = $this->findByDisplayId($id);
        $query->contain(["DisplayIssueTypes", "DisplayIssueAttachments", "Reporter", "Solver"]);
        $query->order(['DisplayIssues.created' => 'DESC']);
        return $query->all();
    }
    
    public function export() {
        $spreadsheet = new \App\Model\Spreadsheets\TicketsSpreadsheet();
        return $spreadsheet->generate($this->all());
    }
}
