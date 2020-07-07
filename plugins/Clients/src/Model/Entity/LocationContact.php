<?php
namespace Clients\Model\Entity;

use Cake\ORM\Entity;

/**
 * LocationContact Entity
 *
 * @property int $id
 * @property int $location_id
 * @property string $name
 * @property string $password
 * @property string $email
 * @property string $tel
 * @property int $commission
 * @property string $note
 * @property \Cake\I18n\FrozenTime $created
 * @property \Cake\I18n\FrozenTime $modified
 *
 * @property \Clients\Model\Entity\Location $location
 */
class LocationContact extends Entity
{
    /**
     * Fields that are excluded from JSON versions of the entity.
     *
     * @var array
     */
    protected $_hidden = [
        'created', 'modified'
    ];
}
