<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class CertificationController extends Controller
{
    /**
     * Fetch all certification records for candidate.
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

            $certifications = Certification::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Certifications fetched successfully',
                'data' => $certifications,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch certifications',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch single certification record.
     */
    public function fetchCertification($id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $certification = Certification::where('user_id', $user->id)->where('id', $id)->first();

            if (!$certification) {
                return response()->json([
                    'success' => false,
                    'message' => 'Certification record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Certification fetched successfully',
                'data' => $certification,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch certification',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store new certification record.
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
                'title'                => ['required', 'string', 'max:255'],
                'issuing_organization' => ['required', 'string', 'max:255'],
                'issue_date'           => ['nullable', 'date'],
                'certification_image'  => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $certImagePath = null;

            if ($request->hasFile('certification_image')) {
                $file = $request->file('certification_image');
                if ($file && $file->isValid()) {
                    $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
                    $path = $file->storeAs('candidates/certifications', $fileName, 'public');
                    $certImagePath = '/storage/' . $path;
                }
            }

            $certification = Certification::create([
                'user_id'              => $user->id,
                'title'                => $request->input('title'),
                'issuing_organization' => $request->input('issuing_organization'),
                'issue_date'           => $request->input('issue_date'),
                'certification_image'  => $certImagePath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Certification added successfully',
                'data' => $certification,
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
                'message' => 'Failed to add certification',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update existing certification record as a whole.
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

            $certification = Certification::where('user_id', $user->id)->where('id', $id)->first();

            if (!$certification) {
                return response()->json([
                    'success' => false,
                    'message' => 'Certification record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'title'                => ['nullable', 'string', 'max:255'],
                'issuing_organization' => ['nullable', 'string', 'max:255'],
                'issue_date'           => ['nullable', 'date'],
                'certification_image'  => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $data = [
                'title'                => $request->input('title') ?? $certification->title,
                'issuing_organization' => $request->input('issuing_organization') ?? $certification->issuing_organization,
                'issue_date'           => $request->input('issue_date') ?? $certification->issue_date,
            ];

            if ($request->hasFile('certification_image')) {
                $this->deleteStoredFile($certification->certification_image);
                $file = $request->file('certification_image');
                $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
                $data['certification_image'] = '/storage/' . $file->storeAs('candidates/certifications', $fileName, 'public');
            } elseif ($request->has('certification_image') && empty($request->input('certification_image'))) {
                $this->deleteStoredFile($certification->certification_image);
                $data['certification_image'] = null;
            }

            $certification->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Certification updated successfully',
                'data' => $certification,
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
                'message' => 'Failed to update certification',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete certification record and its stored image.
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

            $certification = Certification::where('user_id', $user->id)->where('id', $id)->first();

            if (!$certification) {
                return response()->json([
                    'success' => false,
                    'message' => 'Certification record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $this->deleteStoredFile($certification->certification_image);
            $certification->delete();

            return response()->json([
                'success' => true,
                'message' => 'Certification deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete certification',
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
