<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of UserActionsTable
 *
 * @author Rauxmedia
 */
class UserActionsTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    public function log($user_id, $action_id, $ip){
        $this->save($this->newEntity([
            "user_id" => $user_id,
            "action_id" => $action_id,
            "ip" => $ip
        ]));
    }
}
