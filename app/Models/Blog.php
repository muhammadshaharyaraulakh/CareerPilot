<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'blog_category_id',
        'company_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'cover_image',
        'gallery_images',
        'status',
        'is_approved',
        'approved_by',
        'approved_at',
        'read_time',
        'views_count',
    ];

    protected $casts = [
        'gallery_images' => 'array',
        'is_approved' => 'boolean',
        'approved_at' => 'datetime',
        'views_count' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function comments()
    {
        return $this->hasMany(BlogComment::class)->whereNull('parent_id')->with('replies');
    }

    public function allComments()
    {
        return $this->hasMany(BlogComment::class);
    }
}
