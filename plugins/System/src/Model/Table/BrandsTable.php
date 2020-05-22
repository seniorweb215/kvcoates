<?php
namespace System\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of BrandsTable
 *
 * @author Rauxmedia
 */
class BrandsTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    public function getSupportedValues() {
        $brands = array();
        $entities = $this->find()->all();
        foreach($entities as $entity){
            array_push($brands, $entity->name);
        }
        return $brands;
    }
}
