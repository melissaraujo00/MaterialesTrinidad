import { useState } from 'react';
import { Head, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function RoleCreate({ roles }) {
  const [checkingName, setCheckingName] = useState(false);
  const [nameExists, setNameExists] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('Campo requerido'),
    description: Yup.string().min(5, 'La descripción debe tener al menos 5 caracteres').required('Campo requerido'),
  });

  const checkRoleName = async (name) => {
    if (name.length < 2) {
      setNameExists(false);
      return;
    }
    setCheckingName(true);
    try {
      const exists = roles.some(
        (role) => role.name.toLowerCase() === name.toLowerCase()
      );
      setNameExists(exists);
    } catch (error) {
      console.error("Error al verificar el nombre del rol:", error);
    } finally {
      setCheckingName(false);
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    if (nameExists) {
      toast.error("Este nombre de rol ya existe.");
      setSubmitting(false);
      return;
    }

    router.post("/roles", values, {
      onSuccess: () => {
        toast.success("Rol creado con éxito.");
        setTimeout(() => {
          router.visit('/roles');
        }, 1000);
      },
      onError: (errors) => {
        console.error("Error al crear rol:", errors);
        if (errors.name) {
          toast.error(errors.name);
        } else {
          toast.error("Ocurrió un error al crear el rol.");
        }
        setSubmitting(false);
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Create Role" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Create New Role</h2>

        <Formik
          initialValues={{ name: "", description: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, isSubmitting, touched, errors }) => (
            <Form className="space-y-4">
              {/* Role Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Role Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    checkRoleName(e.target.value);
                  }}
                  onBlur={handleBlur}
                  className={`mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white ${
                    touched.name && (errors.name || nameExists) ? 'border-red-500' : ''
                  }`}
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
                {nameExists && <small className="text-red-500">Este nombre de rol ya existe.</small>}
                {checkingName && <small className="text-gray-500">Verificando disponibilidad...</small>}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  rows="4"
                  className={`mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white ${
                    touched.description && errors.description ? 'border-red-500' : ''
                  }`}
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-start space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.visit('/roles')}
                  className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || nameExists}
                  className={`bg-blue-600 text-white rounded px-4 py-2 transition ${
                    isSubmitting || nameExists ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Creando...' : 'Create Role'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
