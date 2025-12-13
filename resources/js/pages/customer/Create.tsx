// pages/customer/create.tsx
import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Toaster } from 'sonner';
import { Formik, Form } from 'formik';
import AppLayout from '@/layouts/app-layout';
import { FormField, SelectField } from '@/components/forms';
import { useLocationFilters, useFormSubmit } from '@/hooks';
import { customerValidationSchema } from '@/schemas';
import { Department, Municipality, District } from '@/types';

interface PageProps {
  departments: Department[];
  municipalities: Municipality[];
  districts: District[];
}

export default function CustomerCreate() {
  const { departments, municipalities, districts } = usePage<PageProps>().props;

  // Hook para filtros de ubicación (sin valores iniciales)
  const locationFilters = useLocationFilters({
    departments,
    municipalities,
    districts
  });

  // Hook para submit (método POST, no PUT)
  const { handleSubmit } = useFormSubmit({
    route: '/customers',
    method: 'post',
    successMessage: 'Cliente creado con éxito'
  });

  return (
    <AppLayout>
      <Head title="Crear Cliente" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Cliente</h2>

        <Formik
          initialValues={{
            name: '',
            email: '',
            phoneNumber: '',
            nit: '',
            department_id: '',
            municipality_id: '',
            district_id: '',
            address: '',
            description: '',
            status: 'activo' // Valor por defecto
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
                Crear Cliente
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </AppLayout>
  );
}
