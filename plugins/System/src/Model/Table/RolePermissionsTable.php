<?php

namespace System\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of RolePermissionsTable
 *
 * @author Rauxmedia
 */
class RolePermissionsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['System.SystemActions']
        ]);
    }

    public function addIfNonExisting($data) {
        $permission = $this->find()->where(["role_id" => $data["role_id"], "system_action_id" => $role["system_action_id"]])->first();
        if (!$permission) {
            $permission = $this->add($data);
        }
        return $permission;
    }

}
