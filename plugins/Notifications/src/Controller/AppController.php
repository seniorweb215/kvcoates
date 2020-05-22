<?php

namespace Notifications\Controller;


class AppController extends NotificationsController{
    public function initialize() {
        parent::initialize();
        $this->loadModel("Notifications.Notifications");
    }

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
