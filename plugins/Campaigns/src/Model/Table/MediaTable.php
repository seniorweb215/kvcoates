<?php

namespace Campaigns\Model\Table;

use App\Model\Table\AppTable;
use Cake\Filesystem\File;

/**
 * Description of MediaTable
 *
 * @author Rauxmedia
 */
class MediaTable extends AppTable {

    public function initialize(array $config) {
        parent::initialize($config);
    }

    public function upload($data) {
        $upload = $this->processUpload($data);
        if ($upload && !isset($data["media_id"])) {
            $entity = $this->newEntity();
            $entity->media_type = $upload["media_type"];
            $entity->organisation_id = $data["organisation_id"];
            $entity->filename = $upload["filename"];
            $entity->thumb_name = $upload["thumb_name"];
            $entity->thumb = $upload["thumb"];
            $entity->thumb_size = $upload["thumb_size"];
            $entity->dimension = $upload["dimension"];
            $entity->duration = $upload["duration"];
            $entity->size = $data["filesize"];
            $entity->fps = $upload["fps"];
            $entity->url = $upload["uri"];
            $this->save($entity);
            return $entity;
        }elseif ($upload && isset($data["media_id"])){
            return $upload;
        }else {
            return false;
        }
    }

    private function processUpload($data) {
        if (isset($data['file'])) {
            $file = $data['file'];
            $arr = explode('.', $file["name"]);
            $ext = strtolower($arr[count($arr) - 1]);
            $uri = uniqid() . '.' . $ext;

            if ($ext == 'zip' || $ext == 'rar') {
                return $this->uploadCompressedFile($file, $uri);
            } else if ($ext == 'mp4' || $ext == 'mov') {
                return (isset($data['media_id'])) ? $this->updateVideo($data["media_id"], $file) : $this->uploadVideoFile($file, $uri);
            } else if ($ext == 'jpg' || $ext == 'jpeg' || $ext == 'png' || $ext == 'gif') {
                return (isset($data['media_id'])) ? $this->updateThumb($data['media_id'], $file) : $this->uploadImageFile($file, $uri);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private function uploadCompressedFile($file, $uri) {
        if (move_uploaded_file($file['tmp_name'], WWW_ROOT . 'content' . DS . 'touch' . DS . $uri)) {
            $data = $this->getCompressedFileInfo($uri);
            $data['filename'] = $file['name'];
            $data['thumb_name'] = $file['name'];
            return $data;
        } else {
            return false;
        }
    }

    private function updateThumb($media_id, $file) {
        $media = $this->findById($media_id)->first();
        if ($media) {
            $arr = explode('.', $file["name"]);
            $newext = strtolower($arr[count($arr) - 1]);
            $arr1 = explode('.', $media->thumb);
            $ext = strtolower($arr1[count($arr1) - 1]);
            $media->thumb = ($newext == $ext) ? $media->thumb : $arr1[0] . $newext; 
            if(move_uploaded_file($file['tmp_name'], WWW_ROOT . $media->thumb)){
                $media->thumb_name = $file['name'];
                $media->thumb_size = $this->getFileSize($media->thumb);
                $this->save($media);
                return $media;
            }else{
                return false;
            }
        } else {
            return false;
        }
    }
    
    private function updateVideo($media_id, $file) {
        $media = $this->findById($media_id)->first();
        if ($media) {
            if(move_uploaded_file($file['tmp_name'], WWW_ROOT . $media->url)){
                $media->filename = $file['name'];
                $media->size = $this->getFileSize($media->url);
                $this->save($media);
                return $media;
            }else{
                return false;
            }
            
        } else {
            return false;
        }
    }

    private function uploadImageFile($file, $uri) {
        if (move_uploaded_file($file['tmp_name'], WWW_ROOT . 'content' . DS . 'img' . DS . $uri)) {
            //$data = $this->getVideoInfo($uri);
            $data['filename'] = $file['name'];
            return $data;
        } else {
            return false;
        }
    }

    private function uploadVideoFile($file, $uri) {
        if (move_uploaded_file($file['tmp_name'], WWW_ROOT . 'content' .DS . 'videos' . DS . $uri)) {
            $data = $this->getVideoInfo($uri);
            $data['filename'] = $file['name'];
            $arr = explode(".", $file['name']);
            $data['thumb_name'] = $arr[0] . '.jpg';
            return $data;
        } else {
            return false;
        }
    }
    
    

    private function getVideoInfo($mediapath) {
        $ffmpeg_path = 'ffmpeg'; //Path to your FFMPEG
        $video_path = WWW_ROOT . 'content' . DS . 'videos' . DS . $mediapath; // Path to your Video
        // ================Get Duration============= // 
        $command = "$ffmpeg_path -i $video_path -vstats 2>&1";
        $output = shell_exec($command);
        preg_match('/Duration: ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}).([0-9]{1,2})/', $output, $duration);
        
        $video_information['duration'] = (count($duration) > 2) ? $duration[1] . " : " . $duration[2] . " : " . $duration[3] . " : " . $duration[4] : 0;
        //$video_information['duration'] = 0;
        // ============================================ //
        // ================Get Dimension================ //	
        $dimen = "$ffmpeg_path -i $video_path 2>&1 | grep Stream | grep -oP ', \K[0-9]+x[0-9]+'";
        $video_information['dimension'] = (count($duration) > 2) ? shell_exec($dimen) : 0;
        $video_information['dimension'] = ($video_information["dimension"] != null) ? $video_information["dimension"] : 0;
        // ============================================ //
        // ===============Get FPS===================== //
        $frame_cmd = "ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=noprint_wrappers=1:nokey=1 $video_path";
        $video_information['fps'] = (count($duration) > 2) ? shell_exec($frame_cmd) : 0;
        //$video_information['fps'] = 0;
        // ============================================ //
        // =================GetSize==================== //
        $size_cmd = "ffprobe -v error -show_entries format=size -of default=noprint_wrappers=1 $video_path";
        $video_information['size'] = (count($duration) > 2) ? shell_exec($size_cmd) : 0;
        //$video_information['size'] = 0;
        // ============================================ //



        $data = array();
        $data["thumb"] =  'content' . DS . 'img' . DS . $this->getVideoThumb($mediapath);
        $data["thumb_size"] = $this->getFileSize($data["thumb"]);
        $data["duration"] = $video_information["duration"];
        $data["fps"] = $video_information["fps"];
        $data["dimension"] = $video_information["dimension"];
        $data["size"] = str_replace("size=", "", $video_information["size"]);
        $data["uri"] = 'content' . DS . 'videos' . DS . $mediapath;
        $data["media_type"] = 1;
        return $data;
    }

    private function getVideoThumb($mediapath) {
        $ffmpeg = 'ffmpeg'; // point to where the binary is
        $fileName = explode(".", $mediapath);
        $thumb = $fileName[0] . ".jpg";
        $sourcePath = WWW_ROOT . 'content' . DS . 'videos' . DS . $mediapath;
        $destPath = WWW_ROOT . 'content' . DS . 'img' . DS . $thumb;
        $src_file = escapeshellarg($sourcePath);
        $ff_dest_file = escapeshellarg($destPath);
        $output = array();
        $cmd = "$ffmpeg -i $src_file -an -ss 00:00:03 -r 1 -vframes 1 -y $ff_dest_file";
        exec($cmd, $output, $retval);
        return $thumb;
    }

    private function getCompressedFileInfo($mediapath) {
        $data = array();
        $data["thumb"] = 'content' . DS . 'img' . DS . 'default.png';
        $data["thumb_size"] = $this->getFileSize($data["thumb"]);
        $data["duration"] = 0;
        $data["fps"] = 0;
        $data["dimension"] = 0;
        $data["size"] = 0;
        $data["uri"] = 'content' . DS . 'touch' . DS . $mediapath;
        $data["media_type"] = 2;
        return $data;
    }
    
    
    private function getFileSize($uri){
        $file = new File(WWW_ROOT . $uri, true, 0644);
        return $file->size();
    }

}
