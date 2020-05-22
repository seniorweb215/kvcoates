<?php
namespace App\Shell;
 
use Cake\Console\Shell;
 
/**
 * Backup shell command.
 */
class BackupShell extends Shell
{
    /**
     * main() method.
     *
     * @return bool|int Success or error code.
     */
    public function main()
    {
        $this->out("Some output from this shell.");
        // echo "This is test shell";
        $file = fopen('1.txt', 'a');
        fwrite($file, "Test\n");
        fclose($file);
        return true;
    }
}