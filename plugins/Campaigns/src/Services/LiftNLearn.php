<?php

namespace Campaigns\Services;

/**
 * Description of LiftNLearn
 *
 * @author Rauxmedia
 */
class LiftNLearn {

    public static function zip($campaign) {
        $path = WWW_ROOT . 'content' . DS . 'temp';
        mkdir($path, 0777, true);
        self::writeOverrides($path, $campaign);
        self::writeContents($path, $campaign);
        return self::generateZipArchive($path, $campaign); 
    }

    private static function writeOverrides($path, $campaign) {
        $overrides = fopen($path . DS . "overrides.xml", "w") or die("Unable to open file!");
        $face_detection = ($campaign->has_facial_detection) ? "1" : "0";
        $facial_analytics = ($campaign->has_facial_analytics) ? "1" : "0";
        $xml = '<overrides>';
        $xml .= '<facial_analytics enabled="' . $facial_analytics . '" />';
        $xml .= '<face_detection enabled="' . $face_detection . '" />';
        $xml .= '</overrides>';
        fwrite($overrides, $xml);
        fclose($overrides);
    }

    private static function writeContents($path, $campaign) {
        $counter = 0;
        foreach ($campaign->contents as $content) {
            $media = $content->media;
            if ($counter == 0) {
                copy(WWW_ROOT . $media->url, $path . DS . "0.mp4");
            } else {
                $subpath = $path . DS . strval($content->position);
                mkdir($subpath, 0777, true);
                copy(WWW_ROOT . $media->url, $subpath . DS . $media->filename);
                self::copyImage($subpath, $content);
            }
            $counter++;
        }
    }

    private static function generateZipArchive($path, $campaign) {
        $rootPath = realpath($path);
        $filename = "lift-n-learn-" . $campaign->id . ".zip";
        $filepath = 'content' . DS . 'archives' . DS . $filename;
        $zip = new \ZipArchive();
        $zip->open(WWW_ROOT . $filepath, \ZipArchive::CREATE | \ZipArchive::OVERWRITE);
        // Create recursive directory iterator
        /** @var SplFileInfo[] $files */
        $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($rootPath), \RecursiveIteratorIterator::LEAVES_ONLY
        );
        foreach ($files as $name => $file) {
            // Skip directories (they would be added automatically)
            if (!$file->isDir()) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($rootPath) + 1);
                $zip->addFile($filePath, $relativePath);
            }
        }
        $zip->close();
        self::deleteTemp($path);
        return array("filename" => $filename, "filepath" => $filepath);
    }

    private static function copyImage($path, $content) {
        $media = $content->media;
        $a = explode(".", $media->thumb_name);
        $b = explode(".", $media->filename);
        if ($a[0] != $b[0]) {
            copy(WWW_ROOT . $media->thumb, $path . DS . $media->thumb_name);
        }
    }

    private static function deleteTemp($dir) {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (filetype($dir . "/" . $object) == "dir")
                        self::deleteTemp($dir . "/" . $object);
                    else
                        unlink($dir . "/" . $object);
                }
            }
            reset($objects);
            rmdir($dir);
        }
    }

}
