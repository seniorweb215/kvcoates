<?php

namespace Notifications\Model\Messaging;
use paragraph1\phpFCM\Client;
use paragraph1\phpFCM\Message;
use paragraph1\phpFCM\Recipient\Device;
use paragraph1\phpFCM\Notification;

/**
 * Description of FirebaseCloudMessaging
 *
 * @author Rauxmedia
 */
class FirebaseCloudMessaging {
    static $apiKey = "AAAAE8ImTUU:APA91bGb0ryhEeC3do73F3cQlWmD74hkbHOwAcSwugJgBB_oDOlQuiOJhpOFbXwCsBdXIAjQr5AMkWLoePWZdR3O1tQeXtsc1SIFvvJcViRYxXGyYyPHPxfg8wPWKkjgTwkhcXkxTeOOjPBr5FzK76bA3Tm5og3lvw";
    public static function push($to /*Device Token*/, $title, $body, $data) {
        $client = new Client();
        $client->setApiKey(self::$apiKey);
        $client->injectHttpClient(new \GuzzleHttp\Client());
        $note = new Notification($title, $body);
        $note->setIcon('notification_icon_resource_name')
                ->setColor('#ffffff')
                ->setBadge(1);
        $message = new Message();
        $message->addRecipient(new Device($to));
        $message->setNotification($note)
                ->setData($data);
        $response = $client->send($message);
        return $response->getStatusCode();
    }

}
