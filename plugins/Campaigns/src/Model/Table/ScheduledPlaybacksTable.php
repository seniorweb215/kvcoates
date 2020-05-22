<?php

namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of ScheduledPlaybacksTable
 *
 * @author Rauxmedia
 */
class ScheduledPlaybacksTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['Campaigns.Campaigns', 'Displays.Displays']
        ]);
    }

    public function me($displayId) {
        $q = $this->findByDisplayId($displayId);
        $q->contain(["Campaigns.Contents.Media" => function($q){
            //return ($zipped) ? $q->select(["filename", "url"])->where(["media_type" => 2]) : $q->select(["filename", "url"]);
            return $q->select(["filename", "url", "media_type"]);
        },"Campaigns.Contents" => function($q){
            return  $q->order(['position' => 'ASC']);
        },"Campaigns" => function($q){
            return $q->select(["id", "type_id", "set_as_default", "has_facial_analytics", "tod", "start", "end"])->where(["Campaigns.status" => 1]);
        }]);
        $q->where(["date(ScheduledPlaybacks.end) >= curdate()"]); // and time(ScheduledPlaybacks.end) > curtime()
        $playbacks = $q->all();
        $campaigns = array();
        foreach ($playbacks as $playback){
            $campaign = $playback->campaign;
            if($campaign != null){
                $contents = array();
                foreach ($campaign->contents as $content){
                    if($campaign->type_id == 1){
                        array_push($contents, $content->media);
                    }elseif($campaign->type_id == 2 && $content->media->media_type == 2){
                        array_push($contents, $content->media);
                    }elseif($campaign->type_id == 3 && $content->media->media_type == 2){
                        array_push($contents, $content->media);
                    }
                }
                $campaign->contents = $contents;
                array_push($campaigns, $playback->campaign);
            }
        }
        return $campaigns;
    }

    public function vr($displayId) {
        $query = $this->findByDisplayId($displayId);
        $query->where(["date(ScheduledPlaybacks.end) >= curdate()"]);
        $query->contain(["Campaigns.Contents.Media" => function($q){
            return $q->select(["filename", "url"]);
        }, 'Campaigns' => function ($q) {
            return $q->select(["id", "type_id", "set_as_default", "start", "end"])->where(['Campaigns.type_id' => 4, "Campaigns.status" => 1]); 
        }]);
      
        $playbacks = $query->all();
        $campaigns = array();
        foreach ($playbacks as $playback){
            $campaign = $playback->campaign;
            if($campaign != null){
                $contents = array();
                foreach ($campaign->contents as $content){
                    array_push($contents, $content->media);
                }
                $campaign->contents = $contents;
                array_push($campaigns, $playback->campaign);
            }
        }
        return $campaigns;
    }

    public function overlaps($displayId, $campaign) {
        $query = $this->findByDisplayId($displayId);
        $date = date_format($campaign->start, "Y-m-d H:i:s");
        $query->where(["ScheduledPlaybacks.end > '" . $date ."'", "ScheduledPlaybacks.status" => 1]);
        $query->contain(["Campaigns"]);
        $query->innerJoinWith('Campaigns', function ($q) {
            return $q->where(['Campaigns.set_as_default' => 0, 'Campaigns.tod' => 0]);
        });
        return $query->all();
    }

    public function removeAllByCampaignId($id) {
        $playbacks = $this->findByCampaignId($id)->all();
        foreach ($playbacks as $playback) {
            $this->remove($playback->id);
        }
    }
    
    
    
    
    public function scheduleIfNotFound($display_id, $campaign){
        $scheduled = $this->find()->where(["display_id" => $display_id, "campaign_id" => $campaign->id])->first();
        if(!$scheduled){
            $scheduled = $this->add(["display_id" => $display_id, 
                "campaign_id" => $campaign->id,
                "start" => $campaign->start,
                "end" => $campaign->end]);
        }
        return $scheduled;
    }
    
    
    public function stop($cid){
        $this->updateAll(
            ['status' => 2], 
            ['campaign_id' => $cid]); 
    }
    
    public function remove($cid){
        $this->updateAll(
            ['status' => 3], 
            ['campaign_id' => $cid]); 
    }
}
