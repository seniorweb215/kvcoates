<?php

namespace DisplayIssues\Controller;

/**
 * Description of BaseController
 *
 * @author Rauxmedia
 */
class BaseController extends IOController{
    public function formdata(){
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayIssues->formdata();
    }
    
    public function data(){
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayIssues->data();
    }

    public function all() {
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayIssues->all();
    }
    
    public function profile($id = null){
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayIssues->profile($id);
    }

    public function add() {
        if ($this->request->is("post")) {
            $issue = $this->DisplayIssues->add($this->request->data);
            if ($issue) {
                $this->result["success"] = true;
                $this->result["data"] = $issue;
            }
        }
    }
    public function remove() {
        if ($this->request->is("post")) {
            
        }
    }
}
