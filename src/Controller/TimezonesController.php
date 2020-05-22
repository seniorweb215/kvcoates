<?php
namespace App\Controller;

/**
 * Description of ZonesController
 *
 * @author Rauxmedia
 */
class TimezonesController extends AppController{
    
    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Timezones");
    }
    
    public function index(){
        $this->result["success"] = true;
        $this->result["data"] = $this->Timezones->all();
    }
    
    public function timezones($zid){
        $this->result["success"] = true;
        $this->result["data"] = [];
    }
    
    public function import(){
        $this->result["success"] = true;
        $this->result["data"] = $this->Timezones->import();
    }
    
}
