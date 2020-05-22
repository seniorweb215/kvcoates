<?php
namespace Displays\Controller;

/**
 * Description of ContentController
 *
 * @author Rauxmedia
 */
use Displays\Services\Content;

class ContentController extends BaseController{
    
    
    public function history($id = null) {
        $history = Content::history($id);
        if ($history) {
            $this->result["success"] = true;
            $this->result["data"] = $history;
        }
    }
    
    public function campaigns($id = null) {
        $history = Content::campaigns($id);
        if ($history) {
            $this->result["success"] = true;
            $this->result["data"] = $history;
        }
    }

    public function liftnlearn($id = null) {
        $history = Content::liftnlearn($id);
        if ($history) {
            $this->result["success"] = true;
            $this->result["data"] = $history;
        }
    }

    public function touch($id = null) {
        $history = Content::touch($id);
        if ($history) {
            $this->result["success"] = true;
            $this->result["data"] = $history;
        }
    }

    /* Schedule playback of any feed type */

    public function playback() {
        if ($this->request->is("post")) {
            $playback = Content::schedule($this->request->data);
            if ($playback) {
                $this->result["success"] = true;
                $this->result["data"] = $playback;
            }
        }
    }
}
