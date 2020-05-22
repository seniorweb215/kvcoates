<?php
namespace DisplayIssues\Controller;

/**
 * Description of IOController
 *
 * @author Rauxmedia
 */

use App\Controller\AppController as AppBaseController;

class IOController extends AppBaseController{
    
    public function export(){
        $this->autoRender = false;
        $result = $this->DisplayIssues->export();
        $this->response->file($result['path'], ['download' => true, 'name' => $result['name']]);
    }
}
