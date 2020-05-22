<?php
namespace Campaigns\Model\Entity;

/**
 * Description of ScheduledPlayback
 *
 * @author Rauxmedia
 */
class ScheduledPlayback  extends \Cake\ORM\Entity{
    protected $_hidden = ['id', 'display_id', 'campaign_id', 'created', 'modified'];
}
