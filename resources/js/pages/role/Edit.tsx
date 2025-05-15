import React from "react";
import { Head } from "@inertiajs/react";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from 'yup';
import AppLayout from "@/layouts/app-layout";
import { Formik, Form, Field } from 'formik';

interface Permission {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[]; // nombres de permisos asignados
}

interface Props {
  role: Role;
  permissions: Permission[];
}

const RoleEdit: React.FC<Props> = ({ role, permissions }) => {
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'El nombre debe tener al menos 3 caracteres').required('Campo requerido'),
    description: Yup.string().min(3, 'La descripción debe tener al menos 3 caracteres').required('Campo requerido'),
    permissions: Yup.array().min(1, 'Selecciona al menos un permiso').required('Campo requerido'),
  });

  const handleSubmit = (values: { name: string; description: string; permissions: string[] }) => {
    router.put(route('roles.update', role.id), values, {
      onSuccess: () => {
        setTimeout(() => {
          toast.success("Rol actualizado correctamente");
        }, 1000);
        router.reload();
      },
      onError: () => {
        toast.error("Fallo al editar rol");
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Editar Rol" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Editar Rol</h2>
        <Formik
          initialValues={{
            name: role.name,
            description: role.description,
            permissions: role.permissions || [],
          }}
          enableReinitialize={true}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, handleChange, handleBlur, touched, errors }) => (
            <Form className="space-y-2">
              {/* Nombre */}
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

              {/* Descripción */}
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

              {/* Permisos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Permisos</label>
                <div className="flex flex-wrap gap-4">
                  {permissions.map((permission) => (
                    <label key={permission.name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="permissions"
                        value={permission.name}
                        checked={values.permissions.includes(permission.name)}
                        onChange={() => {
                          if (values.permissions.includes(permission.name)) {
                            setFieldValue(
                              "permissions",
                              values.permissions.filter((p) => p !== permission.name)
                            );
                          } else {
                            setFieldValue("permissions", [...values.permissions, permission.name]);
                          }
                        }}
                      />
                      <span>{permission.name}</span>
                    </label>
                  ))}
                </div>
                {touched.permissions && errors.permissions && (
                  <small className="text-red-500">{errors.permissions}</small>
                )}
              </div>

              {/* Botones */}
              <div className="flex justify-start space-x-5">
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
                  Actualizar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
};

export default RoleEdit;
