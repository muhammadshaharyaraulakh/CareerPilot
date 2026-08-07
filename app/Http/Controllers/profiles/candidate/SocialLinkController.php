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
     * Store or bulk update social links for candidate.
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

            // Handle Bulk Save ({ links: [...] })
            if ($request->has('links')) {
                $request->validate([
                    'links' => ['present', 'array'],
                    'links.*.provider' => ['nullable', 'string', 'max:255'],
                    'links.*.platform_name' => ['nullable', 'string', 'max:255'],
                    'links.*.url' => ['nullable', 'string', 'max:500'],
                    'links.*.profile_url' => ['nullable', 'string', 'max:500'],
                ]);

                $linksData = $request->input('links', []);
                $processedIds = [];

                foreach ($linksData as $linkItem) {
                    $provider = $linkItem['provider'] ?? $linkItem['platform_name'] ?? 'LinkedIn';
                    $url = trim($linkItem['url'] ?? $linkItem['profile_url'] ?? '');

                    if (empty($url)) {
                        continue;
                    }

                    $linkId = $linkItem['id'] ?? null;
                    if ($linkId && !str_starts_with((string)$linkId, 'new_')) {
                        $existing = SocialLink::where('user_id', $user->id)->where('id', $linkId)->first();
                        if ($existing) {
                            $existing->update([
                                'provider' => $provider,
                                'url'      => $url,
                            ]);
                            $processedIds[] = $existing->id;
                            continue;
                        }
                    }

                    $newLink = SocialLink::create([
                        'user_id'  => $user->id,
                        'provider' => $provider,
                        'url'      => $url,
                    ]);
                    $processedIds[] = $newLink->id;
                }

                // Remove deleted links if user saved form with items removed
                SocialLink::where('user_id', $user->id)->whereNotIn('id', $processedIds)->delete();

                $allSocialLinks = SocialLink::where('user_id', $user->id)->get();

                return response()->json([
                    'success' => true,
                    'message' => 'Social links saved successfully',
                    'data'    => $allSocialLinks,
                ], Response::HTTP_OK);
            }

            // Handle Single Link Save
            $request->validate([
                'provider' => ['nullable', 'string', 'max:255'],
                'url'      => ['required', 'string', 'max:500'],
            ]);

            $provider = $request->input('provider') ?? $request->input('platform_name') ?? 'LinkedIn';
            $url      = $request->input('url') ?? $request->input('profile_url');

            $socialLink = SocialLink::create([
                'user_id'  => $user->id,
                'provider' => $provider,
                'url'      => $url,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Social link saved successfully',
                'data'    => $socialLink,
            ], Response::HTTP_OK);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save social links',
                'error'   => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update existing single social link.
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
                'url'      => ['required', 'string', 'max:500'],
            ]);

            $provider = $request->input('provider') ?? $request->input('platform_name') ?? $socialLink->provider;
            $url      = $request->input('url') ?? $request->input('profile_url') ?? $socialLink->url;

            $socialLink->update([
                'provider' => $provider,
                'url'      => $url,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Social link updated successfully',
                'data'    => $socialLink,
            ], Response::HTTP_OK);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update social link',
                'error'   => $e->getMessage(),
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
                'error'   => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
