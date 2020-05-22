<?php

namespace DisplayIssues\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of DisplayIssueAttachmentsTable
 *
 * @author Rauxmedia
 */
class DisplayIssueAttachmentsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function upload($data) {
        $upload = $this->processUpload($data);
        if ($upload && isset($data["display_issue_id"])) {
            $entity = $this->newEntity();
            $entity->display_issue_id = $data["display_issue_id"];
            $entity->url = $upload["url"];
            $this->save($entity);
            return $entity;
        } else {
            return false;
        }
    }

    public function multipleUpload($data, $display_issue_id) {
        $success = false;
        $folderPath = WWW_ROOT . self::$support_attachments;
        if (isset($data["attachments"][0])) {
            foreach ($data["attachments"] as $file) {
                $entity = $this->addEntity($display_issue_id, $this->storeFileAsUnique($file, $folderPath));
                $success = ($entity) ? true : false;
            }
        } else if(isset($data["attachments"])){
            $file = $data["attachments"];
            $entity = $this->addEntity($display_issue_id, $this->storeFileAsUnique($file, $folderPath));
            $success = ($entity) ? true : false;
        }else{
            $success = true;
        }
        return $success;
    }

    private function addEntity($display_issue_id, $uri) {
        $entity = false;
        if ($uri) {
            $entity = $this->newEntity();
            $entity->display_issue_id = $display_issue_id;
            $entity->url = self::$support_attachments . $uri;
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
        if (move_uploaded_file($file['tmp_name'], WWW_ROOT . self::$support_attachments . $uri)) {
            $data['url'] = self::$support_attachments . $uri;
            return $data;
        } else {
            return false;
        }
    }

}
