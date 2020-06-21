<?php

namespace Clients\Controller;
use Cake\Console\Shell;
use Cake\Console\ShellDispatcher;
/**
 * Description of OrganisationsController
 *
 * @author Rauxmedia
 */
class OrganisationsController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("Clients.Organisations");
    }

    
    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Organisations->all();
    }
    
    
    public function bycountry($id = 0){
        $this->result["success"] = true;
        $this->result["data"] = $this->Organisations->filterByCountry($id);
    }

    /*to be deprecated*/
    public function countries() {
        $this->loadModel("System.Countries");
        $this->result["success"] = true;
        $this->result["data"] = $this->Countries->all();
    }

    public function add() {
        if ($this->request->is("post")) {
            $org = $this->Organisations->add($this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function remove() {
        if ($this->request->is("post")) {
            $org = $this->Organisations->remove($this->request->data("id"));
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function update() {
        if ($this->request->is("post")) {
            $org = $this->Organisations->update($this->request->data["id"], $this->request->data);
            if ($org) {
                $this->result["success"] = true;
                $this->result["data"] = $org;
            }
        }
    }

    public function settings() {
        $this->loadModel("Clients.OrganisationsSettings");
        
        if ($this->request->is("post")) {
            $temp = $this->request->data;
            $temp['maintenance'] = json_encode($temp['maintenance']);
            $temp['campaign'] = json_encode($temp['campaign']);
            $temp['map'] = json_encode($temp['map']);
            $temp['stats'] = json_encode($temp['stats']);
            $temp['notification'] = json_encode($temp['notification']);
            $temp['mailing'] = json_encode($temp['mailing']);
            $temp['backup'] = json_encode($temp['backup']);
            
            $settings = $this->OrganisationsSettings->add($temp);
            if ($settings) {
                $this->result["success"] = true;
                $this->result["data"] = $settings;
            }
        } else {
            $this->result["success"] = true;
            $this->result["data"] = $this->OrganisationsSettings->getSettings();
        }
    }
    
    public function map() {
        $this->loadModel("Clients.OrganisationMapStyles");
        if ($this->request->is("post")) {
            $settings = $this->OrganisationMapStyles->add($this->request->data);
            if ($settings) {
                $this->result["success"] = true;
                $this->result["data"] = $settings;
            }
        } else {
            $this->result["success"] = true;
            $this->result["data"] = $this->OrganisationMapStyles->all();
        }
    }
    
    public function pin() {
        $this->loadModel("Clients.OrganisationsSettings");
        if ($this->request->is("post")) {
            $settings = $this->OrganisationsSettings->pin($this->request->data);
            if ($settings) {
                $this->result["success"] = true;
                $this->result["data"] = $settings;
            }
        } 
    }
    public function logo() {
        $this->loadModel("Clients.OrganisationsSettings");
        if ($this->request->is("post")) {
            $settings = $this->OrganisationsSettings->logo($this->request->data);
            if ($settings) {
                $this->result["success"] = true;
                $this->result["data"] = $settings;
            }
        } 
    }

    public function togglecampaigntype($id = null) {
        $this->loadModel("Campaigns.CampaignTypes");
        $this->result["success"] = true;
        $this->result["data"] = $this->CampaignTypes->toggle($id);
    }

}
