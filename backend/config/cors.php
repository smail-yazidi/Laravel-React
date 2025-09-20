<?php
// config/cors.php
return [
    'paths' => ['api/*', 'posts', 'posts/*'], // Add your routes here
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // For development only
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];