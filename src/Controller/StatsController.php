<?php

namespace App\Controller;

/**
 * Description of StatsController
 *
 * @author Rauxmedia
 */
class StatsController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("Statistics.Stats");
    }

    public function report() {
        if ($this->request->is("post")) {
            $response = $this->Stats->report($this->request->data);
            if ($response) {
                $this->result["success"] = true;
                $this->result["data"] = $response;
            } else {
                $this->result["data"] = "No file was attached";
            }
        }
    }

    public function sync() {
        set_time_limit(0);
        $this->result["success"] = $this->Stats->sync();
    }

    public function pending() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Stats->pending();
    }
}
