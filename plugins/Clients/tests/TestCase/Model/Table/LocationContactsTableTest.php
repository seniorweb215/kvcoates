<?php
namespace Clients\Test\TestCase\Model\Table;

use Cake\ORM\TableRegistry;
use Cake\TestSuite\TestCase;
use Clients\Model\Table\LocationContactsTable;

/**
 * Clients\Model\Table\LocationContactsTable Test Case
 */
class LocationContactsTableTest extends TestCase
{

    /**
     * Test subject
     *
     * @var \Clients\Model\Table\LocationContactsTable
     */
    public $LocationContacts;

    /**
     * Fixtures
     *
     * @var array
     */
    public $fixtures = [
        'plugin.clients.location_contacts',
        'plugin.clients.locations',
        'plugin.clients.location_schedules',
        'plugin.clients.organisations',
        'plugin.clients.countries',
        'plugin.clients.mobile_carriers',
        'plugin.clients.timezones',
        'plugin.clients.sizes',
        'plugin.clients.deployments',
        'plugin.clients.displays',
        'plugin.clients.scheduled_playbacks',
        'plugin.clients.campaigns',
        'plugin.clients.brands',
        'plugin.clients.resolutions',
        'plugin.clients.contents',
        'plugin.clients.media',
        'plugin.clients.campaign_locations',
        'plugin.clients.mappings',
        'plugin.clients.campaign_displays',
        'plugin.clients.display_attachments',
        'plugin.clients.display_issues',
        'plugin.clients.display_issue_attachments',
        'plugin.clients.display_issue_types',
        'plugin.clients.reporter',
        'plugin.clients.solver',
        'plugin.clients.location',
        'plugin.clients.location_attachments'
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
