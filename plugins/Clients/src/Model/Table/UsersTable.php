<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;
use Cake\Auth\DefaultPasswordHasher;

/**
 * Description of UsersTable
 *
 * @author Rauxmedia
 */
class UsersTable extends AppTable {

    public static $super_admin = 1;
    public static $admin = 2;
    public static $user = 3;
    
    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'hasOne' => ['Clients.OrganisationUsers'],
            'belongsTo' => ['System.Roles', 'System.Countries']
        ]);
    }

    public function sso($request) {
        $data = $request->data;
        $query = $this->find();
        $query->contain(["Roles.RolePermissions.SystemActions"]);
        $query->where(["username" => $data["username"]]);
        
        $user = $query->first();
        if (!empty($user) && (new DefaultPasswordHasher)->check($data["password"], $user->password)) {
            $orgUsersTable = \Cake\ORM\TableRegistry::get("Clients.OrganisationUsers");
            \Cake\ORM\TableRegistry::get("Clients.UserActions")->log($user->id, 1, $request->clientIp());
            
            return [
                "user" => $user,
                "organisation_id" => $orgUsersTable->findMyOrganisation($user->id)
            ];
        } else {
            return false;
        }
    }
    
    public function signin($request) {
        $data = $request->data;
        $query = $this->find();
        $query->where(["username" => $data["username"]]);
        
        $user = $query->first();
        if (!empty($user) && (new DefaultPasswordHasher)->check($data["password"], $user->password)) {
            //$orgUsersTable = \Cake\ORM\TableRegistry::get("OrganisationUsers");
            //$user->organisation_id =  $orgUsersTable->findMyOrganisation($user->id);
            \Cake\ORM\TableRegistry::get("Clients.UserActions")->log($user->id, 1, $request->clientIp());
            $response = array("id" => $user->id, "full_name" => $user->first_name . " " . $user->last_name, "identifier" => $user->password);
            return $response;
        } else {
            return false;
        }
    }
    
    public function myLocation($request) {
        $data = $request->data;
        $user = $this->find()->where(["password" => $data["identifier"]])->first(); 
        if (!empty($user) && isset($data["latitude"]) && isset($data["longitude"])) {
            $location = new \stdClass();
            $location->latitude = $data["latitude"];
            $location->longitude = $data["longitude"];
            $user->location = $location;
            $this->save($user);
            return true;
        } else {
            return false;
        }
    }
    
    public function locations(){
        return $this->find()->where(['JSON_EXTRACT(location, "$.latitude") != "0"', 'JSON_EXTRACT(location, "$.longitude") != "0"'])->all();
    }
    
    

    public function all() {
        $query = $this->find();
        $query->contain(["OrganisationUsers.Organisations", "Roles", "Countries"]);
        return $query->all();
    }

    public function add($data = array()) {
        $user = $this->newEntity([
            "first_name" => $data["first_name"],
            "last_name" => $data["last_name"],
            "username" => $data["username"],
            "password" => $data["password"],
            "role_id" => $data["role_id"],
            "country_id" => $data["country_id"],
            "status" => $data["status"]
        ]);
        
        if ($this->save($user)) {
            $orgUsersTable = \Cake\ORM\TableRegistry::get("Clients.OrganisationUsers");
            $orgUser = $orgUsersTable->newEntity(["user_id" => $user->id,
                "organisation_id" => $data["organisation_id"]]);
            if ($orgUsersTable->save($orgUser)) {
                return $user;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    
    public function remove($id) {
        $user = parent::remove($id);
        if($user){
            $orgUsersTable = \Cake\ORM\TableRegistry::get("Clients.OrganisationUsers");
            $orguser = $orgUsersTable->findByUserId($id)->first();
            $orgUsersTable->delete($orguser);
        }
        
        return $user;
    }

}
