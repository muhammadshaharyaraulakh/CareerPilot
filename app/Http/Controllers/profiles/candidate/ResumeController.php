<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\Resume;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ResumeController extends Controller
{
    /**
     * Fetch all resumes for candidate (index / fetchResumes).
     */
    public function index()
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $resumes = Resume::where('user_id', $user->id)->latest()->get();

            return response()->json([
                'success' => true,
                'message' => 'Resumes fetched successfully',
                'data' => $resumes,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch resumes',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch single resume by ID.
     */
    public function fetchResume($id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $resume = Resume::where('user_id', $user->id)->where('id', $id)->first();

            if (!$resume) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resume not found',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Resume fetched successfully',
                'data' => $resume,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch resume',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Upload and add a new candidate resume.
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
                'name'        => ['required', 'string', 'max:255'],
                'resume_file' => ['required', 'file', 'mimes:pdf', 'max:12288'],
            ]);

            $file = $request->file('resume_file');
            $fileName = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('candidates/resumes', $fileName, 'public');

            $fileSizeBytes = $file->getSize();
            $formattedSize = $this->formatFileSize($fileSizeBytes);

            $resume = Resume::create([
                'user_id'   => $user->id,
                'name'      => $request->input('name'),
                'file_path' => '/storage/' . $path,
                'file_size' => $formattedSize,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Resume uploaded successfully',
                'data' => $resume,
            ], Response::HTTP_CREATED);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload resume',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update an existing candidate resume (title and/or file replacement).
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

            $resume = Resume::where('user_id', $user->id)->where('id', $id)->first();

            if (!$resume) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resume not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'name'        => ['nullable', 'string', 'max:255'],
                'resume_file' => ['nullable', 'file', 'mimes:pdf', 'max:12288'],
            ]);

            if ($request->filled('name')) {
                $resume->name = $request->input('name');
            }

            $file = $request->file('resume_file');
            if ($file && $file->isValid()) {
                $this->deleteStoredFile($resume->file_path);

                $fileName = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('candidates/resumes', $fileName, 'public');
                $resume->file_path = '/storage/' . $path;
                $resume->file_size = $this->formatFileSize($file->getSize());
            }

            $resume->save();

            return response()->json([
                'success' => true,
                'message' => 'Resume updated successfully',
                'data' => $resume,
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
                'message' => 'Failed to update resume',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete candidate resume record and file.
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

            $resume = Resume::where('user_id', $user->id)->where('id', $id)->first();

            if (!$resume) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resume not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $this->deleteStoredFile($resume->file_path);
            $resume->delete();

            return response()->json([
                'success' => true,
                'message' => 'Resume deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete resume',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Helper to format file size in bytes to human-readable string.
     */
    private function formatFileSize(int $bytes): string
    {
        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 1) . ' MB';
        }
        if ($bytes >= 1024) {
            return number_format($bytes / 1024, 1) . ' KB';
        }
        return $bytes . ' B';
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
