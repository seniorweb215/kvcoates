<?php

namespace Displays\Services;
use \Cake\ORM\TableRegistry;
/**
 * Description of Content
 *
 * @author Rauxmedia
 */
class Content {
    
    
    public static function campaigns($id = null) {
        return self::getScheduledPlaybacks($id, 1);
    }

    public static function liftnlearn($id = null) {
        return self::getScheduledPlaybacks($id, 2);
    }

    public static function touch($id = null) {
        return self::getScheduledPlaybacks($id, 3);
    }
    
    public static function schedule($data = array()) {
        $scheduledPlayback = TableRegistry::get("Campaigns.ScheduledPlaybacks");
        if (!empty($data)) {
            $entity = $scheduledPlayback->newEntity();
            $scheduledPlayback->patchEntity($entity, $data);
            if ($scheduledPlayback->save($entity)) {
                return $entity;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    public static function history($id = null) {
        if ($id != null) {
            $scheduledPlaybacksTable = TableRegistry::get("Campaigns.ScheduledPlaybacks");
            $query = $scheduledPlaybacksTable->findByDisplayId($id);
            $query->contain(["Campaigns.Organisations", "Campaigns.Brands"]);
            return $query->all();
        } else {
            return false;
        }
    }
    
    private static function getScheduledPlaybacks($id = null, $type_id = null) {
        if ($id != null) {
            $scheduledPlayback = TableRegistry::get("Campaigns.ScheduledPlaybacks");
            $query = $scheduledPlayback->findByDisplayId($id);
            $query->contain(["Campaigns"]);
            $query->innerJoinWith('Campaigns', function ($q) use ($type_id) {
                return $q->where(['Campaigns.type_id' => $type_id]);
            });
            $playbacks = $query->all();
            return $playbacks;
        } else {
            return false;
        }
    }
}
