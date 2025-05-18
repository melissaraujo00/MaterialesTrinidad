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
         // Actualizar los datos de la empresa
        $businessData->name = $request->name;
        $businessData->nit = $request->nit;
        $businessData->address = $request->address;
        $businessData->phoneNumber = $request->phoneNumber;
        $businessData->email = $request->email;
        $businessData->description = $request->description;
        
        // Manejo de logo si se ha subido uno nuevo
        if ($request->hasFile('logo')) {
            // Si ya existe un logo, eliminarlo
            if ($businessData->logo_path) {
                Storage:delete('public/' . $businessData->logo_path);
            }

            // Guardar el nuevo logo
            $path = $request->file('logo')->store('business_logos', 'public');
            $businessData->logo_path = str_replace('public/', '', $path);
        }

        // Guardar los cambios
        $businessData->save();

        // Redireccionar a la página de detalles con mensaje de éxito
        return redirect()->route('businessData.index')
            ->with('success', 'Información de la empresa actualizada correctamente');
        }
}
