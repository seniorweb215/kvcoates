<?php
namespace Campaigns\Model\Entity;
/**
 * Description of Mappings
 *
 * @author Rauxmedia
 */
use Cake\ORM\Entity;

class Mapping extends Entity{
    protected $_hidden = ['id', 'campaign_id', 'created', 'modified'];
}
