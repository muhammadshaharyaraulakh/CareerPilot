<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SocialLinkController extends Controller
{
    /**
     * Fetch all social links for candidate.
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

            $socialLinks = SocialLink::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Social links fetched successfully',
                'data' => $socialLinks,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch social links',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch single social link.
     */
    public function fetchSocialLink($id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $socialLink = SocialLink::where('user_id', $user->id)->where('id', $id)->first();

            if (!$socialLink) {
                return response()->json([
                    'success' => false,
                    'message' => 'Social link not found',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Social link fetched successfully',
                'data' => $socialLink,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch social link',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store or update social link for candidate.
     */
    public function store(Request $request)
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
                'provider' => ['required', 'string', 'max:255'],
                'url'      => ['required', 'string', 'max:255'],
            ]);

            $socialLink = SocialLink::updateOrCreate(
                [
                    'user_id'  => $user->id,
                    'provider' => strtolower(trim($request->input('provider'))),
                ],
                [
                    'url' => $request->input('url'),
                ]
            );

            return response()->json([
                'success' => true,
                'message' => 'Social link saved successfully',
                'data' => $socialLink,
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
                'message' => 'Failed to save social link',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update existing social link as a whole.
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $socialLink = SocialLink::where('user_id', $user->id)->where('id', $id)->first();

            if (!$socialLink) {
                return response()->json([
                    'success' => false,
                    'message' => 'Social link not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'provider' => ['nullable', 'string', 'max:255'],
                'url'      => ['required', 'string', 'max:255'],
            ]);

            $socialLink->update([
                'provider' => $request->filled('provider') ? strtolower(trim($request->input('provider'))) : $socialLink->provider,
                'url'      => $request->input('url'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Social link updated successfully',
                'data' => $socialLink,
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
                'message' => 'Failed to update social link',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete social link.
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $socialLink = SocialLink::where('user_id', $user->id)->where('id', $id)->first();

            if (!$socialLink) {
                return response()->json([
                    'success' => false,
                    'message' => 'Social link not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $socialLink->delete();

            return response()->json([
                'success' => true,
                'message' => 'Social link deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete social link',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
