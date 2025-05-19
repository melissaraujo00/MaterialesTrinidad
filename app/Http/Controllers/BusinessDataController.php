<?php

namespace App\Http\Controllers;

use App\Http\Requests\BusinessDataUpdateRequest;
use App\Models\BusinessData;
use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\delete;

class BusinessDataController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(BusinessData::class, 'businessData');
    }

    public function getBusinessData(): JsonResponse
    {
        
        $business = BusinessData::select([
            
            'id', 'name', 'nit', 'address', 
            'phoneNumber', 
            'email', 'logo_path', 'description'
        ])->get();

        
        return response()->json(['data' => $business]);
    }

     public function index()
    {
        $user = auth()->user();
        return Inertia::render('businessData/Index', [
            'businessData' =>BusinessData ::all(),
            'auth' => [
                'user' => [
                    'id' => $user?->id,
                    'name' => $user?->name,
                    'permissions' => $user ? $user->getAllPermissions()->pluck('name') : [],
                ]
            ]
        ]);
    }

    public function edit(BusinessData $businessData)
    {

        return Inertia::render('businessData/Edit', [
        'businessData' => $businessData,
        ]);
    }

     public function update(BusinessDataUpdateRequest $request, BusinessData $businessData)
{
        $data = $request->validated();
    
        if ($request->hasFile('logo_path') && $request->file('logo_path')->isValid()) {
            $file = $request->file('logo_path');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('logo', $filename, 'public');
            $data['logo_path'] = $path; // Cambiado de 'image' a 'logo_path'
        }
    
        $businessData->update($data);
    
        return redirect()->route('businessData.index')
            ->with('success', 'Información de la empresa actualizada correctamente');
}
}
