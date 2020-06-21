<?php

namespace Campaigns\Services;

use \Cake\ORM\TableRegistry;

/**
 * Description of General
 *
 * @author Rauxmedia
 */
class General {

    public static function data() {
        $data = array();
        $data["resolutions"] = TableRegistry::get("Displays.Resolutions")->find()->all();
        $data["orientations"] = array("Landscape", "Portrait");
        $data["campaign_types"] = TableRegistry::get("Campaigns.CampaignTypes")->getEnabled();
        $data["countries"] = TableRegistry::get("System.Countries")->find()->all();
        $data["organisations"] = TableRegistry::get("Clients.Organisations")->find()->all();
        $data["brands"] = TableRegistry::get("System.Brands")->find()->all();
        $data["bands"] = TableRegistry::get("System.Bands")->find()->all();
        $data["settings"] = TableRegistry::get("Client.OrganisationsSettings")->find()->first();
        $data["displays"] = TableRegistry::get("Displays.Displays")->find('all')->count();
        return $data;
    }

    public static function target($data) {
        $locationsTable = \Cake\ORM\TableRegistry::get("Clients.Locations");
        $deploymentsTable = \Cake\ORM\TableRegistry::get("Displays.Deployments");
        $locations = $locationsTable->getByCountry($data["country"]);
        $filteredLocations = array();
        $displays = 0;
        $d = array();
        foreach ($locations as $location) {
            $deployments = $deploymentsTable->getDeploymentsByCriteria($location->id, $data);
            if (count($deployments) > 0) {
                // if ($data["organisation"] == 0) {
                //     $displays += count($deployments);
                //     array_push($filteredLocations, $location);
                // } else if ($location->organisation_id == $data["organisation"]) {
                //     $displays += count($deployments);
                //     array_push($filteredLocations, $location);
                // }
                $displays += count($deployments);
                array_push($filteredLocations, $location);
            }
        }
        return array("displays" => $displays, "locations" => $filteredLocations);
    }

    public static function pushContent($data) {
        $contentsTable = TableRegistry::get("Campaigns.Contents");
        return $contentsTable->pushContent($data);
    }

    public static function popContent($data) {
        $contentsTable = TableRegistry::get("Campaigns.Contents");
        return $contentsTable->remove($data["id"]);
    }

    public static function toggleFacialDetection($id = null) {
        $campaigns = TableRegistry::get("Campaigns.Campaigns");
        $campaign = $campaigns->findById($id)->first();
        if ($campaign) {
            $campaign->has_facial_detection = !$campaign->has_facial_detection;
            $campaigns->save($campaign);
            return $campaign->has_facial_detection;
        } else {
            return null;
        }
    }

    public static function stop($id) {
        $campaigns = TableRegistry::get("Campaigns.Campaigns");
        $campaign = $campaigns->findById($id)->first();
        if ($campaign) {
            TableRegistry::get("Campaigns.ScheduledPlaybacks")->stop($id);
            $campaign->status = 2;
            $campaigns->save($campaign);
            return $campaign;
        } else {
            return false;
        }
    }
    public static function remove($id) {
        $campaigns = TableRegistry::get("Campaigns.Campaigns");
        $campaign = $campaigns->findById($id)->first();
        if ($campaign) {
            TableRegistry::get("Campaigns.ScheduledPlaybacks")->remove($id);
            $campaign->status = 3;
            $campaigns->save($campaign);
            return $campaign;
        } else {
            return false;
        }
    }

}
