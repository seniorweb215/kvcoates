<?php
namespace App\Test\TestCase\Model\Table;

use App\Model\Table\LocationContactsTable;
use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;

/**
 * App\Model\Table\LocationContactsTable Test Case
 */
class LocationContactsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \App\Model\Table\LocationContactsTable
     */
    public $LocationContacts;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'app.location_contacts',
        'app.locations'
    ];

    /**
     * setUp method
     *
     * @return void
     */
    public function setUp()
    {
        parent::setUp();
        $config = TableRegistry::exists('LocationContacts') ? [] : ['className' => LocationContactsTable::class];
        $this->LocationContacts = TableRegistry::get('LocationContacts', $config);
    }

    /**
     * tearDown method
     *
     * @return void
     */
    public function tearDown()
    {
        unset($this->LocationContacts);

        parent::tearDown();
    }

    /**
     * Test initialize method
     *
     * @return void
     */
    public function testInitialize()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test validationDefault method
     *
     * @return void
     */
    public function testValidationDefault()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }

    /**
     * Test buildRules method
     *
     * @return void
     */
    public function testBuildRules()
    {
        $this->markTestIncomplete('Not implemented yet.');
    }
}
