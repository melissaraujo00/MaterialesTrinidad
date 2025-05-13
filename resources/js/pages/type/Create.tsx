import { Head, router, usePage } from "@inertiajs/react";
import { useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Description } from "@radix-ui/react-dialog";

export default function TypeCreate() {
  const [typeExists] = useState(false);
  const validationSchema = Yup.object({
    type: Yup.string().min(2, "El nombre debe tener al menos 5 caracteres")
    .max(50, "No debe sobrepasar los 50 caracteres")
    .required("Campo requerido"),

    description: Yup.string()
    .min(5, "El nombre debe tener al menos 5 caracteres")
    .max(100, "No debe sobrepasar los 100 caracteres")
  });

  const handleSubmit = (values: any) => {
    if (typeExists) {
      toast.error("Este nombre del tipo ya existe.");
      return;
    }
    const data = new FormData();
    data.append("type", values.type);
    data.append("description", values.description);

    router.post("/types", values, {
      onSuccess: () => {
        toast.success("Tipo de movimiento creado con éxito.");
        setTimeout(() => router.visit("/types"), 1000);
      },
      onError: (errors) => {
        toast.error(errors.name || "Ocurrió un error al crear el tipo de movimiento.");
      },
    });
  };

  return (
      <AppLayout>
        <Head title="Create Type" />
        <Toaster position="top-right" richColors />

        <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Tipo de Movimiento</h2>

          <Formik
            initialValues={{
              type: "",
              description: ""
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form className="space-y-2">
                {/* Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tipo</label>
                  <Field
                    type="text"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                  />
                  {touched.type && errors.type && <small className="text-red-500">{errors.type}</small>}
                </div>
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripcion</label>
                  <Field
                    type="text"
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
                <div className="flex justify-start">
                <button
                type="button"
                onClick={() => window.history.back()}
                className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
              >
                Cancelar
              </button>
                  <button
                    type="submit"
                    className={`bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition`}
                  >
                    Crear Tipo
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </AppLayout>
    );
  }
