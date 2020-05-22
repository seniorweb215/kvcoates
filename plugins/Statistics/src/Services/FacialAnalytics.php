<?php

namespace Statistics\Services;

/**
 * Description of FacialAnalytics
 *
 * @author Rauxmedia
 */
class FacialAnalytics {
    
    public static function getStats($cid, $displayId = null){
        return [
            "gender" => self::getGenderHistogram($cid, $displayId),
            "ethnicity" => self::getEthnicityHistogram($cid, $displayId),
            "emotions" => self::getEmotionsHistogram($cid, $displayId),
            "glasses" => self::getGlassesHistogram($cid, $displayId)
        ];
    }
    
    private static function getGenderHistogram($cid, $displayId = null){
        return [
            "male" => self::getAgeHistogram($cid, $displayId),
            "female" => self::getAgeHistogram($cid, $displayId)
        ];
    }
    private static function getAgeHistogram($cid, $displayId = null){
        return [
            "age_under_18" => 0,
            "age_18_to_24" => 0,
            "age_25_to_34" => 0,
            "age_35_to_44" => 0,
            "age_45_to_54" => 0,
            "age_55_to_64" => 0,
            "age_65_plus" => 0,
        ];
    }
    private static function getEthnicityHistogram($cid, $displayId = null){
        return [
            "caucasian" => 0,
            "black_african" => 0,
            "south_asian" => 0,
            "east_asian" => 0,
            "hispanic" => 0
        ];
    }
    private static function getEmotionsHistogram($cid, $displayId = null){
        return [];
    }
    
    private static function getGlassesHistogram($cid, $displayId = null){
        return [
            "glasses" => 0,
            "no_glasses" => 0
        ];
    }
    
    
    
    
}
