<?php

namespace Clients\Model\Entity;
use Cake\ORM\Entity;

/**
 * Description of OrganisationSetting
 *
 * @author Rauxmedia
 */
class OrganisationSetting extends Entity{
    public function getMap($map){
        $map["latitude"] = floatval($map["latitude"]);
        $map["longitude"] = floatval($map["longitude"]);
        $map["zoom"] = intval($map["zoom"]);
        $map["offline_one"] = intval($map["offline_one"]);
        $map["offline_two"] = intval($map["offline_two"]);
        $map["online"] = intval($map["online"]);
        $map["clustered"] = ($map["clustered"] == 'true') ? true : false;
        return $map;
    }
    
    public function getStats($stats){
        $stats["buffer"] = floatval($stats["buffer"]);
        $stats["event_end"] = floatval($stats["event_end"]);
        $stats["default"] = intval($stats["default"]);
        return $stats;
    }
}
