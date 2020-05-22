<?php
namespace Campaigns\Model\Entity;
/**
 * Description of Content
 *
 * @author Rauxmedia
 */

class Content extends \Cake\ORM\Entity{
    protected $_hidden = ['campaign_id', 'media_id', 'created', 'modified'];
}
