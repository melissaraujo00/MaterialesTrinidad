import { useState } from 'react';
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function CategoryCreate() {
  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
  });

  const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);

    router.post("/permissions", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onSuccess: () => {
        setTimeout(() => {
            toast.success("Permiso creada con éxito.");
        }, 1000);
        router.reload();
      },
      onError: (err) => {
        console.error("Error al crear Permiso:", err);
        if (err.name) {
            toast.error(err.name);
        }
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Crear Permiso" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Permiso</h2>

        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form className="space-y-2">
              {/* Category Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre del Permiso</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ej: Permiso Boton eliminar cliente"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}              </div>

              {/* Submit Button */}
              <div className="flex justify-start space-x-3">
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
                  Crear Permiso
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
