<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class EducationController extends Controller
{
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

            $education = Education::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Education fetched successfully',
                'data' => $education,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch education',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function fetchEducation( $id) {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $education = Education::where('user_id', $user->id)->where('id', $id)->first();

            if (!$education) {
                return response()->json([
                    'success' => false,
                    'message' => 'Education record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Education fetched successfully',
                'data' => $education,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch education',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store new education record.
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

            $validated = $request->validate([
                'title' => ['nullable', 'string', 'max:255'],
                'degree' => ['nullable', 'string', 'max:255'],
                'institution' => ['required', 'string', 'max:255'],
                'field' => ['nullable', 'string', 'max:255'],
                'field_of_study' => ['nullable', 'string', 'max:255'],
                'start_date' => ['nullable', 'date'],
                'end_date' => ['nullable', 'date'],
                'is_current' => ['nullable', 'boolean'],
                'is_currently_studying' => ['nullable', 'boolean'],
                'degree_image' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $data = [
                'user_id' => $user->id,
                'degree' => $request->input('degree') ?? $request->input('title') ?? '',
                'institution' => $request->input('institution'),
                'field' => $request->input('field') ?? $request->input('field_of_study'),
                'start_date' => $request->input('start_date'),
                'end_date' => $request->input('end_date'),
                'is_current' => $request->boolean('is_current') || $request->boolean('is_currently_studying'),
            ];

            if ($request->hasFile('degree_image')) {
                $file = $request->file('degree_image');
                $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
                $data['degree_image'] = '/storage/' . $file->storeAs('candidates/education', $fileName, 'public');
            }

            $education = Education::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Education added successfully',
                'data' => $education,
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
                'message' => 'Failed to add education',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update existing education record as a whole.
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

            $education = Education::where('user_id', $user->id)->where('id', $id)->first();

            if (!$education) {
                return response()->json([
                    'success' => false,
                    'message' => 'Education record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'title' => ['nullable', 'string', 'max:255'],
                'degree' => ['nullable', 'string', 'max:255'],
                'institution' => ['required', 'string', 'max:255'],
                'field' => ['nullable', 'string', 'max:255'],
                'field_of_study' => ['nullable', 'string', 'max:255'],
                'start_date' => ['nullable', 'date'],
                'end_date' => ['nullable', 'date'],
                'is_current' => ['nullable', 'boolean'],
                'is_currently_studying' => ['nullable', 'boolean'],
                'degree_image' => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $data = [
                'degree' => $request->input('degree') ?? $request->input('title') ?? $education->degree,
                'institution' => $request->input('institution') ?? $education->institution,
                'field' => $request->input('field') ?? $request->input('field_of_study') ?? $education->field,
                'start_date' => $request->input('start_date') ?? $education->start_date,
                'end_date' => $request->input('end_date') ?? $education->end_date,
                'is_current' => $request->boolean('is_current') || $request->boolean('is_currently_studying'),
            ];

            if ($request->hasFile('degree_image')) {
                $this->deleteStoredFile($education->degree_image);
                $file = $request->file('degree_image');
                $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
                $data['degree_image'] = '/storage/' . $file->storeAs('candidates/education', $fileName, 'public');
            }

            $education->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Education updated successfully',
                'data' => $education,
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
                'message' => 'Failed to update education',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete education record and its stored image.
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

            $education = Education::where('user_id', $user->id)->where('id', $id)->first();

            if (!$education) {
                return response()->json([
                    'success' => false,
                    'message' => 'Education record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $this->deleteStoredFile($education->degree_image);
            $education->delete();

            return response()->json([
                'success' => true,
                'message' => 'Education deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete education',
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
