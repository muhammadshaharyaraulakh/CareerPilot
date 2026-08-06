<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ExperienceController extends Controller
{
    /**
     * Fetch all experience records for candidate.
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

            $experiences = Experience::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Experiences fetched successfully',
                'data' => $experiences,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch experiences',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch single experience record.
     */
    public function fetchExperience($id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $experience = Experience::where('user_id', $user->id)->where('id', $id)->first();

            if (!$experience) {
                return response()->json([
                    'success' => false,
                    'message' => 'Experience record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Experience fetched successfully',
                'data' => $experience,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch experience',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store new experience record.
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
                'job_title'     => ['required', 'string', 'max:255'],
                'company_name'  => ['required', 'string', 'max:255'],
                'location'      => ['nullable', 'string', 'max:255'],
                'start_date'    => ['nullable', 'date'],
                'end_date'      => ['nullable', 'date'],
                'is_current'    => ['nullable', 'boolean'],
            ]);

            $experience = Experience::create([
                'user_id'      => $user->id,
                'job_title'    => $request->input('job_title'),
                'company_name' => $request->input('company_name'),
                'location'     => $request->input('location'),
                'start_date'   => $request->input('start_date'),
                'end_date'     => $request->input('end_date'),
                'is_current'   => $request->boolean('is_current'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Experience added successfully',
                'data' => $experience,
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
                'message' => 'Failed to add experience',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update existing experience record as a whole.
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

            $experience = Experience::where('user_id', $user->id)->where('id', $id)->first();

            if (!$experience) {
                return response()->json([
                    'success' => false,
                    'message' => 'Experience record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'job_title'    => ['required', 'string', 'max:255'],
                'company_name' => ['required', 'string', 'max:255'],
                'location'     => ['nullable', 'string', 'max:255'],
                'start_date'   => ['nullable', 'date'],
                'end_date'     => ['nullable', 'date'],
                'is_current'   => ['nullable', 'boolean'],
            ]);

            $experience->update([
                'job_title'    => $request->input('job_title') ?? $experience->job_title,
                'company_name' => $request->input('company_name') ?? $experience->company_name,
                'location'     => $request->input('location') ?? $experience->location,
                'start_date'   => $request->input('start_date') ?? $experience->start_date,
                'end_date'     => $request->input('end_date') ?? $experience->end_date,
                'is_current'   => $request->boolean('is_current'),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Experience updated successfully',
                'data' => $experience,
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
                'message' => 'Failed to update experience',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete experience record.
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

            $experience = Experience::where('user_id', $user->id)->where('id', $id)->first();

            if (!$experience) {
                return response()->json([
                    'success' => false,
                    'message' => 'Experience record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $experience->delete();

            return response()->json([
                'success' => true,
                'message' => 'Experience deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete experience',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
