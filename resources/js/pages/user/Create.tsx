
import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster } from "sonner";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import { usePage } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

export default function UserCreate() {
  const { roles } = usePage<{
    roles: { id: number; name: string }[];
  }>().props;

  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido'),
    price: Yup.number().positive('El precio debe ser positivo').required('El precio es requerido'),
    priceWithTax: Yup.number().positive('Debe ser positivo'),
    discountPrice: Yup.number().positive('Debe ser positivo'),
    stock: Yup.number().integer().min(0, 'Debe ser un número válido'),
    stockMinimun: Yup.number().integer().min(0, 'Debe ser un número válido'),
    category_id: Yup.number().required('Debe seleccionar una categoría'), // Cambiado a número
    brand_id: Yup.number().required('Debe seleccionar una marca'), // Cambiado a número
});

  const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("firstName", values.firstName);
    data.append("lastName", values.lastName);
    data.append("email", values.email);
    data.append("birthdate", values.birthdate);
    data.append("phoneNumber", values.phoneNumber);
    data.append("password", values.password);
    data.append("role_id", String(values.role_id));

    router.post("/users", data, {
      onSuccess: () => {
        setTimeout(() => {
            toast.success("Usuario creado con éxito.");
        }, 1000);
        router.reload();
      },
      onError: (errors) => {
        console.error("Errores de validación:", errors);

        if (errors.email) {
          toast.error(errors.email);
        }
        if (errors.phoneNumber) {
          toast.error(errors.phoneNumber);
        }
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
            firstName: "",
            lastName: "",
            email: "",
            birthdate: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            role_id: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form className="space-y-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
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

              {/* First Name */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.firstName && errors.firstName && <small className="text-red-500">{errors.firstName}</small>}
              </div>

              {/* Last Name */}
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.lastName && errors.lastName && <small className="text-red-500">{errors.lastName}</small>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
              </div>

              {/* Birthdate */}
              <div>
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Birthdate</label>
                <Field
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  value={values.birthdate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.birthdate && errors.birthdate && <small className="text-red-500">{errors.birthdate}</small>}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.phoneNumber && errors.phoneNumber && <small className="text-red-500">{errors.phoneNumber}</small>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.password && errors.password && <small className="text-red-500">{errors.password}</small>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.confirmPassword && errors.confirmPassword && <small className="text-red-500">{errors.confirmPassword}</small>}
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <Field
                  as="select"
                  id="role_id"
                  name="role_id"
                  value={values.role_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </Field>
                {touched.role_id && errors.role_id && <small className="text-red-500">{errors.role_id}</small>}
              </div>

              {/* Submit Button */}
              <div className="flex justify-start">
              <button
              type="button"
              onClick={() => window.history.back()}  // Volver a la página anterior
              className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
            >
              Cancelar
            </button>
                <button
                  type="submit"
                  className={`bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition`}
                >
                  Create User
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </AppLayout>
  );
}
