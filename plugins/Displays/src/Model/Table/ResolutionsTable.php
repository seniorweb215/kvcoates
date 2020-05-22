<?php

namespace Displays\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of ResolutionsTable
 *
 * @author Rauxmedia
 */
class ResolutionsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function getSupportedValues() {
        $resolutions = array();
        $entities = $this->find()->all();
        foreach($entities as $entity){
            array_push($resolutions, $entity->name);
        }
        return $resolutions;
    }

}
