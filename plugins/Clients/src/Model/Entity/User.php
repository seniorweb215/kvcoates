<?php
namespace Clients\Model\Entity;

/**
 * Description of User
 *
 * @author Rauxmedia
 */
use Cake\Auth\DefaultPasswordHasher;
use Cake\ORM\Entity;

class User extends Entity{
    protected $_hidden = ['password', 'created', 'modified'];
    protected function _setPassword($password)
    {
        return (new DefaultPasswordHasher)->hash($password);
    }

}
