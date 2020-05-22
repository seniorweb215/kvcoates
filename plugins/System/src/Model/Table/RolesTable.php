<?php

namespace System\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of RolesTable
 *
 * @author Rauxmedia
 */
class RolesTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'hasMany' => ['System.RolePermissions']
        ]);
    }

    public function sync() {
        $roles = $this->find()->all();
        $permissionsTable = \Cake\ORM\TableRegistry::get("System.RolePermissions");
        $systemActions = \Cake\ORM\TableRegistry::get("System.SystemActions")->find()->all();
        $entities = array();
        foreach ($roles as $role) {
            foreach ($systemActions as $systemAction) {
                $entity = $permissionsTable->addIfNonExisting([
                    "role_id" => $role->id,
                    "system_action_id" => $systemAction->id,
                    "granted" => true
                ]);
                array_push($entities, $entity);
            }
        }
        return $entities;
    }
    
    
    

    public function all() {
        return $this->find()->contain(["RolePermissions"])->all();
    }

    public function add($data = array()) {
        $role = parent::add($data);
        $systemActions = \Cake\ORM\TableRegistry::get("System.SystemActions")->find()->all();
        $permissionsTable = \Cake\ORM\TableRegistry::get("System.RolePermissions");
        foreach ($systemActions as $systemAction) {
            $permissionsTable->add([
                "role_id" => $role->id,
                "system_action_id" => $systemAction->id,
                "granted" => false
            ]);
        }
        return $role;
    }
    
    
    public function getDashboard(){
        return array(
            "roles" => $this->all(),
            "system_actions" => \Cake\ORM\TableRegistry::get("System.SystemActions")->find()->all()
        );
    }
    
    public function updatePermission($data){
        $permissionsTable = \Cake\ORM\TableRegistry::get("System.RolePermissions");
        $permission = $permissionsTable->find()->where(["id" => $data["id"], "system_action_id" => $data["system_action_id"]])->first();
        if($permission){
            $permission->granted = ($data["granted"] === 'true') ? 1 : 0;
            $permissionsTable->save($permission);
        }
        return $permission;
    }

}
