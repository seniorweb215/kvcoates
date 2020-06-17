<?php

namespace Displays\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of DisplaysTable
 *
 * @author Rauxmedia
 */
class DisplaysTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'hasOne' => ['Displays.Deployments'],
            'hasMany' => ['Campaigns.ScheduledPlaybacks', 'Displays.DisplayAttachments', 'DisplayIssues.DisplayIssues'],
            'belongsTo' => ['System.Brands', 'Displays.Resolutions']
        ]);
    }

    public function findOnline($query, $options) {
        $heartbeat = $options["heartbeat"];
        $date = date("Y-m-d H:i:s", strtotime('-' . $heartbeat . ' hours'));
        $query->where([
            "Displays.last_login > '" . $date . "'"
        ])->andWhere(["verified" => 1]);
        return $query;
    }

    public function findOffline($query, $options) {
        $heartbeat = $options["heartbeat"];
        $date = date("Y-m-d H:i:s", strtotime('-' . $heartbeat . ' hours'));
        $query->where([
            "Displays.last_login < '" . $date . "'"
        ])->andWhere(["verified" => 1]);
        return $query;
    }

    public function findVerified($query) {
        $query->where(["verified" => 1]);
        return $query;
    }

    public function findPending($query) {
        $query->where(["verified" => 0])->andWhere(["network !=" => "Independent"]);
        return $query;
    }

    public function findIndependent($query) {
        $query->where(["network" => "Independent"]);
        return $query;
    }

    public function findUndeployed($query) {
        $query->where(["deployed" => 0]);
        return $query;
    }

    public function all() {
        $query = $this->find();
        $query->contain(["Deployments.Locations.Organisations", "Brands", "Resolutions", 'ScheduledPlaybacks' => function ($q) {
            return $q->where(['ScheduledPlaybacks.status' => 1, "date(ScheduledPlaybacks.end) >= curdate()"]);
        }, 'ScheduledPlaybacks.Campaigns']);
        $displays = $query->all();
        return $displays;
    }

    public function add($data = array()) {
        $entity = $this->newEntity($data);
        $entity->identifier = \Displays\Services\General::getNextIdentifier();
        $entity->verified = 0;
        $entity->deployed = 0;
        $entity->heartbeat = 12;
        $entity->modules = json_encode(\Displays\Services\General::getModules(["Touch"]));
        $entity->installed = date("Y-m-d H:i:s");
        $entity->last_login = date("Y-m-d H:i:s");
        $entity->volume = 0;

        if ($this->save($entity)) {
            return $entity;
        } else {
            return false;
        }
    }

    public function update($id, $data = array()) {
        if($data['connectivity'] == '') {
            $data['connectivity'] = '{}';
        }
        
        return parent::update($id, $data);
    }

    public function modify($data) {
        $response = false;
        if (isset($data["identifier"])) {
            $display = $this->findByIdentifier($data["identifier"])->first();
            if ($display) {
                $resolution = (isset($data["resolution"])) ? \Cake\ORM\TableRegistry::get("Displays.Resolutions")->findByName($data["resolution"])->first() : null;
                $brand = (isset($data["brand"])) ? \Cake\ORM\TableRegistry::get("System.Brands")->findByName($data["brand"])->first() : null;
                $location = (isset($data["location"])) ? \Cake\ORM\TableRegistry::get("Clients.Locations")->findByName($data["location"])->first() : null;
                $display->name = (isset($data["name"])) ? $data["name"] : $display->name;
                $display->os = (isset($data["operating_system"])) ? $data["operating_system"] : $display->os;
                $display->orientation = (isset($data["orientation"])) ? $data["orientation"] : $display->orientation;
                $display->network = (isset($data["network"])) ? $data["network"] : $display->network;
                $display->screensize = (isset($data["screensize"])) ? $data["screensize"] : $display->screensize;
                $display->notes = (isset($data["notes"])) ? $data["notes"] : $display->notes;
                $display->brand_id = ($brand) ? $brand->id : $display->brand_id;
                $display->resolution_id = ($resolution) ? $resolution->id : $display->resolution_id;
                $display->modules = (isset($data["modules"])) ? $this->getModules($data["modules"]) : $display->modules;
                $display->notes = (isset($data["notes"])) ? $data["notes"] : $display->notes;
                $this->save($display);
                \Cake\ORM\TableRegistry::get("Displays.Deployments")->updateDisplayDeployment($display, $location);
                $response = \Cake\ORM\TableRegistry::get("Displays.DisplayAttachments")->multipleUpload($data, $display->id);
            }
        }
        return $response;
    }

    public function remove($id) {
        \Cake\ORM\TableRegistry::get("Campaigns.ScheduledPlaybacks")->deleteAll(["display_id" => $id]);
        \Cake\ORM\TableRegistry::get("Displays.Deployments")->deleteAll(["display_id" => $id]);
        return parent::remove($id);
    }

    /* TODO: merge these two methods somehow, they are redundant */

    public function getBasicProfile($identifier) {
        if ($identifier === "troubled") {
            $entities = $this->find()->contain(["DisplayIssues"])->all();
            $displays = array();
            foreach ($entities as $entity) {
                if (count($entity->display_issues) > 0) {
                    array_push($displays, array("identifier" => $entity->identifier, "name" => $entity->name));
                }
            }
            return $displays;
        } else {
            $query = $this->findByIdentifier($identifier);
            $entity = $query->contain(["Deployments.Locations", "Resolutions", "Brands", "DisplayAttachments"])->first();
            $pictures = array();
            foreach ($entity->display_attachments as $attachment) {
                array_push($pictures, $attachment->url);
            }

            $display = array("name" => $entity->name, "resolution" => $entity->resolution->name, "brand" => $entity->brand->name,
                "operating_system" => $entity->os, "orientation" => $entity->orientation, "network" => $entity->network,
                "screesize" => $entity->screensize, "modules" => $this->getModulesArray($entity->modules), "location" => ($entity->deployment != null) ? $entity->deployment->location->name : "Not deployed to any location",
                "notes" => $entity->notes, "pictures" => $pictures);

            return $display;
        }
    }

    public function getMeProfile($id, $settings, $legacy) {
        $query = $this->findById($id);
        $fields = ["orientation", "volume", "modules"];
        $query->select($fields);
        $display = $query->first();
        if($display && $legacy){ // for app v18 and lower
            $modules = $display->modules;
            unset($display->modules);
            $display->liftnlearn = json_decode(sprintf('{"enabled":%d,"timeout":240}', ($modules["lift_n_learn"]) ? 1 : 0));
            $display->motion = json_decode(sprintf('{"enabled":%s,"sensitivity":0.1}', ($modules["facial_detection"]) ? 1 : 0));
            $display->touch = json_decode(sprintf('{"enabled":%s}', ($modules["touch"]) ? 1 : 0)); 
            $display->location_schedule = \Cake\ORM\TableRegistry::get("Displays.Deployments")->getLocationSchedule($id);
        }else if ($display && $settings) {
            $display->location_schedule = \Cake\ORM\TableRegistry::get("Displays.Deployments")->getLocationSchedule($id);
        }
        return $display;
    }

    public function saveVolumeIfSet($id, $data) {
        if (isset($data["volume"])) {
            $display = $this->findById($id)->first();
            $display->volume = $data["volume"];
            $this->save($display);
        }
    }

    public function saveAppVersionIfSet($id, $data) {
        if (isset($data["app_version"])) {
            $display = $this->findById($id)->first();
            $display->app_version = $data["app_version"];
            $this->save($display);
        }
    }

    public function profile($id = null) {
        if ($id != null) {
            $query = $this->findById($id);
            $query->contain(["Deployments.Locations.Organisations", "ScheduledPlaybacks", "Resolutions", "DisplayAttachments"]);
            $query->innerJoinWith('ScheduledPlaybacks', function ($q) {
                $q->contain(["Campaigns.Contents.Media"]);
                return $q->where(["date(ScheduledPlaybacks.end) >= curdate() and time(ScheduledPlaybacks.end) > curtime()"]);
            });
            if (!$query->isEmpty()) {
                $profile = array("display" => $query->first());
                return $profile;
            } else {
                return $this->defaultProfile($id);
            }
        } else {
            return false;
        }
    }

    private function defaultProfile($id) {
        $query = $this->findById($id);
        $query->contain(["Deployments.Locations.Organisations", "DisplayAttachments"]);
        if (!$query->isEmpty()) {
            $display = $query->first();
            $display->scheduled_playbacks = null;
            $profile = array("display" => $display);
            return $profile;
        } else {
            return false;
        }
    }

    public function powerHistory($id) {
        return \Cake\ORM\TableRegistry::get("Statistics")->find()->where(["display_id" => $id])->andWhere(["campaign_id" => 0])->all();
    }

    public function getByRetailer($org_id) {
        $query = $this->find();
        if ($org_id != 0) {
            $query->contain(["Deployments.Locations.Organisations", "Deployments.Locations.Countries"]);
            $query->innerJoinWith('Deployments.Locations.Organisations', function ($q) use ($org_id) {
                return $q->where(['Organisations.id' => $org_id]);
            });
        }else{
             $query->contain(["Deployments.Locations.Countries", "Deployments.Locations.Organisations"]);
        }
        return $query->all();
    }

    public function getByOrganisation($org_id) {
        $query = $this->find();
        $query->contain(["Deployments.Locations.Organisations", "Brands", "Resolutions"]);
        $query->innerJoinWith('Deployments.Locations.Organisations', function ($q) use ($org_id) {
            return $q->where(['Organisations.id' => $org_id]);
        });
        return $query;
    }

}
