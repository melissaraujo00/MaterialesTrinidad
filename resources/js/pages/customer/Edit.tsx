// pages/customer/edit.tsx
import React, { useMemo } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { Formik, Form } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { FormField, SelectField } from '@/components/forms';
import { useLocationFilters, useFormSubmit } from '@/hooks';
import { customerValidationSchema } from '@/schemas';
import { Customer, Department, Municipality, District } from '@/types';

interface PageProps {
  customer: Customer;
  departments: Department[];
  municipalities: Municipality[];
  districts: District[];
}

export default function CustomerEdit() {
  const { customer, departments, municipalities, districts } = usePage<PageProps>().props;

  // Calcular IDs iniciales de ubicación
  const initialLocation = useMemo(() => {
    const district = districts.find(d => d.id === customer.district_id);
    const municipality = district
      ? municipalities.find(m => m.id === district.municipality_id)
      : null;
    const department = municipality
      ? departments.find(dep => dep.id === municipality.department_id)
      : null;

    return {
      departmentId: department?.id,
      municipalityId: municipality?.id
    };
  }, [customer.district_id, districts, municipalities, departments]);

  // Hook para filtros de ubicación
  const locationFilters = useLocationFilters({
    initialDepartmentId: initialLocation.departmentId,
    initialMunicipalityId: initialLocation.municipalityId,
    departments,
    municipalities,
    districts
  });

  // Hook para submit
  const { handleSubmit } = useFormSubmit({
    route: `/customers/${customer.id}`,
    method: 'put',
    successMessage: 'Cliente actualizado con éxito'
  });

  return (
    <AppLayout>
      <Head title="Editar Cliente" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Cliente</h2>

        <Formik
          initialValues={{
            name: customer.name || '',
            email: customer.email || '',
            phoneNumber: customer.phoneNumber || '',
            nit: customer.nit || '',
            department_id: locationFilters.selectedDepartment,
            municipality_id: locationFilters.selectedMunicipality,
            district_id: customer.district_id?.toString() || '',
            address: customer.address || '',
            description: customer.description || '',
            status: customer.status || ''
          }}
          validationSchema={customerValidationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-2">
            {/* Name */}
            <FormField
              name="name"
              label="Nombre"
              placeholder="Ej: Juan Perez"
              required
            />

            {/* Email */}
            <FormField
              name="email"
              type="email"
              label="Correo Electronico"
              placeholder="Ej: nombre@gmail.com"
            />

            {/* Phone Number */}
            <FormField
              name="phoneNumber"
              type="tel"
              label="Numero de Telefono"
              placeholder="56437632"
              required
            />

            {/* NIT */}
            <FormField
              name="nit"
              label="NIT"
              placeholder="Ej: 0000-000000-000-0"
            />

            {/* Departamento */}
            <SelectField
              name="department_id"
              label="Departamento"
              options={departments}
              placeholder="Seleccione un Departamento"
              required
              onChange={locationFilters.handleDepartmentChange}
            />

            {/* Municipio */}
            <SelectField
              name="municipality_id"
              label="Municipio"
              options={locationFilters.filteredMunicipalities}
              placeholder="Seleccione un Municipio"
              required
              onChange={locationFilters.handleMunicipalityChange}
            />

            {/* Distrito */}
            <SelectField
              name="district_id"
              label="Distrito"
              options={locationFilters.filteredDistricts}
              placeholder="Seleccione un Distrito"
              required
            />

            {/* Address */}
            <FormField
              name="address"
              label="Direccion"
              placeholder="Ej: Col. Francisco Casa #4"
            />

            {/* Description */}
            <FormField
              name="description"
              label="Descripcion Opcional"
              placeholder="Ej: Frente de ferreteria Olivia"
            />

            {/* Status */}
            <SelectField
              name="status"
              label="Estado"
              options={[
                { id: 'activo', name: 'Activo' },
                { id: 'inactivo', name: 'Inactivo' }
              ]}
              placeholder="Selecciona un Estado"
              required
            />

            {/* Actions */}
            <div className="flex justify-start space-x-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
              >
                Actualizar Cliente
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </AppLayout>
  );
}
