<?php
namespace Clients\Model\Table;
use App\Model\Table\AppTable;

class LocationContactsTable extends AppTable
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);
    }

    public function all() {
        return $this->find()->all();
    }
}
