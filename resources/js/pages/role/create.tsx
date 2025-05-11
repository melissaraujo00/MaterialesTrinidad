import { Head, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

export default function RoleCreate() {
  const { permissions } = usePage<{ permissions: { name: string }[] }>().props;


  const validationSchema = Yup.object({
    name: Yup.string().min(2, "El nombre debe tener al menos 2 caracteres").required("Campo requerido"),
    description: Yup.string().min(5, "La descripción debe tener al menos 5 caracteres").required("Campo requerido"),
  });



  const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("permission", values.permission);

    router.post("/roles", values, {
      onSuccess: () => {
        toast.success("Rol creado con éxito.");
        setTimeout(() => router.visit("/roles"), 1000);
      },
      onError: (errors) => {
        toast.error(errors.name || "Ocurrió un error al crear el rol.");
      },
    });
  };

  return (
      <AppLayout>
        <Head title="Create User" />
        <Toaster position="top-right" richColors />

        <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
          <h2 className="text-2xl font-semibold mb-4">Create New User</h2>

          <Formik
            initialValues={{
              name: "",
              description: "",
              permissions: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange, handleBlur, touched, errors }) => (
              <Form className="space-y-2">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
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
                </div>

                {/* Descripcion */}
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
                {/* Permisos */}
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Permisos</label>
                <div className="flex flex-wrap gap-4">
                    {permissions.map((permission) => (
                    <label key={permission.name} className="flex items-center gap-2">
                        <Field
                        type="checkbox"
                        name="permissions"
                        value={permission.name}
                        checked={values.permissions?.includes(permission.name)}
                        onChange={handleChange}
                        />
                        <span>{permission.name}</span>
                    </label>
                    ))}
                </div>
                {touched.permissions && errors.permissions && (
                    <small className="text-red-500">{errors.permissions}</small>
                )}
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
                    Crear Rol
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </AppLayout>
    );
  }

