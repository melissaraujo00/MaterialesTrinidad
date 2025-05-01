import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { router, usePage } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import AppLayout from "@/layouts/app-layout";

interface Permission {
  id: number;
  name: string;
}

export default function PermissionEdit() {
  const [submitting, setSubmitting] = useState(false);

  const { permission } = usePage<{ permission: Permission }>().props;

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .required('Campo requerido'),
  });

  const handleSubmit = (values: any) => {
    setSubmitting(true);
    
    // Usando un objeto simple en lugar de FormData
    const data = {
      name: values.name
    };
    
    router.put(`/permissions/${permission.id}`, data, {
      onSuccess: () => {
        setSubmitting(false);
        setTimeout(() => {
          toast.success("Permiso editado con éxito.");
        }, 1000);
        router.reload();
      },
      onError: (err) => {
        setSubmitting(false);
        console.error("Error al editar Permiso:", err);
        if (err.name) {
          toast.error(err.name);
        }
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Editar Permiso" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Permiso</h2>

        <Formik
          initialValues={{
            name: permission.name || '',
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({  touched, errors }) => (
            <Form className="space-y-2">
              {/* Nombre del Permiso */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre del Permiso
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Editar permiso"
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.name && errors.name && (
                  <small className="text-red-500">{errors.name}</small>
                )}
              </div>

              {/* Botones */}
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
                  disabled={submitting}
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                >
                  Editar Permiso
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}