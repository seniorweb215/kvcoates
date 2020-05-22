<?php

namespace System\Model\Table;
use App\Model\Table\AppTable;
/**
 * Description of BlacklistedClientsTable
 *
 * @author Rauxmedia
 */
class BlacklistedClientsTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function isBlacklisted($ip) {
        return $this->findByIp($ip)->first();
    }

}
