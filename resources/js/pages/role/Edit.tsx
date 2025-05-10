import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";  // Importa `useForm`
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Formik, Form, Field } from 'formik';

interface Role {
  id: number;
  name: string;
  description: string;

}

interface Props {
  role: Role;
}

const RoleEdit: React.FC<Props> = ({ role }) => {
  const [roleExists] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    description: Yup.string().min(3, 'la descripcion debe tener al menos 2 caracteres').required('Campo requerido')
  });

  const successMessage = "rol fue editado Correctamente";
  const errorMessage = "Fallo al editar rol";

  const handleSubmit = (values: { name: string; description: string }) => {
    if (roleExists) {
      toast.error("Este nombre de este rol ya existe.");
      return;
    }
    router.put(route('roles.update', role.id), values, {
      onSuccess: () => {
        setTimeout(() => {
            toast.success(successMessage);
        }, 1000);
        router.reload();
      },
      onError: (err) => {
        if (err.name) {
            toast.error(err.name);
        }
        else{
            toast.error(errorMessage);
        }
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Edit role" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar roles</h2>
        <Formik
          initialValues={{
            id: role.id.toString(),
            name: role.name,
            description: role.description,
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors,  handleSubmit}) => (

            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                  required
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>

              {/* First Name */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Descripción
                </label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                  required
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>
              {/* Submit Button */}
              <div className="flex justify-start space-x-5">
                <button
                  type="button"
                  onClick={() => window.history.back()}  // Volver a la página anterior
                  className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                >
                  Actualizar
                </button>
              </div>
            </form>

          )}
        </Formik>
      </div>
    </AppLayout>
  );
};

export default RoleEdit;
