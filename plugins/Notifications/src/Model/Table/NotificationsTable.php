<?php

namespace Notifications\Model\Table;
use App\Model\Table\AppTable;
use Notifications\Model\Messaging\FirebaseCloudMessaging;

/**
 * Description of NotificationsTable
 *
 * @author Rauxmedia
 */
class NotificationsTable extends AppTable {

    public function push($data) {
        if (isset($data["display_id"])) {
            $display = \Cake\ORM\TableRegistry::get("Displays.Displays")->findById($data["display_id"])->first();
            if ($display && $display->token != "") {
                $n = $this->getNotificationData($data["type"]);
                FirebaseCloudMessaging::push($display->token, $n["title"], $n["body"], $n["data"]);
                $entity = $this->newEntity($data);
                $this->save($entity);
                return $entity;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function getNotificationData($type) {
        $notification = array("title" => "Display Plan", "body" => "Remote request");
        switch ($type) {
            case 1:
                $data = array("key" => "", "action" => "content_update");
                break;
            default :
                $data = array("key" => "", "action" => "get_stats");
                break;
        }
        $notification["data"] = $data;
        return $notification;
    }

}
