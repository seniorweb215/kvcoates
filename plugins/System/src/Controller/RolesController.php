<?php

namespace System\Controller;

/**
 * Description of RolesController
 *
 * @author Rauxmedia
 */
class RolesController extends AppController {

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
        $this->loadModel("System.Roles");
    }

    public function index() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Roles->all();
    }

    public function sync() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Roles->sync();
    }

    public function systemactions() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Roles->getSystemActions();
    }

    public function dashboard() {
        $this->result["success"] = true;
        $this->result["data"] = $this->Roles->getDashboard();
    }

    public function permission() {
        if ($this->request->is("post")) {
            $this->result["success"] = true;
            $this->result["data"] = $this->Roles->updatePermission($this->request->data);
        }
    }

}
