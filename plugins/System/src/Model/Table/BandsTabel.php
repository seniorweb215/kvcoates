<?php
namespace System\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of BandsTable
 *
 * @author Yaroslav
 */
class BandsTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    public function getSupportedValues() {
        $bands = array();
        $entities = $this->find()->all();
        foreach($entities as $entity){
            array_push($bands, $entity->name);
        }
        return $bands;
    }
}