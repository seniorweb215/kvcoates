<?php

namespace System\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of OwnersTable
 *
 * @author Yaroslav Z
 */
class OwnersTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    
    // public function getSupportedValues() {
    //     $values = array();
    //     $entities = $this->find()->all();
    //     foreach($entities as $entity){
    //         array_push($values, $entity->countryName);
    //     }
    //     return $values;
    // }

    public function all() {
        return $this->find()->all();
    }

    // public function addMobileCarrier($data = array()) {
    //     $mobileCarriersTable = \Cake\ORM\TableRegistry::get("System.MobileCarriers");
    //     return $mobileCarriersTable->add($data);
    // }
    
    // public function updateMobileCarrier($data = array()) {
    //     $mobileCarriersTable = \Cake\ORM\TableRegistry::get("System.MobileCarriers");
    //     return $mobileCarriersTable->add($data);
    // }
    
    // public function removeMobileCarrier($data = array()) {
    //     $mobileCarriersTable = \Cake\ORM\TableRegistry::get("System.MobileCarriers");
    //     return $mobileCarriersTable->remove($data["id"]);
    // }
    
    // public function match($q){
    //     $query = $this->find();
    //     $query->where(['Countries.countryName LIKE' => '%' . $q . '%']);
    //     return $query->first();
    // }

}
