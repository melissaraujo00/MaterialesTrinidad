import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";  // Importa `useForm`
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Formik, Form, Field } from 'formik';

interface Category {
  id: number;
  name: string;
  description: string;

}

interface Props {
  category: Category;
}

const CategoryEdit: React.FC<Props> = ({ category }) => {
  const [categoryExists] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    description: Yup.string().min(3, 'El primer nombre debe tener al menos 2 caracteres').required('Campo requerido')
  });

  const successMessage = "Categoria fue editado Correctamente";
  const errorMessage = "Fallo al editar Categoria";

  const handleSubmit = (values: { name: string; description: string }) => {
    if (categoryExists) {
      toast.error("Este nombre de categoría ya existe.");
      return;
    }
    router.put(route('categories.update', category.id), values, {
      onSuccess: () => {
        toast.success(successMessage);
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
      <Head title="Edit category" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
        <Formik
          initialValues={{
            id: category.id.toString(),
            name: category.name,
            description: category.description,
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
                  Name
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
                  Description
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

export default CategoryEdit;
