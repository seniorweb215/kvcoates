<?php

namespace Displays\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of DeploymentsTable
 *
 * @author Rauxmedia
 */
class DeploymentsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['Displays.Displays', 'Clients.Locations']
        ]);
    }

    public function updateDisplayDeployment($display, $location) {
        if ($display && $location) {
            $deployment = $this->findByDisplayId($display->id)->first();
            $deployment->location_id = $location->id;
            $this->save($deployment);
        }
    }

    public function getLocationSchedule($displayId) {
        $query = $this->findByDisplayId($displayId);
        $query->contain(["Locations.LocationSchedules"]);
        $deployment = $query->first();
        return ($deployment) ? $deployment->location->location_schedule : null;
    }

    public function getDeploymentsByCriteria($lid, $data) {
        $query = $this->findByLocationId($lid);
        $query->contain(["Displays"]);

        $conditions = array();
        if ($data["brand"] != 0) {

            array_push($conditions, ["Displays.brand_id" => $data["brand"]]);
        }
        if ($data["orientation"] != "") {
            array_push($conditions, ["Displays.orientation" => $data["orientation"]]);
        }

        $query->innerJoinWith("Displays", function ($q) use ($conditions) {

            return (count($conditions) > 0) ? $q->where($conditions) : $q;
        });
        return $query->all();
    }

}
