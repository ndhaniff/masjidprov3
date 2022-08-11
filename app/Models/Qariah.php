<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Qariah extends Model
{

    use HasFactory, SoftDeletes;

    protected $guarded = ['id'];
    protected $appends = ['relative_count', 'sex_text'];

    public function getRelativeCountAttribute()
    {
        return $this->relatives()->count();
    }

    public function relatives()
    {
        return $this->hasMany(QariahRelative::class, 'qariah_id', 'id');
    }

    public function getSexTextAttribute()
    {
        return $this->sex ? 'Lelaki' : 'Perempuan';
    }
}
