<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AccountSettingController extends Controller
{
    /**
     * Fetch candidate's account settings / preferences.
     */
    public function fetch()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            return response()->json([
                'success' => true,
                'message' => 'Account settings fetched successfully',
                'data' => [
                    'is_profile_public'   => (bool) ($user->is_profile_public ?? true),
                    'is_cv_public'        => (bool) ($user->is_cv_public ?? true),
                    'job_alerts'          => (bool) ($user->job_alerts ?? true),
                    'email_notifications' => (bool) ($user->email_notifications ?? true),
                ],
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch account settings',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update candidate's account settings / preferences.
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

            $request->validate([
                'is_profile_public'   => ['nullable', 'boolean'],
                'is_cv_public'        => ['nullable', 'boolean'],
                'job_alerts'          => ['nullable', 'boolean'],
                'email_notifications' => ['nullable', 'boolean'],
            ]);

            $user->update([
                'is_profile_public'   => $request->has('is_profile_public') ? $request->boolean('is_profile_public') : $user->is_profile_public,
                'is_cv_public'        => $request->has('is_cv_public') ? $request->boolean('is_cv_public') : $user->is_cv_public,
                'job_alerts'          => $request->has('job_alerts') ? $request->boolean('job_alerts') : $user->job_alerts,
                'email_notifications' => $request->has('email_notifications') ? $request->boolean('email_notifications') : $user->email_notifications,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Account settings updated successfully',
                'data' => [
                    'is_profile_public'   => (bool) $user->is_profile_public,
                    'is_cv_public'        => (bool) $user->is_cv_public,
                    'job_alerts'          => (bool) $user->job_alerts,
                    'email_notifications' => (bool) $user->email_notifications,
                ],
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
                'message' => 'Failed to update account settings',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
