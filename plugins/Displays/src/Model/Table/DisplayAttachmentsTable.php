<?php
namespace Displays\Model\Table;

use App\Model\Table\AppTable;
/**
 * Description of DisplayPicturesTable
 *
 * @author Rauxmedia
 */
class DisplayAttachmentsTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
    }

    

    public function multipleUpload($data, $display_id) {
        $success = false;
        $folderPath = WWW_ROOT . self::$display_attachments;
        if (isset($data["pictures"][0])) {
            foreach ($data["pictures"] as $file) {
                $entity = $this->addEntity($display_id, $this->storeFileAsUnique($file, $folderPath));
                $success = ($entity) ? true : false;
            }
        } else if(isset($data["pictures"])){
            $file = $data["pictures"];
            $entity = $this->addEntity($display_id, $this->storeFileAsUnique($file, $folderPath));
            $success = ($entity) ? true : false;
        }else{
            $success = true;
        }
        return $success;
    }
    
    private function addEntity($display_id, $uri) {
        $entity = false;
        if ($uri) {
            $entity = $this->newEntity();
            $entity->display_id = $display_id;
            $entity->url = self::$display_attachments . $uri;
            $this->save($entity);
        }
        return $entity;
    }

    private function storeFileAsUnique($file, $folderPath) {
        if (isset($file['name']) && isset($file['tmp_name'])) {
            $name = $file['name'];
            $arr = explode('.', $name);
            $extension = strtolower($arr[count($arr) - 1]);
            $uri = uniqid() . '.' . $extension;
            if (!move_uploaded_file($file['tmp_name'], $folderPath . $uri)) {
                return false;
            }
            return $uri;
        } else {
            return false;
        }
    }
}
