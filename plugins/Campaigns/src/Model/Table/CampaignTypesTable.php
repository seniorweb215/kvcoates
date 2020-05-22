<?php
namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of CampaignTypesTable
 *
 * @author Rauxmedia
 */
class CampaignTypesTable extends AppTable {
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    public function getEnabled(){
        return $this->find()->where(["enabled" => true])->all();
    }
    
    public function toggle($id){
        $ct = $this->findById($id)->first();
        if($ct){
            $ct->enabled = !$ct->enabled;
            $this->save($ct);
        }
        return $ct;
    }
}
