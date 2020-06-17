<?php

namespace Displays\Services;
use \Cake\ORM\TableRegistry;
/**
 * Description of General
 *
 * @author Rauxmedia
 */
class General {

    public static function getNextIdentifier() {
        $settingsTable = TableRegistry::get("Clients.OrganisationsSettings");
        $displayTable = TableRegistry::get("Displays.Displays");
        $settings = $settingsTable->find()->first();
        return sprintf('%s-%04d', $settings->prefix, $displayTable->find('all')->count() + 1);
    }

    public static function getFormData() {
        $brandsTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplayManufacturerBrands");
        $bandsTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplayManufacturerBands");
        $osTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplayOperatingSystems");
        $sizesTable = \Cake\ORM\TableRegistry::get("Manufacturers.DisplaySizes");
        $resolutionsTable = \Cake\ORM\TableRegistry::get("Displays.Resolutions"); // Refactor alert!
        $data = array(
            "manufacturers" => $brandsTable->find()->contain(["DisplayManufacturers"])->all(),
            "resolutions" => $resolutionsTable->find()->all(),
            "brands" => TableRegistry::get("System.Brands")->find()->all(),
            "bands" => TableRegistry::get("System.Bands")->find()->all(),
            "operatingSystems" => $osTable->find()->all(),
            "orientations" => array("Portrait", "Landscape"),
            "networks" => array("3G", "Wifi", "Lan", "Independent"),
            "screensizes" => $sizesTable->find()->all()
        );
        return $data;
    }

    public static function data() {
        $data = array(
            "modules" => array("Facial Detection", "Lift N Learn", "Touch", "NFC", "Camera", "VR"),
            "resolutions" => TableRegistry::get("Displays.Resolutions")->getSupportedValues(),
            "brands" => TableRegistry::get("System.Brands")->getSupportedValues(),
            "locations" => TableRegistry::get("Clients.Locations")->getSupportedValues(),
            "operatingSystems" => array("Windows", "Unix", "Android", "iOS"),
            "orientations" => array("Portrait", "Landscape"),
            "networks" => array("3G", "Wifi", "Lan", "Independent"),
            "screensizes" => array("7 Inch", "10 Inch", "22 Inch", "32 Inch", "40 Inch", "55 Inch", "65 Inch", "72 Inch"));
        return $data;
    }
    
    public static function install($data){
        $response = false;
        $displayTable = TableRegistry::get("Displays.Displays");
        if(isset($data["name"]) && isset($data["resolution"]) && isset($data["brand"]) && isset($data["operating_system"]) && isset($data["orientation"]) && isset($data["network"]) && isset($data["screensize"]) && isset($data["modules"]) && isset($data["location"])){
            $resolution = TableRegistry::get("Displays.Resolutions")->findByName($data["resolution"])->first();
            $brand = TableRegistry::get("System.Brands")->findByName($data["brand"])->first();
            $location = TableRegistry::get("Clients.Locations")->findByName($data["location"])->first();
            if($resolution && $brand && $location){
                $display = $displayTable->add(array("name" => $data["name"], "resolution_id" => $resolution->id, "brand_id" => $brand->id, "os" => $data["operating_system"], "modules" => self::getModules($data["modules"]),
                    "network" => $data["network"], "orientation" => $data["orientation"], "screensize" => $data["screensize"], "notes" => isset($data["notes"]) ? $data["notes"]: "" ));
                if($display){
                    $response = TableRegistry::get("Displays.DisplayAttachments")->multipleUpload($data, $display->id);
                    Deployment::deploy(array("display_id" => $display->id, "location_id" => $location->id));
                }
            }
        }
        return $response;
    }

    public static function getModules($modules) {
        $object = new \stdClass();
        $object->facial_detection = self::hasModule($modules, "Facial Detection");
        $object->lift_n_learn = self::hasModule($modules, "Lift N Learn");
        $object->touch = self::hasModule($modules, "Touch");
        $object->nfc = self::hasModule($modules, "NFC");
        $object->camera = self::hasModule($modules, "Camera");
        $object->vr = self::hasModule($modules, "VR");
        return $object;
    }

    public static function getModulesArray($object) {
        $modules = array();
        if ($object["vr"]) {
            array_push($modules, "VR");
        }
        if ($object["nfc"]) {
            array_push($modules, "NFC");
        }
        if ($object["touch"]) {
            array_push($modules, "Touch");
        }
        if ($object["camera"]) {
            array_push($modules, "Camera");
        }
        if ($object["lift_n_learn"]) {
            array_push($modules, "Lift N Learn");
        }
        if ($object["facial_detection"]) {
            array_push($modules, "Facial Detection");
        }
        return $modules;
    }

    private static function hasModule($modules, $test_module) {
        $response = false;
        foreach ($modules as $module) {
            if ($module == $test_module) {
                $response = true;
                break;
            }
        }
        return $response;
    }

    
}
