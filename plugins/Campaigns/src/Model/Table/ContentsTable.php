<?php

namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;

/**
 * Description of ContentTable
 *
 * @author Rauxmedia
 */
class ContentsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['Campaigns.Media']
        ]);
    }

    public function feed($id) {
        $query = $this->findByFeedId($id);
        $query->contain(["Media"]);
        return $query->all();
    }
    
    
    public function duplicate($source_cid, $target_cid){
        $contents = $this->findByCampaignId($source_cid)->all();
        foreach($contents as $content){
            $ent = $this->newEntity(["campaign_id" => $target_cid, "media_id" => $content->media_id, "position" => $content->position]);
            $this->save($ent, ["checkExisting" => false]);
        }
    }

    public function pushContent($data) {
        $ent = $this->newEntity($data);
        if ($this->save($ent)) {
            $query = $this->findById($ent->id);
            $query->contain(["Media"]);
            return $query->first();
        } else {
            return false;
        }
    }

    public function removeAllByCampaignId($id) {
        $contents = $this->findByCampaignId($id)->all();
        foreach ($contents as $content) {
            $this->remove($content->id);
        }
    }

}
