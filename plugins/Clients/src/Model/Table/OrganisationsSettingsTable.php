<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;
/**
 * Description of OrganisationsSettingsTable
 *
 * @author Rauxmedia
 */
class OrganisationsSettingsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function getSettings() {
        $settings = $this->find()->first();
        $settings->maintenance = json_decode($settings->maintenance, true);
        $settings->campaign = json_decode($settings->campaign, true);
        $settings->map = json_decode($settings->map, true);
        $settings->stats = json_decode($settings->stats, true);
        $settings->notification = json_decode($settings->notification, true);
        $settings->mailing = json_decode($settings->mailing, true);
        $settings->backup = json_decode($settings->backup, true);
        $settings->map_styles = \Cake\ORM\TableRegistry::get("Clients.OrganisationMapStyles")->find()->select(["id", "name"])->all();
        $settings->campaign_types = \Cake\ORM\TableRegistry::get("Campaigns.CampaignTypes")->find()->all();
        $settings->resolutions = \Cake\ORM\TableRegistry::get("Displays.Resolutions")->find()->all();
        return $settings;
    }

    public function pin($data) {
        if (isset($data['file'])) {
            $file = $data['file'];
            $uri = $data['uri'];
            if (move_uploaded_file($file['tmp_name'], WWW_ROOT . 'assets' . DS . 'img' . DS . 'maps' . DS . $uri)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    public function logo($data) {
        if (isset($data['file'])) {
            $file = $data['file'];
            $uri = $data['uri'];
            if (move_uploaded_file($file['tmp_name'], WWW_ROOT . 'assets' . DS . 'img' . DS . 'display-plan' . DS . $uri)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
