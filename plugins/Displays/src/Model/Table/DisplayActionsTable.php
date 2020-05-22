<?php
namespace Displays\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of DisplayActions
 *
 * @author Rauxmedia
 */
class DisplayActionsTable extends AppTable{
    public static $ME = 1;

    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    
    public function me($displayId, $ipAddress){
        $entity = $this->newEntity([
            "action_id" => self::$ME,
            "display_id" => $displayId,
            "ipaddress" => $ipAddress
        ]);
        if($this->save($entity)){
            return $entity;
        }else{
            return false;
        }
    }
    
    public function getInteractionStats($display, $start = null, $end = null) {
        $query = $this->find();
        //$start_date = date_format($start, "Y-m-d H:i:s");
        $time = $query->func()->date_format([
            'created' => 'identifier',
            "'%Y-%m-%d %H:00'" => 'literal'
        ]);
        $query->select(["created" => $time, "count" => $query->func()->count('created')])
                ->group("day(created), month(created)")
                ->where(["display_id" => $display->id, "created > '" . $start ."'", "created < '" . $end ."'"])
                ->orderAsc("created");
        $histogram = $query->all();
        return ["report" => $histogram, "display" => $display];
    }
    
    
    
}
