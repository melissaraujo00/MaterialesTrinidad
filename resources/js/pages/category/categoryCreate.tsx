import { useState } from 'react';
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function CategoryCreate() {
  const [categoryExists, setCategoryExists] = useState(false);

  // Verifica si la categoría ya existe mientras el usuario escribe
  const checkCategoryExists = async (name) => {
    const response = await fetch(`/categories/check-duplicate?name=${name}`);
    const data = await response.json();
    setCategoryExists(data.exists);
  };

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    description: Yup.string().min(5, 'La descripción debe tener al menos 5 caracteres').required('Campo requerido'),
  });

  const handleSubmit = (values: any) => {
    if (categoryExists) {
      toast.error("Este nombre de categoría ya existe.");
      return;
    }

    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);

    router.post("/categories", data, {
      onSuccess: () => {
        toast.success("Categoría creada con éxito.");
        router.reload();
      },
      onError: (err) => {
        console.error("Error al crear categoría:", err);
        toast.error("Error al crear categoría.");
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Create Category" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>

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
              {/* Category Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    checkCategoryExists(e.target.value); // Verificar la existencia del nombre
                  }}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                {categoryExists && <small className="text-red-500">Este nombre de categoría ya existe.</small>}
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
                  onClick={() => window.history.back()}  // Volver a la página anterior
                  className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
                >
                  Create Category
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
