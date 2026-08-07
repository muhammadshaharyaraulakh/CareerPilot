<?php

namespace App\Http\Controllers\profiles\candidate;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class SkillController extends Controller
{
    /**
     * Fetch candidate's skills along with all available master skills.
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

            $userSkills = $user->skills()->get();
            $allSkills  = Skill::select('id', 'name', 'category')->orderBy('name', 'asc')->get();

            return response()->json([
                'success' => true,
                'message' => 'Skills fetched successfully',
                'data' => $userSkills,
                'all_skills' => $allSkills,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch skills',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Fetch all master skills.
     */
    public function masterSkills()
    {
        try {
            $allSkills = Skill::select('id', 'name', 'category')->orderBy('name', 'asc')->get();

            return response()->json([
                'success' => true,
                'data' => $allSkills,
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch master skills',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store and attach new skill to candidate.
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
                'name'               => ['required', 'string', 'max:255'],
                'category'           => ['nullable', 'string', 'max:255'],
                'proficiency_level'  => ['nullable', 'string', 'in:Beginner,Intermediate,Expert'],
            ]);

            $skillName = trim($request->input('name'));
            
            // Look up existing skill or create new
            $existingSkill = Skill::whereRaw('LOWER(name) = ?', [strtolower($skillName)])->first();

            if ($existingSkill) {
                $skill = $existingSkill;
            } else {
                $skill = Skill::create([
                    'name'     => $skillName,
                    'category' => $request->input('category') ?? 'General',
                ]);
            }

            $proficiency = $request->input('proficiency_level') ?? 'Intermediate';

            // Explicitly check pivot attachment so proficiency_level is updated even if skill already attached
            if ($user->skills()->where('skill_id', $skill->id)->exists()) {
                $user->skills()->updateExistingPivot($skill->id, [
                    'proficiency_level' => $proficiency
                ]);
            } else {
                $user->skills()->attach($skill->id, [
                    'proficiency_level' => $proficiency
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Skill added successfully',
                'data' => $skill,
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
                'message' => 'Failed to add skill',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update skill / proficiency level.
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

            $request->validate([
                'proficiency_level' => ['nullable', 'string', 'in:Beginner,Intermediate,Expert'],
            ]);

            $skill = $user->skills()->where('skill_id', $id)->first();

            if (!$skill) {
                return response()->json([
                    'success' => false,
                    'message' => 'Skill not found for user',
                ], Response::HTTP_NOT_FOUND);
            }

            $user->skills()->updateExistingPivot($id, [
                'proficiency_level' => $request->input('proficiency_level') ?? 'Intermediate',
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Skill updated successfully',
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
                'message' => 'Failed to update skill',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Detach skill from candidate.
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

            $user->skills()->detach($id);

            return response()->json([
                'success' => true,
                'message' => 'Skill removed successfully',
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to remove skill',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
