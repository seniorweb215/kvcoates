<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;
/**
 * Description of OrganisationUsersTable
 *
 * @author Rauxmedia
 */
class OrganisationUsersTable extends AppTable{
    public function initialize(array $config) {
        parent::initialize($config);
        $this->addAssociations([
            'belongsTo' => ['Clients.Users', 'Clients.Organisations'],
        ]);
    }
    
    
    public function findMyOrganisation($user_id){
        $orgUser = $this->findByUserId($user_id)->first();
        if($orgUser){
            return $orgUser->organisation_id;
        }else{
            return 0;
        }
    }
}
