<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'provider', 'provider_id', 'role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function company()
    {
        return $this->hasOne(Company::class);
    }
    public function education()
    {
        return $this->hasMany(Education::class);
    }
    public function experience()
    {
        return $this->hasMany(Experience::class);
    }
    public function certifications()
    {
        return $this->hasMany(Certification::class);
    }
    public function skills()
    {
        return $this->belongsToMany(Skill::class);
    }
    public function projects()
    {
        return $this->hasMany(Project::class);
    }
    public function profile()
    {
        return $this->hasOne(UserProfile::class);
    }
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
