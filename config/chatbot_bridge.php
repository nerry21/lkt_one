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

    /*
    |--------------------------------------------------------------------------
    | Webhook Outbound (LKT → Chatbot AI)
    |--------------------------------------------------------------------------
    | Sesi 66 PR-CRM-6C. Push booking.created event ke Chatbot AI saat
    | BookingObserver fires. Dual auth: shared API key + HMAC signature
    | (lihat DispatchBookingWebhookJob).
    */
    'webhook_enabled' => (bool) env('CHATBOT_BRIDGE_WEBHOOK_ENABLED', false),
    'webhook_url' => env('CHATBOT_BRIDGE_WEBHOOK_URL', 'https://spesial.online/webhook/lkt-booking'),
    'webhook_timeout' => (int) env('CHATBOT_BRIDGE_WEBHOOK_TIMEOUT', 10),
];
