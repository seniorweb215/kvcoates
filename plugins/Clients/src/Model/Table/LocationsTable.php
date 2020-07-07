<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;

/**
 * Description of LocationsTable
 *
 * @author Rauxmedia
 */
class LocationsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'hasOne' => ['Clients.LocationSchedules', "Clients.LocationContacts"],
            'belongsTo' => ['Clients.Organisations', 'System.Countries', 'System.Timezones', "System.Sizes"],
            'hasMany' => ["Displays.Deployments", "Clients.LocationAttachments"]
        ]);
        
    }
    
    public function getSupportedValues() {
        $values = array();
        $entities = $this->find()->all();
        foreach($entities as $entity){
            array_push($values, $entity->name);
        }
        return $values;
    }
    
    
    /*Support API methods*/
    public function data() {
        $data = array("retailers" =>\Cake\ORM\TableRegistry::get("Clients.Organisations")->getSupportedValues(),
            "countries" => \Cake\ORM\TableRegistry::get("System.Countries")->getSupportedValues());
        return $data;
    }
    public function addNew($data){
        $response = false;
        if(isset($data["retailer"]) && isset($data["country"]) && isset($data["name"]) && isset($data["address"]) && isset($data["latitude"]) && isset($data["longitude"]) && isset($data["post_code"]) && isset($data["telephone"]) && isset($data["email"])){
            $country = \Cake\ORM\TableRegistry::get("Countries")->find()->where(["countryName" => $data["country"]])->first();
            $organisation = \Cake\ORM\TableRegistry::get("Organisations")->findByName($data["retailer"])->first();
            if($country && $organisation){
                $location = $this->add(
                        array(
                            "organisation_id" => $organisation->id, "country_id" => $country->id, "zone_id" => 0, "email" => $data["email"], "telephone" => $data["telephone"],
                            "address" => $data["address"], "post_code" => $data["post_code"], "latitude" => $data["latitude"], "longitude" => $data["longitude"], "name" => $data["name"])
                        );
                $response = ($location) ? true : false;
            }
        }
        return $response;
    }
    
    /*Support API methods*/
    
    
    
    
    
    public function index() {
        $query = $this->find();
        $query->contain(["Organisations", "Countries", "Deployments.Displays"]);
        $locations = $query->all();
        return $locations;
    }

    public function all() {
        $query = $this->find();
        $query->contain(["Organisations", "Countries"]);
        return $query->all();
    }
    
    public function dashboard(){
        $query = $this->find();
        $query->contain(["Organisations", "LocationContacts", "Sizes", "LocationAttachments", "Countries", "Deployments.Displays.ScheduledPlaybacks.Campaigns", "Deployments.Displays.DisplayIssues" => function($q){
            return $q->where(["status !=" => 2]);
        }, "Deployments.Displays.DisplayIssues.DisplayIssueTypes"]);
        return $query->all();
    }
    
    public function add($data = array()) {
        /*$geocoding = $this->geocode($data["address"]);
        if($geocoding){
            $data["address"] = $geocoding["address"];
            $data["latitude"] = $geocoding["latitude"];
            $data["longitude"] = $geocoding["longitude"];
        }*/
        $entity = parent::add($data);
        $default = new \stdClass();
        $default->opens = "7:00";
        $default->closes = "7:00";
        $schedule = array("location_id" => $entity->id, "monday" => $default, "tuesday" => $default, "wednesday" => $default, "thursday" => $default, "friday" => $default, "saturday" => $default, "sunday" => $default);
        $schedulesTable = \Cake\ORM\TableRegistry::get("Clients.LocationSchedules");
        // $schedulesTable->save($schedulesTable->newEntity($schedule));
        return $entity;
    }
    
    
    public function remove($id) {
        $deploymentsTable = \Cake\ORM\TableRegistry::get("Clients.Deployments");
        $deploymentsTable->deleteAll(["location_id" => $id]);
        return parent::remove($id);
    }

    

    public function addIfNonExisting($data){
        $loc = $this->find()->where(["name" => $data["name"], "organisation_id" => $data["organisation_id"], "country_id" => $data["country_id"]])->first();
        if(!$loc){
            $loc = $this->add($data);
        }
        return $loc;
    }

    public function profile($id = null) {
        if ($id != null) {
            $location = $this->findById($id)->contain(["Timezones", "LocationSchedules", "LocationContacts"])->first();
            $deploymentsTable = \Cake\ORM\TableRegistry::get("Displays.Deployments");
            $deployments = $deploymentsTable->findByLocationId($location->id)->contain(["Displays.ScheduledPlaybacks.Campaigns", "Displays.Brands"])->all();
            return array("location" => $location, "deployments" => $deployments);
        } else {
            return false;
        }
    }

    public function updateContact($id, $data) {
        $locationContactTable = \Cake\ORM\TableRegistry::get("Clients.LocationContacts");
        if($id == 0) {
            unset($data['id']);
            $entity = $locationContactTable->add($data);
        } else {
            $entity = $locationContactTable->update($id, $data);
        }

        return $entity;
    }
    
    
    
    public function getByOrgAndBrand($org_id, $brand_id){
        $deploymentsTable = \Cake\ORM\TableRegistry::get("Displays.Deployments");
        $locations = $this->findByOrganisationId($org_id);
        $filteredLocations = array();
        foreach($locations as $location){
            $deploymentsQuery = $deploymentsTable->findByLocationId($location->id);
            $deploymentsQuery->contain(["Displays"]);
            $deploymentsQuery->innerJoinWith("Displays", function ($q) use ($brand_id) {
                return $q->where(['Displays.brand_id' => $brand_id]);
            });
            if(!$deploymentsQuery->isEmpty()){
                array_push($filteredLocations, $location);
            }
        }
        
        return $filteredLocations;
    }
    
    public function getByOrganisationsAndCountry($orgs, $cid){
        $arr = array_map('intval', explode(",", $orgs));
        $query = $this->find()->where(["organisation_id IN" => $arr]);
        if($cid != 0){
            $query->andWhere(["country_id" => $cid]);
        }
        $query->contain(["Deployments.Displays" => function($q){
            return $q->select(["id", "name", "resolution_id", "brand_id", "orientation"]);
        }]);
        return $query->all();
    }
    
    
    
    
    public function export() {
        $spreadsheet = new \App\Model\Spreadsheets\LocationsSpreadsheet();
        $locations = $this->all();
        return $spreadsheet->generate($locations);
    }
    
    
    
    
    public function getByCountry($country_id){
        return ($country_id == 0) ? $this->find()->contain(["Deployments.Displays"])->all() : $this->findByCountryId($country_id)->contain(["Deployments.Displays"])->all();
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /*Designed for ORALB only*/
    public function import() {
        $objPHPExcel = \PHPExcel_IOFactory::load(WWW_ROOT . 'spreadsheets' . DS . 'oralb-import.xlsx');
        return $this->importFromWorksheet($objPHPExcel->getSheet(0));
    }
    public function geoCodeAll(){
        $remaining = array();
        $locations = $this->find()->where(["latitude" => 0, "longitude" => 0])->all();
        foreach($locations as $location){
            $geo = $this->geocode($location->address);
            if($geo){
                $location->address = $geo["address"];
                $location->latitude = $geo["latitude"];
                $location->longitude = $geo["longitude"];
                $this->save($location);
            }else{
                array_push($remaining, $location);
            }
        }
    }
    private function importFromWorksheet($worksheet){
        $entries = array();
        $displaysTable = \Cake\ORM\TableRegistry::get("Displays.Displays");
        foreach ($worksheet->getRowIterator(15) as $row) {
            $index = $row->getRowIndex();
            $data = $this->getDataFromWorksheetRow($worksheet, $index);
            $location = $this->addIfNonExisting($data);
            $display = $displaysTable->add($this->getDisplayData($location->name));
            $deployment = $displaysTable->deploy(array("display_id" => $display->id, "location_id" => $location->id));
            $set = array("location" => $location, "display" => $display, "deployment" => $deployment);
            array_push($entries, $set);
        }
        return $entries;
    }
    private function getDataFromWorksheetRow($worksheet, $index){
        $countriesTable = \Cake\ORM\TableRegistry::get("System.Countries");
        $retailersTable = \Cake\ORM\TableRegistry::get("Clients.Organisations");
        $data = array();
        $value = $worksheet->getCellByColumnAndRow(0, $index)->getValue();
        $arr = explode(" ", $value);
        $country = $countriesTable->match($arr[0]);
        $retailer = $retailersTable->addIfNonExisting($worksheet->getCellByColumnAndRow(1, $index)->getValue(), $country->id);
        
        $data["organisation_id"] = $retailer->id;
        $data["country_id"] = $country->id;
        $data["zone_id"] = 0;
        $data["email"] = "support@digitalmedia.com";
        $data["telephone"] = "00000000";
        $data["name"] = $worksheet->getCellByColumnAndRow(3, $index)->getValue();
        $data["address"] = $worksheet->getCellByColumnAndRow(4, $index)->getValue() . ", " . $worksheet->getCellByColumnAndRow(6, $index)->getValue();
            //$data["geo"] = $this->geocode($data["address"]);
        $data["post_code"] = $worksheet->getCellByColumnAndRow(5, $index)->getValue();
        $data["latitude"] = 0;
        $data["longitude"] = 0;
        return $data;
    }
    private function getDisplayData($name){
        return array(
            "name" => "Oral B " . $name,
            "token" => "",
            "resolution_id" => 1,
            "brand_id" => 1,
            "os" => "Android",
            "network" => "Wifi",
            "orientation" => "Landscape"
        );
    }
    private function geocode($_address){
        $address = urlencode($_address);
        $url = "http://maps.google.com/maps/api/geocode/json?address={$address}";
        $resp_json = file_get_contents($url);
        $resp = json_decode($resp_json, true);
        if($resp['status']=='OK'){
            $lati = $resp['results'][0]['geometry']['location']['lat'];
            $longi = $resp['results'][0]['geometry']['location']['lng'];
            $formatted_address = $resp['results'][0]['formatted_address'];
            if($lati && $longi && $formatted_address){
                $data = array(
                   "latitude" => $lati, 
                   "longitude" => $longi, 
                   "address" => $formatted_address
                );
                return $data;
            }else{
                return false;
            }

        }else{
            return false;
        }
    }
}
