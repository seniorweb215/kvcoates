<?php

namespace Displays\Services;

use \Cake\ORM\TableRegistry;

/**
 * Description of Application
 *
 * @author Rauxmedia
 */
class ClientApplication {

    public static function register($data = array()) {
        if (isset($data["identifier"])) {
            $displaysTable = TableRegistry::get("Displays.Displays");
            $query = $displaysTable->findByIdentifier($data["identifier"]);
            $query->select(["id"]);
            if (!$query->isEmpty()) {
                $display = $query->first();
                $display->verified = 1;
                $display->installed = date("Y-m-d H:i:s");
                $displaysTable->save($display);
                unset($display->verified);
                unset($display->installed);
                return $display;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public static function token($data = array()) {
        if (isset($data["token"])) {
            $displaysTable = TableRegistry::get("Displays.Displays");
            $query = $displaysTable->findById($data["id"]);
            if (!$query->isEmpty()) {
                $display = $query->first();
                $display->token = $data["token"];
                $displaysTable->save($display);
                return $display;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    public static function connectivity($data = array()) {
        if (isset($data["id"]) && isset($data["ssid"]) && isset($data["password"]) && isset($data["imsi"]) && isset($data["iccid"])) {
            $displaysTable = TableRegistry::get("Displays.Displays");
            $query = $displaysTable->findById($data["id"]);
            if (!$query->isEmpty()) {
                $display = $query->first();
                $connectivity = new \stdClass();
                $connectivity->ssid = $data["ssid"];
                $connectivity->password = $data["password"];
                $connectivity->imsi = $data["imsi"];
                $connectivity->iccid = $data["iccid"];
                $display->connectivity = $connectivity;
                $displaysTable->save($display);
                return $display;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public static function me($request) {
        $data = $request->data;
        if (!empty($data) && isset($data["id"])) {
            $settings = (isset($data["settings"]) && $data["settings"] == 0) ? false : true;
            $legacy = (isset($data["app_version"])) ? false : true;
            $displaysTable = TableRegistry::get("Displays.Displays");
            $display = $displaysTable->getMeProfile($data["id"], $settings, $legacy);
            if ($display) {
                self::log($request);
                $displaysTable->saveVolumeIfSet($data["id"], $data);
                $displaysTable->saveAppVersionIfSet($data["id"], $data);
                $display->campaigns = TableRegistry::get("Campaigns.ScheduledPlaybacks")->me($data["id"]);
                return $display;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public static function vr($request) {
        $data = $request->data;
        if (!empty($data)) {
            $displaysTable = TableRegistry::get("Displays.Displays");
            $query = $displaysTable->findById($data["id"]);
            $query->select(["id"]);
            $display = $query->first();
            if ($display) {
                self::log($request);
                unset($display->id);
                $display->campaigns = TableRegistry::get("Campaigns.ScheduledPlaybacks")->vr($data["id"]);
                return $display;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private static function log($request) {
        $displaysTable = TableRegistry::get("Displays.Displays");
        $displayActions = TableRegistry::get("Displays.DisplayActions");
        $displayId = $request->data["id"];
        $displayActions->me($displayId, $request->clientIp());
        $display = $displaysTable->findById($displayId)->first();
        $display->last_login = date("Y-m-d H:i:s");
        $displaysTable->save($display);
    }

}
