<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class ProjectController extends Controller
{
    /**
     * Fetch all project records for candidate.
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

            $projects = Project::where('user_id', $user->id)->get();

            return response()->json([
                'success' => true,
                'message' => 'Projects fetched successfully',
                'data' => $projects,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch projects',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch single project record.
     */
    public function fetchProject($id)
    {
        try {
            $user = Auth::user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated',
                ], Response::HTTP_401_UNAUTHORIZED);
            }

            $project = Project::where('user_id', $user->id)->where('id', $id)->first();

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'success' => true,
                'message' => 'Project fetched successfully',
                'data' => $project,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch project',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store new project record.
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
                'title'       => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'project_url' => ['nullable', 'string', 'max:255'],
                'start_date'  => ['nullable', 'date'],
                'end_date'    => ['nullable', 'date'],
                'thumbnail'   => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $thumbnailPath = null;

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                if ($file && $file->isValid()) {
                    $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
                    $path = $file->storeAs('candidates/projects', $fileName, 'public');
                    $thumbnailPath = '/storage/' . $path;
                }
            }

            $project = Project::create([
                'user_id'     => $user->id,
                'title'       => $request->input('title'),
                'description' => $request->input('description'),
                'project_url' => $request->input('project_url'),
                'start_date'  => $request->input('start_date'),
                'end_date'    => $request->input('end_date'),
                'thumbnail'   => $thumbnailPath,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Project added successfully',
                'data' => $project,
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
                'message' => 'Failed to add project',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update existing project record as a whole.
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

            $project = Project::where('user_id', $user->id)->where('id', $id)->first();

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $request->validate([
                'title'       => ['nullable', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'project_url' => ['nullable', 'string', 'max:255'],
                'start_date'  => ['nullable', 'date'],
                'end_date'    => ['nullable', 'date'],
                'thumbnail'   => ['nullable', 'file', 'mimes:jpeg,png,jpg,webp', 'max:5120'],
            ]);

            $data = [
                'title'       => $request->input('title') ?? $project->title,
                'description' => $request->input('description') ?? $project->description,
                'project_url' => $request->input('project_url') ?? $project->project_url,
                'start_date'  => $request->input('start_date') ?? $project->start_date,
                'end_date'    => $request->input('end_date') ?? $project->end_date,
            ];

            if ($request->hasFile('thumbnail')) {
                $this->deleteStoredFile($project->thumbnail);
                $file = $request->file('thumbnail');
                $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
                $data['thumbnail'] = '/storage/' . $file->storeAs('candidates/projects', $fileName, 'public');
            } elseif ($request->has('thumbnail') && empty($request->input('thumbnail'))) {
                $this->deleteStoredFile($project->thumbnail);
                $data['thumbnail'] = null;
            }

            $project->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Project updated successfully',
                'data' => $project,
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
                'message' => 'Failed to update project',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete project record and its thumbnail.
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

            $project = Project::where('user_id', $user->id)->where('id', $id)->first();

            if (!$project) {
                return response()->json([
                    'success' => false,
                    'message' => 'Project record not found',
                ], Response::HTTP_NOT_FOUND);
            }

            $this->deleteStoredFile($project->thumbnail);
            $project->delete();

            return response()->json([
                'success' => true,
                'message' => 'Project deleted successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete project',
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
