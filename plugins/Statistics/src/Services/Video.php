<?php

namespace Statistics\Services;

/**
 * Description of Video
 *
 * @author Rauxmedia
 */
class Video {
    public static function getOverall($campaign) {
        return ["playbacks" =>  Statistics::getEventsHistogram("PLV", $campaign->id)];
    }
}
