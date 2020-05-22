<?php

namespace Statistics\Services;

/**
 * Description of Touch
 *
 * @author Rauxmedia
 */
class Touch {

    public static function getOverall($campaign) {
        return [
            "scan" => Statistics::getEventsHistogram("S", $campaign->id),
            "touch" =>  Statistics::getEventsHistogram("T", $campaign->id)
        ];
    }

}
