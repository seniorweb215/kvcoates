<?php
namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of MappingsTable
 *
 * @author Rauxmedia
 */
class MappingsTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    public function campaign($cid){
        $query = $this->findByCampaignId($cid);
        return $query->all();
    }
}
