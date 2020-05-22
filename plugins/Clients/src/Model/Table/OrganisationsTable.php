<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;
/**
 * Description of OrganisationsTable
 *
 * @author Rauxmedia
 */
class OrganisationsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['System.Countries'],
            'hasMany' => ['Clients.Locations']
        ]);
    }
    
    
    public function getSupportedValues() {
        $values = array();
        $entities = $this->find()->all();
        foreach($entities as $entity){
            array_push($values, $entity->name);
        }
        return $values;
    }

    public function all() {
        $query = $this->find();
        $query->contain(["Countries", "Locations.Deployments.Displays"]);
        return $query->all();
    }
    
    
    public function filterByCountry($id = 0){
        $query = $this->find();
        if($id != 0){
            $query->where(["country_id" => $id]);
        }
        $query->contain(["Countries", "Locations"]);
        return $query->all();
    }
    
    public function addIfNonExisting($name, $country_id){
        $data = ["name" => $name, "country_id" => $country_id];
        $org = $this->find()->where($data)->first();
        if(!$org){
            $org = $this->newEntity($data);
            $this->save($org);
        }
        return $org;
    }

}
