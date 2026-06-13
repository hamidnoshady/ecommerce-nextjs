<?php

require_once __DIR__ . '/../../includes/helpers.php';
require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/WooCommerceClient.php';

require_login_api();

$config = app_config();
$client = new WooCommerceClient($config['woocommerce']);

$result = $client->listCategories(['orderby' => 'name', 'order' => 'asc']);

if ($result['status'] < 200 || $result['status'] >= 300) {
    json_response(['error' => $result['data']['message'] ?? 'Failed to fetch categories'], $result['status'] ?: 502);
}

$categories = array_map(function ($cat) {
    return [
        'id' => $cat['id'],
        'name' => $cat['name'],
        'count' => $cat['count'],
    ];
}, is_array($result['data']) ? $result['data'] : []);

json_response(['items' => $categories]);
