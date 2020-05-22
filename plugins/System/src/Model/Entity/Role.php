<?php
namespace System\Model\Entity;
/**
 * Description of Role
 *
 * @author Rauxmedia
 */
class Role extends \Cake\ORM\Entity{
    
    protected $_hidden = ['role_permissions'];
    protected $_virtual = ['permissions'];
    protected function _getPermissions()
    {
        return (isset($this->_properties['role_permissions'])) ? $this->_properties['role_permissions'] : [];
    }
}
