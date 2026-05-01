<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Chatbot AI Bridge — Authentication
    |--------------------------------------------------------------------------
    | Shared secret untuk verify request dari Chatbot AI server.
    | Sesi 64 PR-CRM-6A.
    */
    'api_key' => env('CHATBOT_BRIDGE_API_KEY'),
    'enabled' => (bool) env('CHATBOT_BRIDGE_ENABLED', false),
    'log_channel' => 'chatbot-bridge',
];
