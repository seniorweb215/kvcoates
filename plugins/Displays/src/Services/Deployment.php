<?php

namespace Displays\Services;
use \Cake\ORM\TableRegistry;
/**
 * Description of Deployment
 *
 * @author Rauxmedia
 */

class Deployment {
    
    public static function deploy($data) {
        $displayTable = TableRegistry::get("Displays.Displays");
        $display = $displayTable->findById($data["display_id"])->first();
        if ($display) {
            $deployments = TableRegistry::get("Displays.Deployments");
            $entity = $deployments->newEntity($data);
            if ($deployments->save($entity)) {
                $display->deployed = 1;
                $displayTable->save($display);
                return $entity;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public static function undeploy($data) {
        $displayTable = TableRegistry::get("Displays.Displays");
        $display = $displayTable->findById($data["display_id"])->first();
        if ($display) {
            $deployments = TableRegistry::get("Displays.Deployments");
            $entity = $deployments->findByDisplayId($display->id)->first();
            if ($entity) {
                $deployments->remove($entity->id);
                $display->deployed = 0;
                $displayTable->save($display);
                return $entity;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    public static function getUndeployed(){
        $displayTable = TableRegistry::get("Displays.Displays");
        return $displayTable->find("undeployed")->all();
    }
}
