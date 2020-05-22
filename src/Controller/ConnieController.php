<?php
namespace App\Controller;



/**
 * Description of ConnieController
 *
 * @author Rauxmedia
 */

class ConnieController extends AppController{
    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("Clients.OrganisationsSettings");
        $this->loadModel("System.BlacklistedClients");
        $this->loadModel("System.SystemActions");
        $settings = $this->OrganisationsSettings->find()->first();

        $settings->maintenance = json_decode($settings->maintenance, true);
        $settings->campaign = json_decode($settings->campaign, true);
        $settings->map = json_decode($settings->map, true);
        $settings->stats = json_decode($settings->stats, true);
        $settings->notification = json_decode($settings->notification, true);
        $settings->mailing = json_decode($settings->mailing, true);
        $settings->backup = json_decode($settings->backup, true);
        
        $mapStyle = \Cake\ORM\TableRegistry::get("Clients.OrganisationMapStyles")->findById($settings->map["style"])->first();
        $settings->map["style"] = $mapStyle->style;
        $this->set("frontend");
        $this->set("title", $settings->title);
        $this->set("footer", $settings->footer);
        $this->set("latitude", $settings->map["latitude"]);
        $this->set("longitude", $settings->map["longitude"]);
        $this->set("zoom", $settings->map["zoom"]);
        $this->set("map", $settings->map);
        
        
        $this->set("maintenance", $settings->maintenance["on"]);
        $this->set("notification", $settings->notification);
        $this->set("system_actions", $this->SystemActions->find());
    }

    public function home() {
        if (!$this->BlacklistedClients->isBlacklisted($this->request->clientIp())) {
            $this->viewBuilder()->layout('cms');
        } else {
            $this->setAction('blacklisted');
        }
    }

    public function dashboard() {
        if (!$this->BlacklistedClients->isBlacklisted($this->request->clientIp())) {
            $this->viewBuilder()->layout('map');
        } else {
             $this->setAction('blacklisted');
        }
    }

    public function blacklisted() {
        $this->viewBuilder()->layout('blacklisted');
    }
    
    public function swagger() {
        $this->result = json_decode(file_get_contents(WWW_ROOT . 'swagger.json'));
        $this->json();
    }
    
}
