<?php

namespace App\Http\Controllers;
use App\Models\Permission;
use Inertia\Inertia;

use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function getPermissionData()
    {
        $permissions = Permission::query()
        ->select('id','name')
        ->get();

        return response()->json(['data' => $permissions]);
    }

    public function index()
    {
        return Inertia::render('permission/index', [
            'permissions' => Permission::all(),
        ]);
    }
}
