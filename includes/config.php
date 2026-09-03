<?php
// includes/config.php

// -------------------------------------------------------------
// Global Security Headers
// -------------------------------------------------------------
if (!headers_sent()) {
    header("X-Content-Type-Options: nosniff");
    header("X-Frame-Options: SAMEORIGIN");
    header("X-XSS-Protection: 1; mode=block");
    header("Referrer-Policy: strict-origin-when-cross-origin");
    header("Permissions-Policy: camera=(), microphone=(), geolocation=()");
}

// -------------------------------------------------------------
// Database Configuration (Supports Environment Variables on Vercel/Cloud)
// -------------------------------------------------------------
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_NAME', getenv('DB_NAME') ?: 'beautypalor');

// -------------------------------------------------------------
// Site Configuration
// -------------------------------------------------------------
define('SITE_NAME', getenv('SITE_NAME') ?: 'THE HBM');
define('SITE_URL', getenv('SITE_URL') ?: (isset($_SERVER['HTTP_HOST']) ? (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://" . $_SERVER['HTTP_HOST'] : 'http://localhost:8000'));

// -------------------------------------------------------------
// Initialize Database Connection (PDO)
// -------------------------------------------------------------
$pdo = null;
// Only attempt connection if cloud DB_HOST is set or running in local environment
$should_connect = (getenv('DB_HOST') && getenv('DB_HOST') !== 'localhost') || 
                  (!getenv('VERCEL') && !empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') !== false);

if ($should_connect) {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::ATTR_TIMEOUT            => 2,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    } catch (\Throwable $e) {
        // Fail gracefully if database is not set up (Fallback to Demo Mode)
        $pdo = null;
    }
}

// -------------------------------------------------------------
// Secure Session Initialization (Vercel / Lambda Serverless Writable Path)
// -------------------------------------------------------------
if (session_status() === PHP_SESSION_NONE) {
    $temp_dir = sys_get_temp_dir() ?: '/tmp';
    if (is_dir($temp_dir) && is_writable($temp_dir)) {
        @session_save_path($temp_dir);
    }
    
    $is_https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || 
                (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https');
    
    @session_set_cookie_params([
        'lifetime' => 0,
        'path'     => '/',
        'domain'   => '',
        'secure'   => $is_https,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    @session_start();
}

// -------------------------------------------------------------
// Security & Sanitization Helpers
// -------------------------------------------------------------

// Function to generate CSRF token
function generate_csrf_token() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Function to verify CSRF token
function verify_csrf_token($token) {
    return isset($_SESSION['csrf_token']) && is_string($token) && hash_equals($_SESSION['csrf_token'], $token);
}

// Function to sanitize output against XSS
function h($string) {
    return htmlspecialchars((string)$string, ENT_QUOTES | ENT_HTML5, 'UTF-8');
}

// Function to sanitize string inputs (PHP 8.2+ compliant)
function sanitize_text($input) {
    if ($input === null) return '';
    $clean = trim(strip_tags((string)$input));
    return preg_replace('/[\x00-\x1F\x7F]/u', '', $clean);
}
?>

