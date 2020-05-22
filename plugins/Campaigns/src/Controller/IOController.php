<?php

namespace Campaigns\Controller;

/**
 * Description of IOController
 *
 * @author Rauxmedia
 */
use App\Controller\AppController as AppBaseController;
use Campaigns\Services\IO;

class IOController extends AppBaseController {

    public function import() {
        $this->result["success"] = false;
    }

    public function export() {
        $this->autoRender = false;
        $result = IO::export();
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }

    public function report($cid) {
        $this->autoRender = false;
        $result = IO::report($cid);
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }

    public function download($id) {
        $this->autoRender = false;
        $result = IO::download($id);
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }

    public function zip($id) {
        $this->result["success"] = true;
        $this->result["data"] = IO::zip($id);
    }

}
