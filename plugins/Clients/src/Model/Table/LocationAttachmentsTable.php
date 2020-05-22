<?php

namespace Clients\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of LocationAttachmentsTable
 *
 * @author Yaroslav
 */
class LocationAttachmentsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function upload($data) {
        $upload = $this->processUpload($data);
        if ($upload && isset($data["location_id"])) {
            $entity = $this->newEntity();
            $entity->location_id = $data["location_id"];
            $entity->url = $upload["url"];
            $this->save($entity);
            return $entity;
        } else {
            return false;
        }
    }

    public function multipleUpload($data, $location_id) {
        $success = false;
        $folderPath = WWW_ROOT . self::$location_attachments;
        if (isset($data["attachments"][0])) {
            foreach ($data["attachments"] as $file) {
                $entity = $this->addEntity($location_id, $this->storeFileAsUnique($file, $folderPath));
                $success = ($entity) ? true : false;
            }
        } else if(isset($data["attachments"])){
            $file = $data["attachments"];
            $entity = $this->addEntity($location_id, $this->storeFileAsUnique($file, $folderPath));
            $success = ($entity) ? true : false;
        }else{
            $success = true;
        }
        return $success;
    }

    private function addEntity($location_id, $uri) {
        $entity = false;
        if ($uri) {
            $entity = $this->newEntity();
            $entity->location_id = $location_id;
            $entity->url = self::$location_attachments . $uri;
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

    private function processUpload($data) {
        if (isset($data['file'])) {
            $file = $data['file'];
            $arr = explode('.', $file["name"]);
            $ext = strtolower($arr[count($arr) - 1]);
            $uri = uniqid() . '.' . $ext;
            return $this->uploadImageFile($file, $uri);
        } else {
            return false;
        }
    }

    private function uploadImageFile($file, $uri) {
        if (move_uploaded_file($file['tmp_name'], WWW_ROOT . self::$location_attachments . $uri)) {
            $data['url'] = self::$location_attachments . $uri;
            return $data;
        } else {
            return false;
        }
    }

}
