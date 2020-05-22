<?php

namespace Manufacturers\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of DisplayManufacturersTable
 *
 * @author Rauxmedia
 */
class DisplayManufacturersTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => [
                'Manufacturers.DisplayManufacturerBrands' => ['foreignKey' => 'manufacturer_brand_id'],
                'Manufacturers.DisplayOperatingSystems' => ['foreignKey' => 'tech_specs->"$.os"'],
                'Manufacturers.DisplaySizes'  => ['foreignKey' => 'tech_specs->"$.size"'],
                'Displays.Resolutions' => ['foreignKey' => 'tech_specs->"$.resolution"']
            ]
        ]);
    }
    
    public function all() {
        return $this->find()->contain(["DisplayManufacturerBrands", "DisplayOperatingSystems", "DisplaySizes", "Resolutions"])->all();
    }

    public function add($data = array()) {
        $data["tech_specs"] = json_decode($data["tech_specs"]);
        $data["network"] = json_decode($data["network"]);
        return parent::add($data);
    }

    public function formdata() {
        $brandsTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplayManufacturerBrands");
        $osTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplayOperatingSystems");
        $sizesTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplaySizes");
        $resolutionsTable = \Cake\ORM\TableRegistry::get("Displays.Resolutions"); // Refactor alert!
        $data = array(
            "manufacturer_brands" => $brandsTable->find()->all(),
            "resolutions" => $resolutionsTable->find()->all(),
            "operatingSystems" => $osTable->find()->all(),
            "orientations" => array("Portrait", "Landscape"),
            "versions" => array("1.x", "2.x", "3.x", "4.x"),
            "screensizes" => $sizesTable->find()->all()
        );
        return $data;
    }

}
