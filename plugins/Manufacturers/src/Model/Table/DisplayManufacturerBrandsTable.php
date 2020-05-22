<?php
namespace Manufacturers\Model\Table;
use App\Model\Table\AppTable;
/**
 * Description of DisplayManufacturersTable
 *
 * @author Rauxmedia
 */
class DisplayManufacturerBrandsTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'hasMany' => [
                'Manufacturers.DisplayManufacturers' => ['foreignKey' => 'manufacturer_brand_id']
            ]
        ]);
    }
    
}
