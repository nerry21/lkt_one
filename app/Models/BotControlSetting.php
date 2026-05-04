<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BotControlSetting extends Model
{
    protected $table = 'bot_control_settings';

    protected $fillable = ['key', 'value', 'meta', 'updated_by_phone'];

    protected $casts = [
        'meta' => 'array',
    ];
}
