<?php

namespace App\Model\Table;

use Cake\ORM\Table;
/**
 * Description of AppTable
 *
 * @author Rauxmedia
 */
class AppTable extends Table{
    
    protected static $display_attachments = "attachments" . DS . "displays" . DS;
    protected static $support_attachments = "attachments" . DS . "support" . DS;
    protected static $location_attachments = "images" . DS . "locations" . DS;
    
    public function initialize(array $config) {
        parent::initialize($config);
        $this->addBehavior('Timestamp');
    }
    /**
     * Finds in the database all the entities of the especific 
     * Table class, which instance is being used to call this method.
     * @return array Returns an array of entity objects
     */
    public function all() {
        return $this->find('all')->all();
    }
    
    /**
     * Searchs for entity in database.
     * @param integer $id The unique identifier of the entity.
     * @return object|false Returns the entity as an object if found
     * or false when if an error has occurred.
     */
    public function view($id) {
        $query = $this->findById($id);
        
        if(!$query->isEmpty()) {
            return $query->first();
        }
        
        return false;
    }
    
    /**
     * Removes entity from the database.
     * @param integer $id The unique identifier of the entity.
     * @return boolean Returns true when the operation was successful
     * or false otherwise.
     */
    public function remove($id) {
        $entity = $this->view($id);
        
        if($entity === false) {
            return false;
        }
        
        return $this->delete($entity);
    }
    
    /**
     * This method takes HTTP form data and creates  
     * a new entity with it. 
     * @param array $data The HTTP form data.
     * @return object|false The newly created entity or 
     * false if an error has ocurred.
     */
    public function add($data = array()) {
        $entity = $this->newEntity($data);
        if ($this->save($entity)) {
            return $entity;
        }
        
        return false;
    }
    
    /**
     * This method updates an existing entity using 
     * HTTP form data.
     * @param integer The unique identifier of the entity.
     * @param array $data The HTTP form data.
     * @return object|false The updated entity or 
     * false if an error has ocurred.
     */
    public function update($id, $data = array()) {
        $query = $this->findById($id);
        if($query->isEmpty()) {
            return false;
        }
        
        $entity = $query->first();
        $this->patchEntity($entity, $data);
        if ($this->save($entity)) {
            return $entity;
        }   
        return false;
    }
}
