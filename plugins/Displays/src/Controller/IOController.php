<?php
namespace Displays\Controller;

/**
 * Description of IOController
 *
 * @author Rauxmedia
 */

use App\Controller\AppController as AppBaseController;
use Displays\Services\IO;

class IOController extends AppBaseController{

    public function import() {
        if ($this->request->is("post")) {
            $campaigns = IO::import($this->request->data);
            if ($campaigns) {
                $this->result["success"] = true;
                $this->result["data"] = $campaigns;
            }
        }
    }

    public function export() {
        $this->autoRender = false;
        $result = IO::export();
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }
    
    public function report() {
        $this->autoRender = false;
        $data = array();
        $data["type"] = $this->request->query["type"];
        $data["org_id"] = $this->request->query["org_id"];
        $data["start"] = $this->request->query["start"];
        $data["end"] = $this->request->query["end"];
        $result = IO::report($data);
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }

}
