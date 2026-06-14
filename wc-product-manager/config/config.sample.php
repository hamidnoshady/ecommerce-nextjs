<?php
/**
 * Copy this file to config.php and fill in your real values.
 * config.php is gitignored and must NEVER be committed.
 */

return [
    // WooCommerce REST API (Settings > Advanced > REST API in WooCommerce)
    'woocommerce' => [
        'store_url'      => 'https://your-store.example.com',
        'consumer_key'   => 'ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        'consumer_secret'=> 'cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        // Verify TLS certificates. Only disable on trusted local/dev setups.
        'verify_ssl'     => true,
    ],

    // Kavenegar SMS OTP login (https://kavenegar.com)
    'kavenegar' => [
        'api_key'  => 'YOUR_KAVENEGAR_API_KEY',
        // Template name created in Kavenegar panel for OTP messages.
        // The template should accept one token: %token%
        'template' => 'verify',
    ],

    // Allowed users: phone number (digits only, e.g. 09121234567) => role
    // Roles: 'admin' (full access) or 'shop_manager' (edit/stock, no delete/bulk pricing)
    'users' => [
        '09120000000' => 'admin',
        '09121111111' => 'shop_manager',
    ],

    // OTP settings
    'otp' => [
        'length'           => 5,
        'expiry_seconds'   => 120,
        'max_per_window'   => 3,
        'window_seconds'   => 600,
    ],

    // Session
    'session' => [
        'name'     => 'wcpm_session',
        'lifetime' => 60 * 60 * 8, // 8 hours
    ],
];
