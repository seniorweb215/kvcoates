<?php
namespace Displays\Controller;
/**
 * Description of DisplaysController
 *
 * @author Rauxmedia
 */
use Displays\Services\Deployment;

class DisplaysController extends ClientApplicationController {

    public function deploy() {
        if ($this->request->is("post")) {
            $deployment = Deployment::deploy($this->request->data);
            if ($deployment) {
                $this->result["success"] = true;
                $this->result["data"] = $deployment;
            }
        }
    }

    public function undeploy() {
        if ($this->request->is("post")) {
            $deployment = Deployment::undeploy($this->request->data);
            if ($deployment) {
                $this->result["success"] = true;
                $this->result["data"] = $deployment;
            }
        }
    }

    public function undeployed() {
        $this->result["success"] = true;
        $this->result["data"] = Deployment::getUndeployed();
    }

    
    public function powerhistory($id = null) {
        $history = $this->Displays->powerHistory($id);
        if ($history) {
            $this->result["success"] = true;
            $this->result["data"] = $history;
        }
    }

}
