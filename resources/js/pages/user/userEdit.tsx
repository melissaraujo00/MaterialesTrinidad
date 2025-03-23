import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";  // Importa `useForm`
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import * as Yup from "yup";  // Importa Yup
import AppLayout from "@/layouts/app-layout";
interface User {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  email: string;
  phoneNumber: string;
  role_id: number;
}

interface Role {
  id: number;
  name: string;
}

interface Props {
  user: User;
  roles: Role[];
}

const UserEdit: React.FC<Props> = ({ user, roles }) => {
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("Campo requerido"),
    firstName: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("Campo requerido"),
    lastName: Yup.string().min(3, "El nombre debe tener al menos 3 caracteres").required("Campo requerido"),
    email: Yup.string().email("Email no válido").required("Campo requerido"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{8}$/, "El número de teléfono debe tener 8 dígitos y solo contener números")
      .required("Campo requerido"),
    birthdate: Yup.date().max(new Date(), 'La fecha de nacimiento no puede ser en el futuro').required('Campo requerido'),
    role_id: Yup.number().required("Campo requerido").positive("El rol es inválido").integer("El rol es inválido")
  });

  const { data, setData, put, processing, errors } = useForm({
    name: user.name,
    firstName: user.firstName,
    lastName: user.lastName,
    birthdate: user.birthdate,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role_id: user.role_id,
  });

  useEffect(() => {
    setData({
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      birthdate: user.birthdate,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role_id: user.role_id,

    });
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setData((prevData) => ({
      ...prevData,
      role_id: parseInt(value), // Convertir el valor a número
    }));
  };

  const successMessage = "Usuario fue editado Correctamente";
  const errorMessage = "Fallo al editar Usuario";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    validationSchema
      .validate(data, { abortEarly: false })
      .then(() => {
        // Si la validación es exitosa
        put(route('users.update', user.id), {
          onSuccess: () => {
            toast.success(successMessage);
            router.reload();
          },
          onError: (err) => {
            console.error("Error al crear usuario:", err);
            toast.error(errorMessage);
          },
        });
      })
      .catch((validationErrors) => {
        // Mostrar errores de validación en los campos
        validationErrors.inner.forEach((error: any) => {
          toast.error(error.message); // Muestra el mensaje de error de la validación
        });
      });
  };

  return (
    <AppLayout>
      <Head title="Edit User" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={data.firstName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            {errors.firstName && <div className="text-red-500 text-sm">{errors.firstName}</div>}
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={data.lastName}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            {errors.lastName && <div className="text-red-500 text-sm">{errors.lastName}</div>}
          </div>

          {/* Birthdate */}
          <div>
            <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              value={data.birthdate}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            {errors.birthdate && <div className="text-red-500 text-sm">{errors.birthdate}</div>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            />
            {errors.phoneNumber && <div className="text-red-500 text-sm">{errors.phoneNumber}</div>}
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Role
            </label>
            <select
              id="role_id"
              name="role_id"
              value={data.role_id}
              onChange={handleSelectChange}
              className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
              required
            >
              <option value="" disabled>Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.role_id && <div className="text-red-500 text-sm">{errors.role_id}</div>}
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
              disabled={processing}
            >
              {processing ? "Actualizando..." : "Actualizar"}
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default UserEdit;
