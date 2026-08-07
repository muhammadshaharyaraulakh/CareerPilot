<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PersonalProfileController extends Controller
{
    /**
     * Fetch candidate personal profile data.
     */
    public function fetchPersonalData()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $profile = UserProfile::where('user_id', $user->id)->first();

            if (empty($profile)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Candidate data fetched successfully',
                    'data' => null,
                ], Response::HTTP_OK);
            }

            return response()->json([
                'success' => true,
                'message' => 'Candidate profile data fetched successfully',
                'data' => $profile,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch candidate profile data',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch candidate profile picture only.
     */
    public function fetchProfilePicture()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $profile = UserProfile::where('user_id', $user->id)->first();

            return response()->json([
                'success' => true,
                'data' => [
                    'profile_picture' => $profile ? $profile->profile_picture : null,
                ],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch profile picture',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Upload and update candidate profile images (profile_picture, banner_picture, cnic).
     */
    public function updateimages(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $profile = UserProfile::firstOrCreate(
                ['user_id' => $user->id]
            );

            $request->validate([
                'profile_picture' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:5120'],
                'banner_picture' => ['nullable', 'image', 'mimes:jpeg,png,jpg,webp,gif', 'max:5120'],
                'cnic' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $profilePicFile = $request->file('profile_picture');
            if ($profilePicFile && $profilePicFile->isValid()) {
                $this->deleteStoredFile($profile->profile_picture);

                $fileName = uniqid() . '.' . $profilePicFile->getClientOriginalExtension();
                $path = $profilePicFile->storeAs('candidates/profiles', $fileName, 'public');
                $profile->profile_picture = '/storage/' . $path;
            } elseif ($request->has('profile_picture') && empty($request->input('profile_picture'))) {
                $this->deleteStoredFile($profile->profile_picture);
                $profile->profile_picture = null;
            }

            $bannerPicFile = $request->file('banner_picture');
            if ($bannerPicFile && $bannerPicFile->isValid()) {
                $this->deleteStoredFile($profile->banner_picture);

                $fileName = uniqid() . '.' . $bannerPicFile->getClientOriginalExtension();
                $path = $bannerPicFile->storeAs('candidates/banners', $fileName, 'public');
                $profile->banner_picture = '/storage/' . $path;
            } elseif ($request->has('banner_picture') && empty($request->input('banner_picture'))) {
                $this->deleteStoredFile($profile->banner_picture);
                $profile->banner_picture = null;
            }

            $cnicFile = $request->file('cnic');
            if ($cnicFile && $cnicFile->isValid()) {
                $this->deleteStoredFile($profile->cnic);

                $fileName = uniqid() . '.' . $cnicFile->getClientOriginalExtension();
                $path = $cnicFile->storeAs('candidates/cnic', $fileName, 'public');
                $profile->cnic = '/storage/' . $path;
            } elseif ($request->has('cnic') && empty($request->input('cnic'))) {
                $this->deleteStoredFile($profile->cnic);
                $profile->cnic = null;
            }

            $profile->save();

            return response()->json([
                'success' => true,
                'message' => 'Candidate profile images updated successfully',
                'data' => $profile,
            ], Response::HTTP_OK);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update candidate profile images',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete candidate image (profile_picture, banner_picture, or cnic) from storage and DB.
     */
    public function deleteImage(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $profile = UserProfile::where('user_id', $user->id)->first();

            if (!$profile) {
                return response()->json([
                    'success' => false,
                    'message' => 'Candidate profile not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $imageType = $request->input('type') ?? $request->input('field') ?? $request->input('image_type');

            if ($imageType === 'profile_picture' || $request->has('profile_picture')) {
                $this->deleteStoredFile($profile->profile_picture);
                $profile->profile_picture = null;
            }

            if ($imageType === 'banner_picture' || $request->has('banner_picture')) {
                $this->deleteStoredFile($profile->banner_picture);
                $profile->banner_picture = null;
            }

            if ($imageType === 'cnic' || $request->has('cnic')) {
                $this->deleteStoredFile($profile->cnic);
                $profile->cnic = null;
            }

            $profile->save();

            return response()->json([
                'success' => true,
                'message' => 'Image deleted successfully',
                'data' => $profile,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete image',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update candidate personal profile text information.
     */
    public function update(Request $request)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $profile = UserProfile::firstOrCreate(
                ['user_id' => $user->id]
            );

            $request->validate([
                'headline'       => ['nullable', 'string', 'max:255'],
                'phone'          => ['nullable', 'string', 'max:255'],
                'website'        => ['nullable', 'string', 'max:255'],
                'location'       => ['nullable', 'string', 'max:255'],
                'is_public'      => ['nullable', 'boolean'],
                'domicile'       => ['nullable', 'string', 'max:255'],
                'gender'         => ['nullable', 'string', 'in:male,female,other,Male,Female,Other'],
                'marital_status' => ['nullable', 'string', 'max:255'],
                'postal_address' => ['nullable', 'string', 'max:255'],
            ]);

            // Validate and format phone number (must be 10 digits, prepends +92)
            if ($request->filled('phone')) {
                $rawPhone = $request->input('phone');
                $digits = preg_replace('/[^0-9]/', '', $rawPhone);

                if (str_starts_with($digits, '92') && strlen($digits) === 12) {
                    $digits = substr($digits, 2);
                } elseif (str_starts_with($digits, '0') && strlen($digits) === 11) {
                    $digits = substr($digits, 1);
                }

                if (strlen($digits) !== 10) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Validation failed',
                        'errors' => [
                            'phone' => ['Phone number must be a valid 10-digit number.'],
                        ],
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }

                $profile->phone = '+92' . $digits;
            } elseif ($request->has('phone')) {
                $profile->phone = null;
            }

            if ($request->has('headline')) {
                $profile->headline = $request->input('headline');
            }
            if ($request->has('website')) {
                $profile->website = $request->input('website');
            }
            if ($request->has('location')) {
                $profile->location = $request->input('location');
            }
            if ($request->has('is_public')) {
                $profile->is_public = $request->boolean('is_public');
            }
            if ($request->has('domicile')) {
                $profile->domicile = $request->input('domicile');
            }
            if ($request->has('gender')) {
                $profile->gender = $request->input('gender') ? strtolower($request->input('gender')) : null;
            }
            if ($request->has('marital_status')) {
                $profile->marital_status = $request->input('marital_status');
            }
            if ($request->has('postal_address')) {
                $profile->postal_address = $request->input('postal_address');
            }

            $profile->save();

            return response()->json([
                'success' => true,
                'message' => 'Profile updated successfully',
                'data' => $profile,
            ], Response::HTTP_OK);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Helper to delete a stored file from public disk.
     */
    private function deleteStoredFile(?string $publicPath): void
    {
        if (!$publicPath) {
            return;
        }

        $relativePath = ltrim(str_replace('/storage/', '', $publicPath), '/');

        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
    }
}
