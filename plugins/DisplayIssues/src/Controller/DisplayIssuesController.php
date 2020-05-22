<?php

namespace DisplayIssues\Controller;

/**
 * Description of DisplayIssuesController
 *
 * @author Rauxmedia
 */
class DisplayIssuesController extends BaseController{


    public function display($display_id) {
        $this->result["success"] = true;
        $this->result["data"] = $this->DisplayIssues->display($display_id);
    }
    
    public function attach() {
        if ($this->request->is("post")) {
            $this->loadModel("DisplayIssues.DisplayIssueAttachments");
            $attachment = $this->DisplayIssueAttachments->upload($this->request->data);
            if ($attachment) {
                $this->result["success"] = true;
                $this->result["data"] = $attachment;
            }
        }
    }
}
