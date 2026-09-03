<?php
// Display errors in serverless logs if anything fails
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);

// Set temp directory for serverless session storage
$temp_dir = sys_get_temp_dir() ?: '/tmp';
if (is_dir($temp_dir) && is_writable($temp_dir)) {
    @session_save_path($temp_dir);
}

// Locate and require root index.php
$root_index = dirname(__DIR__) . '/index.php';
if (file_exists($root_index)) {
    chdir(dirname(__DIR__));
    require_once $root_index;
} else {
    // Fallback if bundled in current directory
    require_once __DIR__ . '/../index.php';
}
