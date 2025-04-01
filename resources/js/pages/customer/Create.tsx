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

  // Estado para almacenar los municipios filtrados por departamento
  const [filteredMunicipalities, setFilteredMunicipalities] = useState(municipalities);
  const [filteredDistricts, setFilteredDistricts] = useState(districts); // Estado para distritos filtrados

  // Estado para los valores seleccionados
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMunicipality, setSelectedMunicipality] = useState('');

  // Filtrar municipios cuando el departamento cambie
  useEffect(() => {
    // Filtrar municipios cuando el departamento cambie
    if (selectedDepartment) {
      setFilteredMunicipalities(
        municipalities.filter(
          (municipality) => municipality.department_id === parseInt(selectedDepartment)
        )
      );
    } else {
      setFilteredMunicipalities([]); // Si no hay departamento seleccionado, limpiar los municipios
    }
  }, [selectedDepartment, municipalities]);

  useEffect(() => {
    // Filtrar distritos cuando el municipio cambie
    if (selectedMunicipality) {
      setFilteredDistricts(
        districts.filter((district) => district.municipality_id === parseInt(selectedMunicipality))
      );
    } else {
      setFilteredDistricts([]); // Si no hay municipio seleccionado, limpiar los distritos
    }
  }, [selectedMunicipality, districts]);

  const validationSchema = Yup.object({
    department_id: Yup.string().required("Department is required"),
    municipality_id: Yup.string().required("Municipality is required"),
    district_id: Yup.string().required("District is required"), // Aseguramos que el distrito esté seleccionado
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
        headers: {
            'Content-Type': 'multipart/form-data',  // 🔹 Asegura que Laravel reconozca los datos correctamente
          },
        onSuccess: () => {
          toast.success("Usuario creado con éxito.");
          router.reload();
        },
        onError: (errors) => {
          console.error("Errores de validación:", errors);

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
              {/* nit */}
              <div>
                <label htmlFor="nit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">NIT</label>
                <Field
                  type="text"
                  id="nit"
                  name="nit"
                  value={values.nit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.nit && errors.nit && <small className="text-red-500">{errors.nit}</small>}
              </div>

              {/* Departamento */}
              <div>
                <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
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
                  <option value="" disabled>Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>{department.name}</option>
                  ))}
                </Field>
                {touched.department_id && errors.department_id && <small className="text-red-500">{errors.department_id}</small>}
              </div>

              {/* Municipio */}
              <div>
                <label htmlFor="municipality_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Municipality</label>
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
                  <option value="" disabled>Select Municipality</option>
                  {filteredMunicipalities.map((municipality) => (
                    <option key={municipality.id} value={municipality.id}>{municipality.name}</option>
                  ))}
                </Field>
                {touched.municipality_id && errors.municipality_id && <small className="text-red-500">{errors.municipality_id}</small>}
              </div>

              {/* Distrito */}
              <div>
                <label htmlFor="district_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">District</label>
                <Field
                  as="select"
                  id="district_id"
                  name="district_id"
                  value={values.district_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Select District</option>
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
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                />
                {touched.description && errors.description && <small className="text-red-500">{errors.description}</small>}
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="mt-1 p-2 w-3/4 max-w-md border rounded-md dark:bg-gray-800 dark:text-white"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
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
