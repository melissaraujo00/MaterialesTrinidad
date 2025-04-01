<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomer;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\District;
use App\Models\Municipality;
use App\Models\Department;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function getCustomerData()
    {
        $data = Customer::query()
        ->with('district', 'district.municipality', 'district.municipality.department')
        ->get()
        ->map( function ($customer){
            return [
                'id' => $customer->id,
                'name' => $customer->name,
                'email' => $customer->email,
                'phoneNumber' => $customer->phoneNumber,
                'nit' => $customer->nit,
                'district' => $customer->district->municipality->department->name  .", ".$customer->district->municipality->name .", ".$customer->district->name,
                'address'=> $customer->address,
                'description' => $customer->description,
                'status' => $customer->status,
                'register' => $customer->created_at->format('d-m-Y'),
            ];
        });
        return response()->json(['data' => $data]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('customer/Index', [
            'customers' => Customer::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $departments = Department::all();
        $municipalities = Municipality::all();
        $districts = District::all();

        // Pasar los datos a la vista
        return Inertia::render('customer/Create', [
            'departments' => $departments,
            'municipalities' => $municipalities,
            'districts' => $districts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomer $request)
    {
        Customer::create($request->validated());
        return redirect()->route('customers.index')->with('success', 'Customer created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
