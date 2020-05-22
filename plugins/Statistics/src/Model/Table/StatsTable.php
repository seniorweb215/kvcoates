<?php

namespace Statistics\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of StatsTable
 *
 * @author Rauxmedia
 */
class StatsTable extends AppTable {

    public function report($data) {
        $upload = $this->processUpload($data);
        if ($upload) {
            $entity = $this->newEntity();
            $entity->synced = true;
            $entity->uri = $upload["stat"];
            $this->save($entity);
            $this->syncLog($entity);
            return $entity;
        } else {
            return false;
        }
    }

    public function pending() {
        return $this->find()->where(["synced" => false])->all();
    }

    public function sync() {
        $pending = $this->pending();
        foreach ($pending as $log) {
            if ($this->syncLog($log)) {
                $log->synced = true;
                $this->save($log);
            }
        }
        return true;
    }

    private function syncLog($log) {
        $statisticsTable = \Cake\ORM\TableRegistry::get("Statistics.Statistics");
        $result = false;
        $handle = fopen(WWW_ROOT . $log->uri, "r") or die("Couldn't get handle");
        if ($handle) {
            while (!feof($handle)) {
                $buffer = fgets($handle, 4096);
                $values = explode(",", $buffer);
                if (count($values) == 7) {
                    $statisticsTable->add($this->parseValues($log->id, $values));
                }
            }
            fclose($handle);
            $result = true;
        }
        return $result;
    }

    private function parseValues($id, $values) {
        // displayId, campaignId, tag, interaction_time, datetime
        $data = [
            "stats_id" => $id,
            "app_version" => $values[6],
            "display_id" => ($values[0] == 'null') ? 0 : $values[0],
            "campaign_id" => $values[2],
            "tag" => $values[3],
            "interaction_time" => $values[4],
            "log_date" => \DateTime::createFromFormat('d/m/Y H:i', str_replace("\n", "", $values[5]))->format('Y-m-d H:i:s')
        ];
        return $data;
    }

    private function processUpload($data) {
        if (isset($data['file'])) {
            $file = $data['file'];
            $arr = explode('.', $file["name"]);
            $ext = strtolower($arr[count($arr) - 1]);
            $uri = uniqid() . '.' . $ext;

            if (move_uploaded_file($file['tmp_name'], WWW_ROOT . 'content' . DS . 'report' . DS . $uri)) {
                $data = array();
                $data["stat"] = 'content' . DS . 'report' . DS . $uri;
                return $data;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

}
