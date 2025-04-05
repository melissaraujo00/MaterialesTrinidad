import { useState } from 'react';
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function BrandCreate() {
  const [brandExists] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    description: Yup.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  });

  const handleSubmit = (values: any) => {
    if (brandExists) {
      toast.error("Este nombre de marca ya existe.");
      return;
    }

    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);

    router.post("/brands", data, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      onSuccess: () => {
        setTimeout(() => {
          toast.success("Marca creada con éxito.");
        }, 500);
        router.reload();
      },
      onError: (err) => {
        console.error("Error al crear marca:", err);
        if (err.name) {
            toast.error(err.name);
        }
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Create brand" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Create New Brand</h2>

        <Formik
          initialValues={{
            name: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form className="space-y-2">
              {/* Brand Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Brand Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                {brandExists && <small className="text-red-500">Este nombre de marca ya existe.</small>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>

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
                  Create Brand
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
