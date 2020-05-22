<?php

namespace DisplayIssues\Controller;

class AppController extends DisplayIssuesController{
    
    public function initialize() {
        parent::initialize();
        $this->loadModel("DisplayIssues.DisplayIssues");
    }

    public function beforeFilter(\Cake\Event\Event $event) {
        parent::beforeFilter($event);
    }
}
