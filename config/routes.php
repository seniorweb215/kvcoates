<?php

/**
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * Routes are very important mechanism that allows you to freely connect
 * different URLs to chosen controllers and their actions (functions).
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
use Cake\Core\Plugin;
use Cake\Routing\RouteBuilder;
use Cake\Routing\Router;

/**
 * The default class to use for all routes
 *
 * The following route classes are supplied with CakePHP and are appropriate
 * to set as the default:
 *
 * - Route
 * - InflectedRoute
 * - DashedRoute
 *
 * If no call is made to `Router::defaultRouteClass()`, the class used is
 * `Route` (`Cake\Routing\Route\Route`)
 *
 * Note that `Route` does not do any inflections on URLs which will result in
 * inconsistently cased URLs when used with `:plugin`, `:controller` and
 * `:action` markers.
 *
 */
Router::defaultRouteClass('DashedRoute');

Router::scope('/', function (RouteBuilder $routes) {

    $routes->connect('/', ['controller' => 'Connie', 'action' => 'home']);
    $routes->connect('/dashboard', ['controller' => 'Connie', 'action' => 'dashboard']);
    $routes->connect('/swagger', ['controller' => 'Connie', 'action' => 'swagger']);


    /**
     * Connect catchall routes for all controllers.
     *
     * Using the argument `DashedRoute`, the `fallbacks` method is a shortcut for
     *    `$routes->connect('/:controller', ['action' => 'index'], ['routeClass' => 'DashedRoute']);`
     *    `$routes->connect('/:controller/:action/*', [], ['routeClass' => 'DashedRoute']);`
     *
     * Any route class can be used with this method, such as:
     * - DashedRoute
     * - InflectedRoute
     * - Route
     * - Or your own route class
     *
     * You can remove these routes once you've connected the
     * routes you want in your application.
     */
    $routes->fallbacks('DashedRoute');
});


Router::scope('/api', function ($routes) {
    $routes->connect('/blacklisted-clients/:action/*', ['controller' => 'BlacklistedClients']);
    $routes->connect('/bands/:action/*', ['controller' => 'Bands']);
    $routes->connect('/brands/:action/*', ['controller' => 'Brands']);
    $routes->connect('/campaigns/:action/*', ['controller' => 'Campaigns']);
    $routes->connect('/countries/:action/*', ['controller' => 'Countries']);
    $routes->connect('/displays/:action/*', ['controller' => 'Displays']);
    $routes->connect('/display-issues/:action/*', ['controller' => 'DisplayIssues']);
    $routes->connect('/support/:action/*', ['controller' => 'Support']);
    $routes->connect('/locations/:action/*', ['controller' => 'Locations']);
    $routes->connect('/mappings/:action/*', ['controller' => 'Mappings']);
    $routes->connect('/media/:action/*', ['controller' => 'Media']);
    $routes->connect('/notifications/:action/*', ['controller' => 'Notifications']);
    $routes->connect('/organisations/:action/*', ['controller' => 'Organisations']);
    $routes->connect('/manufacturers/:action/*', ['controller' => 'Manufacturers']);
    $routes->connect('/roles/:action/*', ['controller' => 'Roles']);
    $routes->connect('/stats/:action/*', ['controller' => 'Stats']);
    $routes->connect('/statistics/:action/*', ['controller' => 'Statistics']);
    $routes->connect('/users/:action/*', ['controller' => 'Users']);
    $routes->connect('/timezones/:action/*', ['controller' => 'Timezones']);
});
/**
 * Load all plugin routes.  See the Plugin documentation on
 * how to customize the loading of plugin routes.
 */
Plugin::routes();
