<?php
// Set working directory to project root for seamless file inclusions and static relative paths
chdir(dirname(__DIR__));

// Set temp directory for serverless session storage
$temp_dir = sys_get_temp_dir() ?: '/tmp';
if (is_dir($temp_dir) && is_writable($temp_dir)) {
    @session_save_path($temp_dir);
}

// Require main application
require __DIR__ . '/../index.php';
