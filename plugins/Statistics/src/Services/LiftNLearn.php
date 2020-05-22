<?php

namespace Statistics\Services;

/**
 * Description of LiftNLearn
 *
 * @author Rauxmedia
 */
class LiftNLearn {

    public static function getOverall($campaign) {
        return [
            "lifts" => Statistics::getEventsHistogram("L", $campaign->id),
            "highlights" => self::getHighlights($campaign)
        ];
    }

    private static function getHighlights($campaign) {
        return array(
            "dwell_time" => Statistics::getDwellTime($campaign),
            "devices" => Statistics::getDevicesHistogram($campaign->id)
        );
    }

}
