<?php
namespace System\Model\Entity;
/**
 * Description of Role
 *
 * @author Rauxmedia
 */
class RolePermission extends \Cake\ORM\Entity{
    
    protected $_hidden = ['role_id', "created", "modified"];
    
}
