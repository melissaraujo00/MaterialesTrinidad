import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { useState, useEffect } from 'react';

export default function CustomerCreate() {
  const { departments, municipalities, districts } = usePage<{
    departments: { id: number; name: string }[];
    municipalities: { id: number; name: string; department_id: number }[];
    districts: { id: number; name: string; municipality_id: number }[];
  }>().props;

  const [filteredMunicipalities, setFilteredMunicipalities] = useState(municipalities);
  const [filteredDistricts, setFilteredDistricts] = useState(districts);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  useEffect(() => {
    setFilteredMunicipalities(
      selectedDepartment
        ? municipalities.filter(m => m.department_id === Number(selectedDepartment))
        : []
    );
  }, [selectedDepartment, municipalities]);

  useEffect(() => {
    setFilteredDistricts(
      selectedMunicipality
        ? districts.filter(d => d.municipality_id === Number(selectedMunicipality))
        : []
    );
  }, [selectedMunicipality, districts]);



  const validationSchema = Yup.object({
    name: Yup.string().min(2, 'El nombre debe tener al menos 2 caracteres').required('El nombre es requerido '),
    email: Yup.string().email('Formato de correo no válido'),
    phoneNumber: Yup.string().matches(/^[0-9]{8}$/, 'El número de teléfono debe tener 8 dígitos y solo tener numeros').required('Campo requerido'),
    nit: Yup.string().matches(/^\d{4}-\d{6}-\d{3}-\d{1}$/, 'El NIT debe tener el formato 0000-000000-000-0'),
    status: Yup.string().required("Seleccione un estado"),
    department_id: Yup.string().required("El Departamento es requerido"),
    municipality_id: Yup.string().required("El Municipio es requerido"),
    district_id: Yup.string().required("El distrito es requerido"),
  });

  const handleSubmit = (values: any) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("email", values.email);
    data.append("phoneNumber", values.phoneNumber);
    data.append("nit", values.nit);
    data.append("district_id",values.district_id);
    data.append("address",values.address);
    data.append("description",values.description);
    data.append("status",values.status);

    router.post("/customers", data, {
        onSuccess: () => {
        console.log("✅ Cliente creado con éxito");
          toast.success("Cliente creado con éxito.");
        },
        onError: (errors) => {
          console.error("Errores de validación:", errors);
          toast.error("Hubo un error al crear el cliente. Verifica los datos.");
        },
      });

  };

  return (
    <AppLayout>
      <Head title="Crear Cliente" />
      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl dark:bg-black/10 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Cliente</h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phoneNumber: "",
            nit: "",
            department_id: "",
            municipality_id: "",
            district_id: "",
            address: "",
            description: "",
            status: "",
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
                  placeholder="Ej: Juan Perez"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.name && errors.name && <small className="text-red-500">{errors.name}</small>}
              </div>
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electronico</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Ej: nombre@gmail.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.email && errors.email && <small className="text-red-500">{errors.email}</small>}
              </div>
              {/* Phone Number */}
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Numero de Telefono</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="56437632"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.phoneNumber && errors.phoneNumber && <small className="text-red-500">{errors.phoneNumber}</small>}
              </div>
              {/* nit */}
              <div>
                <label htmlFor="nit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">NIT</label>
                <Field
                  type="text"
                  id="nit"
                  name="nit"
                  placeholder="Ej: 0000-000000-000-0"
                  value={values.nit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.nit && errors.nit && <small className="text-red-500">{errors.nit}</small>}
              </div>

              {/* Departamento */}
              <div>
                <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Departamento</label>
                <Field
                  as="select"
                  id="department_id"
                  name="department_id"
                  value={values.department_id}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedDepartment(e.target.value); // Actualizar el departamento seleccionado
                    setSelectedMunicipality(''); // Limpiar el municipio seleccionado cuando cambie el departamento
                  }}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Seleccione un Departamento </option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                  ))}
                </Field>
                {touched.department_id && errors.department_id && <small className="text-red-500">{errors.department_id}</small>}
              </div>

              {/* Municipio */}
              <div>
                <label htmlFor="municipality_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Municipio</label>
                <Field
                  as="select"
                  id="municipality_id"
                  name="municipality_id"
                  value={values.municipality_id}
                  onChange={(e) => {
                    handleChange(e);
                    setSelectedMunicipality(e.target.value); // Actualizar el municipio seleccionado
                  }}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Selecciones un Municipio</option>
                  {filteredMunicipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>{municipality.name}</option>
                  ))}
                </Field>
                {touched.municipality_id && errors.municipality_id && <small className="text-red-500">{errors.municipality_id}</small>}
              </div>

              {/* Distrito */}
              <div>
                <label htmlFor="district_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Distrito</label>
                <Field
                  as="select"
                  id="district_id"
                  name="district_id"
                  value={values.district_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Seleccione un Distrito</option>
                  {filteredDistricts.map((district) => (
                    <option key={district.id} value={district.id}>{district.name}</option>
                  ))}
                </Field>
                {touched.district_id && errors.district_id && <small className="text-red-500">{errors.district_id}</small>}
              </div>
              {/* address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Direccion</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Ej: Col. Franciso Casa #4"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.address && errors.address && <small className="text-red-500">{errors.address}</small>}
              </div>
              {/* description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Descripion Opcional</label>
                <Field
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Ej: Frente de ferreteria Olivia"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Selecciona un Estado</option>
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Field>
                {touched.status && errors.status && <small className="text-red-500">{errors.status}</small>}
              </div>

              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => window.history.back()}
                  className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
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
