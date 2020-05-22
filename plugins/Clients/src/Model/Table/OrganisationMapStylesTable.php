<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of OrganisationMapStylesTable
 *
 * @author Rauxmedia
 */
class OrganisationMapStylesTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
    }
    
    
    public function add($data = array()) {
        $data["organisations_settings_id"] = 1;
        $data["style"] = json_decode($data["style"]);
        parent::add($data);
    }
}
