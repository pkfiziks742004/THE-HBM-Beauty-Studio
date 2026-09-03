<?php
require_once __DIR__ . '/config.php';

// Generate CSRF token for forms
$csrf_token = generate_csrf_token();

// Set default page title & meta
$page_title = SITE_NAME . ' | Premium Beauty Studio & Luxury Salon';
$meta_description = "Experience refined beauty at THE HBM. Premium hair, skincare, bridal, makeup & luxury salon services designed for elegance and confidence.";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <title><?php echo h($page_title); ?></title>
    <meta name="description" content="<?php echo h($meta_description); ?>">
    <meta name="keywords" content="beauty parlour, salon, bridal makeup, hair styling, skin care, THE HBM, luxury beauty">
    <meta name="author" content="THE HBM Beauty Studio">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="<?php echo h(SITE_URL); ?>">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo h(SITE_URL); ?>">
    <meta property="og:title" content="<?php echo h($page_title); ?>">
    <meta property="og:description" content="<?php echo h($meta_description); ?>">
    <meta property="og:image" content="<?php echo h(SITE_URL); ?>/assets/images/crest.webp">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="<?php echo h(SITE_URL); ?>">
    <meta name="twitter:title" content="<?php echo h($page_title); ?>">
    <meta name="twitter:description" content="<?php echo h($meta_description); ?>">
    <meta name="twitter:image" content="<?php echo h(SITE_URL); ?>/assets/images/crest.webp">
    
    <!-- Resource Hints for Fast Performance -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="dns-prefetch" href="//unpkg.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <!-- Google Fonts with display=swap for zero render blocking -->
    <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    
    <!-- Custom CSS (Optimized) -->
    <link rel="stylesheet" href="assets/css/style.css?v=<?php echo file_exists(__DIR__ . '/../assets/css/style.css') ? filemtime(__DIR__ . '/../assets/css/style.css') : '7'; ?>">
    
    <!-- Lucide Icons (Deferred for fast FCP) -->
    <script src="https://unpkg.com/lucide@latest" defer></script>
</head>
<body>
    
    <!-- Navigation -->
    <?php require_once __DIR__ . '/navbar.php'; ?>
    
    <!-- Main Content Starts Here -->
    <main class="main-content">

